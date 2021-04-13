// use express rather than koa because of donate is migrate from readr-web-api legacy
const express = require('express')
const router = express()
const { post: axiosPost } = require('axios')
const isEmail = require('validator/lib/isEmail')
const { default: isMobilePhone } = require('validator/lib/isMobilePhone')
const { CMS_ENDPOINT_DEPRECATED } = require('../configs/config')
const { POINT_OBJECT_TYPE } = require('../helpers/index.js')
const { genInvoice } = require('./middleware/invoice')
const { handleExpressCors: handleCors } = require('./middleware/cors.js')

const apiHost = CMS_ENDPOINT_DEPRECATED

const validateObjectType = (req, res, next) => {
  try {
    const objectType = req?.body?.['object_type']
    console.log('objectType: ', objectType)
    if (objectType === POINT_OBJECT_TYPE.DONATE) {
      next()
    } else {
      res.status(403).end('Invalid object type')
    }
  } catch (e) {
    console.error(e)
  }
}

const validateDonator = (req, res, next) => {
  try {
    const payload = req?.body ?? {}
    const memberName = payload?.['member_name'] ?? ''
    const memberMail = payload?.['member_mail'] ?? ''
    const memberPhone = payload?.['member_phone'] ?? ''
    console.log('memberName: ', memberName)
    console.log('memberMail: ', memberMail)
    console.log('memberPhone: ', memberPhone)
    const valid =
      memberName && isEmail(memberMail) && isMobilePhone(memberPhone)
    if (valid) {
      next()
    } else {
      res.status(403).end('Invalid memberName, memberMail or memberPhone')
    }
  } catch (e) {
    console.error(e)
  }
}

router.use(express.json())

// For CORS non-simple requests
router.options('/*', handleCors, (res) => {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  )
  res.send(200)
})

router.post(
  '/',
  handleCors,
  validateObjectType,
  validateDonator,
  async (req, res, next) => {
    console.log('Got a point reward call!!')
    console.log('req.url', req.url)

    const url = `${apiHost}/points`

    const invoiceItem = Object.assign({}, req.body.invoiceItem)
    delete req.body.invoiceItem

    const payload = req.body

    console.log('invoiceItem:')
    console.log(invoiceItem)

    console.log('payload', invoiceItem.lastFourNum)
    console.log(payload)

    try {
      const { data: resData } = await axiosPost(url, payload)
      const transactionId = resData?.id
      res.json(resData)

      /** go next to gen invoice if object_type === POINT_OBJECT_TYPE.DONATE */
      if (
        req?.body?.['object_type'] !== POINT_OBJECT_TYPE.DONATE ||
        !transactionId
      ) {
        return
      }

      invoiceItem.amtSales = Math.abs(payload.currency || 0)
      invoiceItem.good_name = `Readr Donate: $${invoiceItem.amtSales}(NTD).`

      /** Reset req.body and construct invoice date. */
      req.body = Object.assign({}, invoiceItem, {
        items: [
          {
            name: invoiceItem.good_name,
            price: invoiceItem.amtSales,
            count: 1,
          },
        ],
        member_name: payload.member_name,
        member_mail: payload.member_mail,
        transaction_id: transactionId,
      })
      next()
    } catch (e) {
      res.status(500).send('donate error')
      console.error(
        `Error occurred when depositing for member ${payload.member_name}/${payload.member_mail}`
      )
      console.error(e)
    }
  },
  genInvoice
)

module.exports = router
