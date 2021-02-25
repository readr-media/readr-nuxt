const { get, map } = require('lodash')
const CryptoJS = require('crypto-js')
const debug = require('debug')('READR-API:middle:invoice')
const moment = require('moment')
const rawurlencode = require('locutus/php/url/rawurlencode')
const superagent = require('superagent')
const truncate = require('html-truncate')
const { EZPAY } = require('../../config')
const { handlerError } = require('../../comm')

const CARRIER_TYPE = { PHONE: '0', NATURAL: '1', EXPAY: '2' }

const createInvoice = (data) =>
  new Promise((resolve, reject) => {
    const payload = {
      RespondType: 'JSON',
      Version: get(EZPAY, 'VERSION', '1.4'),
      TimeStamp: Math.round(Date.now() / 1000),
      MerchantOrderNo: get(
        data,
        'transaction_id',
        `${Math.round(Date.now() / 1000)}`
      ),
      Status: get(EZPAY, 'TYPE', '0'),
      Category: get(data, 'category') === 1 ? 'B2C' : 'B2B',
      CarrierType: get(data, 'carrierType'),
      BuyerName: get(data, 'member_name'),
      BuyerEmail: get(data, 'member_mail', '-'),
      PrintFlag: get(data, 'printFlag', 'N'),
      TaxType: get(EZPAY, 'TAX_TYPE', '1'),
      ItemName: map(get(data, 'items', []), (item) =>
        get(item, 'name', '')
      ).join('|'),
      ItemCount: map(get(data, 'items', []), (item) =>
        get(item, 'count', '')
      ).join('|'),
      ItemUnit: get(data, 'item_unit') || get(EZPAY, 'UNIT', 'Unit'),
    }
    let message = `Paid by credit card: ****-****-****-${get(
      data,
      'lastFourNum',
      ''
    )}.`

    if (payload.Status === '3') {
      payload.CreateStatusTime = moment(
        Date.now() + get(EZPAY, 'SCHEDULE', 60 * 1000)
      ).format('YYYY-MM-DD')
    }

    switch (payload.TaxType) {
      case '2':
        payload.CustomsClearance = get(EZPAY, 'CUSTOMS_CLEARANCE', '1')
        payload.TaxRate = 0
        payload.TaxAmt = 0
        payload.Amt = get(data, 'amtSales', 0)
        payload.TotalAmt = get(data, 'amtSales', 0)
        break
      case '3':
        payload.TaxRate = 0
        payload.TaxAmt = 0
        payload.Amt = get(data, 'amtSales', 0)
        payload.TotalAmt = get(data, 'amtSales', 0)
        break
      default:
        payload.TaxRate = get(EZPAY, 'TAX_RATE', 5)
        payload.TaxAmt = Math.round(
          get(data, 'amtSales', 0) * (get(EZPAY, 'TAX_RATE', 5) / 100)
        )
        if (payload.TaxType === '9') {
          payload.Amt =
            get(data, 'amtSales', 0) +
            get(data, 'amtZero', 0) +
            get(data, 'amtFree', 0) -
            payload.TaxAmt
          payload.TotalAmt =
            get(data, 'amtSales', 0) +
            get(data, 'amtZero', 0) +
            get(data, 'amtFree', 0)
          payload.ItemTaxType = map(get(data, 'items', []), (item) =>
            get(item, 'taxType', 1)
          ).join('|')
        } else {
          payload.Amt = get(data, 'amtSales', 0) - payload.TaxAmt
          payload.TotalAmt = get(data, 'amtSales', 0)
        }
    }

    if (payload.Category === 'B2B') {
      if (
        !get(data, 'businessTitle') ||
        !get(data, 'businessAddress') ||
        !get(data, 'businessTaxNo')
      ) {
        /** Got incomplete buyer info, so we're not gonna gen invoice immediatelly and make Status = 0. */
        payload.Status = '0'
      }
      payload.PrintFlag = 'Y'
      payload.BuyerName = get(data, 'businessTitle', '-')
      payload.BuyerUBN = get(data, 'businessTaxNo', '-')
      payload.BuyerAddress = get(data, 'businessAddress', '-')
      delete payload.CarrierType

      payload.ItemPrice = map(get(data, 'items', []), (item) =>
        Math.round(get(item, 'price', 0) / (1 + payload.TaxRate / 100))
      ).join('|')
      payload.ItemAmt = map(get(data, 'items', []), (item) =>
        Math.round(
          (get(item, 'price', 0) / (1 + payload.TaxRate / 100)) *
            get(item, 'count', 0)
        )
      ).join('|')
      if (payload.TaxType === '9') {
        payload.TaxType = '1'
        console.error('Not offering this taxtype yet.')
        /**
         *  throw new Error('Not offering this taxtype yet.')
         */
      }
    } else if (payload.Category === 'B2C') {
      payload.ItemPrice = map(get(data, 'items', []), (item) =>
        get(item, 'price', 0)
      ).join('|')
      payload.ItemAmt = payload.ItemPrice
      if (get(data, 'loveCode')) {
        const expLovecode = /^[0-9]{3,7}$/
        if (expLovecode.test(get(data, 'loveCode', ''))) {
          payload.LoveCode = get(data, 'loveCode')
          /** payload.CarrierType should be null */
        } else {
          /**
           *
           *  throw new Error('Incorrect love-code format.')
           *  payload.CarrierType = CARRIER_TYPE.EXPAY
           *  payload.CarrierNum = get(data, 'member_mail', '-')
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
            if (!expCarrierNum.test(get(data, 'carrierNum'))) {
              /**
               *
               *  payload.CarrierType = CARRIER_TYPE.EXPAY
               *  payload.CarrierNum = get(data, 'member_mail', '-')
               *  throw new Error('Incorrect carrier number.')
               *
               */

              delete payload.CarrierType
              payload.PrintFlag = 'Y'

              message += ` Incorrect carrier num: ${get(data, 'carrierNum')}.`
            } else {
              payload.CarrierNum = get(data, 'carrierNum').trim()
            }
            break
          }
          case '2':
            payload.CarrierNum = get(
              data,
              'carrierNum',
              get(data, 'member_mail', '-')
            ).trim()
            payload.BuyerEmail = get(
              data,
              'carrierNum',
              get(data, 'member_mail', '-')
            ).trim()
            break
          default:
            delete payload.CarrierType
            payload.PrintFlag = 'Y'
        }
      }
    }
    payload.Comment = truncate(message, 68)
    debug('payload: ', payload)

    const KEY = get(EZPAY, 'KEY', '')
    const IV = get(EZPAY, 'IV', '')

    const payloadString = map(
      payload,
      (item, key) => `${key}=${rawurlencode(item)}`
    ).join('&')
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
    debug('ciphertext: ', ciphertext)

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
    debug('decryptedData: ', decryptedData)

    superagent
      .post(get(EZPAY, 'HOST', ''))
      .type('form')
      .send({
        MerchantID_: get(EZPAY, 'ID', ''),
        PostData_: ciphertext,
      })
      .timeout(11000)
      .end((error, response) => {
        if (!error && response) {
          const result = JSON.parse(response.text)
          if (get(result, 'Status') === 'SUCCESS') {
            resolve(result)
          } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
              status: 400,
              message: get(result, 'Message'),
            })
          }
        } else {
          reject(error)
        }
      })
  })

const genInvoice = (req) => {
  const data = get(req, 'body', {})
  data.member_name =
    data.member_name || get(req, 'user.nickname', get(req, 'user.email', '-'))
  data.member_mail = data.member_mail || get(req, 'user.email', '-')

  console.log('[Invoice] Prepare to generate invoice')
  console.log('[Invoice] req.body is: ', data)

  createInvoice(data)
    .then((response) => {
      debug('GENED INVOICE SUCCESSFULLY.')
      debug('response', response)
      console.log('[Invoice] GENED INVOICE SUCCESSFULLY.')
      console.log('[Invoice] response: ', response)
    })
    .catch((error) => {
      const errWrapper = handlerError(error)
      console.error(
        `Error occurred when gen inv for member-transaction:`,
        get(req, 'user.email', ''),
        '-',
        get(data, 'transaction_id', '')
      )
      console.error(errWrapper.text)
    })
}

module.exports = {
  createInvoice,
  genInvoice,
}
