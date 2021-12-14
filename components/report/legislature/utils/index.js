export function binaryAnd(predA, predB) {
  return function (obj) {
    return predA(obj) && predB(obj)
  }
}
export function binaryOr(predA, predB) {
  return function (obj) {
    return predA(obj) || predB(obj)
  }
}
export function and(preds) {
  return preds.reduce(binaryAnd, function (obj) {
    return true
  })
}
export function or(preds) {
  return preds.reduce(binaryOr, function (obj) {
    return false
  })
}

export const dataProcessHelpers = {
  // getBillSessionNumber(billSessionString) {
  //   const regexp = /(^0\d)屆/
  //   return Number(billSessionString.match(regexp)?.[1])
  // },
  getBillSessionNumber(bill) {
    if (bill['07屆'] !== 'NA') {
      return 7
    } else if (bill['08屆'] !== 'NA') {
      return 8
    } else if (bill['09屆'] !== 'NA') {
      return 9
    } else if (bill['10屆'] !== 'NA') {
      return 10
    }
  },
}
