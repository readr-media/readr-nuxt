const CryptoJS = require('crypto-js')
const rawurlencode = require('locutus/php/url/rawurlencode')
const { post: axiosPost } = require('axios')
const truncate = require('html-truncate')
const { EZPAY } = require('../../../configs/config')

const CARRIER_TYPE = { PHONE: '0', NATURAL: '1', EXPAY: '2' }

const createInvoice = (data) =>
  new Promise((resolve, reject) => {
    /* eslint-disable camelcase */
    const payload = {
      RespondType: 'JSON',
      Version: '1.4',
      TimeStamp: Math.round(Date.now() / 1000),
      MerchantOrderNo:
        data?.transaction_id ?? `${Math.round(Date.now() / 1000)}`,
      Status: '1',
      Category: data?.category === 1 ? 'B2C' : 'B2B',
      CarrierType: data?.carrierType,
      BuyerName: data?.member_name,
      BuyerEmail: data?.member_mail ?? '-',
      PrintFlag: data?.printFlag ?? 'N',
      TaxType: '1', // Couldn't be "9" at this moment. Not offering this tax type yet.
      ItemName: (data?.items ?? []).map((item) => item?.name ?? '').join('|'),
      ItemCount: (data?.items ?? []).map((item) => item?.count ?? '').join('|'),
      ItemUnit: data?.item_unit || 'Unit',
    }
    /* eslint-enable camelcase */
    let message = `Paid by credit card: ****-****-****-${
      data?.lastFourNum ?? ''
    }.`

    if (payload.Status === '3') {
      // Issue invoice in 1 min
      payload.CreateStatusTime = new Date(Date.now() + 60 * 1000).toISOString()
    }

    switch (payload.TaxType) {
      case '2':
        payload.CustomsClearance = '1'
        payload.TaxRate = 0
        payload.TaxAmt = 0
        payload.Amt = data?.amtSales ?? 0
        payload.TotalAmt = data?.amtSales ?? 0
        break
      case '3':
        payload.TaxRate = 0
        payload.TaxAmt = 0
        payload.Amt = data?.amtSales ?? 0
        payload.TotalAmt = data?.amtSales ?? 0
        break
      default:
        payload.TaxRate = 5
        payload.TaxAmt = Math.round((data?.amtSales ?? 0) * (5 / 100))
        if (payload.TaxType === '9') {
          payload.Amt =
            data?.amtSales ??
            0 + data?.amtZero ??
            0 + data?.amtFree ??
            0 - payload.TaxAmt
          payload.TotalAmt =
            data?.amtSales ?? 0 + data?.amtZero ?? 0 + data?.amtFree ?? 0
          payload.ItemTaxType = (data?.items ?? [])
            .map((item) => item?.taxType ?? 1)
            .join('|')
        } else {
          payload.Amt = (data?.amtSales ?? 0) - payload.TaxAmt
          payload.TotalAmt = data?.amtSales ?? 0
        }
    }

    if (payload.Category === 'B2B') {
      if (
        !data?.businessTitle ||
        !data?.businessAddress ||
        !data?.businessTaxNo
      ) {
        /** Got incomplete buyer info, so we're not gonna gen invoice immediatelly and make Status = 0. */
        payload.Status = '0'
      }
      payload.PrintFlag = 'Y'
      payload.BuyerName = data?.businessTitle ?? '-'
      payload.BuyerUBN = data?.businessTaxNo ?? '-'
      payload.BuyerAddress = data?.businessAddress ?? '-'
      delete payload.CarrierType

      payload.ItemPrice = (data?.items ?? [])
        .map((item) =>
          Math.round(item?.price ?? 0 / (1 + payload.TaxRate / 100))
        )
        .join('|')
      payload.ItemAmt = (data?.items ?? [])
        .map((item) =>
          Math.round(
            (item?.price ?? 0 / (1 + payload.TaxRate / 100)) * item?.count ?? 0
          )
        )
        .join('|')
      if (payload.TaxType === '9') {
        payload.TaxType = '1'
        console.error('Not offering this taxtype yet.')
        /**
         *  throw new Error('Not offering this taxtype yet.')
         */
      }
    } else if (payload.Category === 'B2C') {
      payload.ItemPrice = (data?.items ?? [])
        .map((item) => item?.price ?? 0)
        .join('|')
      payload.ItemAmt = payload.ItemPrice
      if (data?.loveCode) {
        const expLovecode = /^[0-9]{3,7}$/
        if (expLovecode.test(data?.loveCode ?? '')) {
          payload.LoveCode = data?.loveCode
          /** payload.CarrierType should be null */
        } else {
          /**
           *
           *  throw new Error('Incorrect love-code format.')
           *  payload.CarrierType = CARRIER_TYPE.EXPAY
           *  payload.CarrierNum = _.get(data, 'member_mail', '-')
           *
           */

          delete payload.CarrierType
          payload.PrintFlag = 'Y'
        }
      } else {
        /**
         *
         * payload.LoveCode should be null.
         * payload.CarrierType = CARRIER_TYPE.EXPAY
         *
         **/

        switch (payload.CarrierType) {
          case '0':
          case '1': {
            const expCarrierNum =
              payload.CarrierType === CARRIER_TYPE.PHONE
                ? /^\/[A-Z0-9.+-]{7}$/
                : /^[A-Z]{2}[0-9]{14}$/
            if (!expCarrierNum.test(data?.carrierNum)) {
              /**
               *
               *  payload.CarrierType = CARRIER_TYPE.EXPAY
               *  payload.CarrierNum = _.get(data, 'member_mail', '-')
               *  throw new Error('Incorrect carrier number.')
               *
               */

              delete payload.CarrierType
              payload.PrintFlag = 'Y'

              message += ` Incorrect carrier num: ${data?.carrierNum}.`
            } else {
              payload.CarrierNum = data?.carrierNum.trim()
            }
            break
          }
          case '2':
            payload.CarrierNum = (
              data?.carrierNum ??
              // eslint-disable-next-line camelcase
              data?.member_mail ??
              '-'
            ).trim()
            payload.BuyerEmail = (
              data?.carrierNum ??
              // eslint-disable-next-line camelcase
              data?.member_mail ??
              '-'
            ).trim()
            break
          default:
            delete payload.CarrierType
            payload.PrintFlag = 'Y'
        }
      }
    }
    payload.Comment = truncate(message, 68)
    console.log('payload: ', payload)

    const KEY = EZPAY?.KEY ?? ''
    const IV = EZPAY?.IV ?? ''

    const payloadString = Object.entries(payload)
      .map(([key, item]) => `${key}=${rawurlencode(item)}`)
      .join('&')
    const encrypted = CryptoJS.AES.encrypt(
      payloadString,
      CryptoJS.enc.Utf8.parse(KEY),
      {
        iv: CryptoJS.enc.Utf8.parse(IV),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    )
    const ciphertext = encrypted.toString(CryptoJS.format.Hex)
    console.log('ciphertext: ', ciphertext)

    const bytes = CryptoJS.AES.decrypt(
      { ciphertext: CryptoJS.enc.Hex.parse(ciphertext) },
      CryptoJS.enc.Utf8.parse(KEY),
      {
        iv: CryptoJS.enc.Utf8.parse(IV),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    )
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8)
    console.log('decryptedData: ', decryptedData)

    axiosPost(
      EZPAY?.HOST ?? '',
      `MerchantID_=${EZPAY?.ID ?? ''}&PostData_=${ciphertext}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
      .then(({ data: result }) => {
        if (result?.Status === 'SUCCESS') {
          resolve(result)
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            status: 400,
            message: result?.Message,
          })
        }
      })
      .catch((error) => {
        reject(error)
      })
  })

const genInvoice = (req) => {
  const data = req?.body ?? {}
  data.member_name =
    data.member_name || (req?.user?.nickname ?? req?.user?.email ?? '-')
  data.member_mail = data.member_mail || (req?.user?.email ?? '-')

  console.log('[Invoice] Prepare to generate invoice')
  console.log('[Invoice] req.body is: ', data)

  createInvoice(data)
    .then((response) => {
      console.log('GENED INVOICE SUCCESSFULLY.')
      console.log('response', response)
      console.log('[Invoice] GENED INVOICE SUCCESSFULLY.')
      console.log('[Invoice] response: ', response)
    })
    .catch((error) => {
      console.error(
        `Error occurred when gen inv for member-transaction:`,
        req?.user?.email ?? '',
        '-',
        // eslint-disable-next-line camelcase
        data?.transaction_id ?? ''
      )
      console.error(error.message)
    })
}

module.exports = {
  genInvoice,
}
