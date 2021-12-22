import axios from 'axios'
import mapValues from 'lodash/mapValues'
import billCategories from '../constants/billCategories.json'
import * as utils from '../utils'
import hue from '../constants/hue.json'

/* global d3 */

const sortComparators = {
  類別: {
    ascending(a, b) {
      return a['類別'].localeCompare(b['類別'])
    },
    descending(a, b) {
      return b['類別'].localeCompare(a['類別'])
    },
  },
  屆期: {
    ascending(a, b) {
      return (
        utils.dataProcessHelpers.getBillSessionNumber(a) -
        utils.dataProcessHelpers.getBillSessionNumber(b)
      )
    },
    descending(a, b) {
      return (
        utils.dataProcessHelpers.getBillSessionNumber(b) -
        utils.dataProcessHelpers.getBillSessionNumber(a)
      )
    },
  },
  停留屆期: {
    ascending(a, b) {
      return +a['停留屆期'] - +b['停留屆期']
    },
    descending(a, b) {
      return +b['停留屆期'] - +a['停留屆期']
    },
  },
  提案總次數: {
    ascending(a, b) {
      return +a['提案總次數'] - +b['提案總次數']
    },
    descending(a, b) {
      return +b['提案總次數'] - +a['提案總次數']
    },
  },
  排審總次數: {
    ascending(a, b) {
      return +a['排審總次數'] - +b['排審總次數']
    },
    descending(a, b) {
      return +b['排審總次數'] - +a['排審總次數']
    },
  },
}
const filterCriterias = {
  是否三讀通過: {
    是(bill) {
      return bill['是否三讀通過'] === 'pass'
    },
    否(bill) {
      return bill['是否三讀通過'] === 'fail'
    },
  },
  屆期: {
    第七屆(bill) {
      // return bill['屆期'] === '07屆'
      return bill['07屆'] !== 'NA'
    },
    第八屆(bill) {
      // return bill['屆期'] === '08屆'
      return bill['08屆'] !== 'NA'
    },
    第九屆(bill) {
      // return bill['屆期'] === '09屆'
      return bill['09屆'] !== 'NA'
    },
    第十屆(bill) {
      // return bill['屆期'] === '10屆'
      return bill['10屆'] !== 'NA'
    },
  },
  類別: {
    ...mapValues(billCategories, function (value, key) {
      return function (bill) {
        return bill['類別'].split('、').includes(key)
      }
    }),
  },
  停留屆期: {
    一屆(bill) {
      return +bill['停留屆期'] === 1
    },
    兩屆(bill) {
      return +bill['停留屆期'] === 2
    },
    三屆(bill) {
      return +bill['停留屆期'] === 3
    },
    四屆(bill) {
      return +bill['停留屆期'] === 4
    },
  },
  行政院優先法案: {
    第七屆(bill) {
      return bill['行政院優先法案'] === 'yes' && bill['屆期'] === '07屆'
    },
    第八屆(bill) {
      return bill['行政院優先法案'] === 'yes' && bill['屆期'] === '08屆'
    },
    第九屆(bill) {
      return bill['行政院優先法案'] === 'yes' && bill['屆期'] === '09屆'
    },
  },
  黨團協商次數: {
    '5 次以下'(bill) {
      return +bill['黨團協商次數'] < 5
    },
    '5 ~ 10 次'(bill) {
      return +bill['黨團協商次數'] >= 5 && +bill['黨團協商次數'] < 10
    },
    '10 次以上'(bill) {
      return +bill['黨團協商次數'] >= 10
    },
  },
  提案總次數: {
    '5 次以下'(bill) {
      return +bill['提案總次數'] < 5
    },
    '5 ~ 10 次'(bill) {
      return +bill['提案總次數'] >= 5 && +bill['提案總次數'] < 10
    },
    '10 ~ 20 次'(bill) {
      return +bill['提案總次數'] >= 10 && +bill['提案總次數'] < 20
    },
    '20 次以上'(bill) {
      return +bill['提案總次數'] >= 20
    },
  },
  提案政黨: {
    國民黨(bill) {
      return +bill['國民黨提案數'] > 0
    },
    民進黨(bill) {
      return +bill['民進黨提案數'] > 0
    },
    親民黨(bill) {
      return +bill['親民黨提案數'] > 0
    },
    時代力量(bill) {
      return +bill['時代力量提案數'] > 0
    },
    台灣基進(bill) {
      return +bill['台灣基進提案數'] > 0
    },
    台灣民眾黨(bill) {
      return +bill['台灣民眾黨提案數'] > 0
    },
    台灣團結聯盟(bill) {
      return +bill['台灣團結聯盟提案數'] > 0
    },
    無黨籍(bill) {
      return +bill['無黨籍提案數'] > 0
    },
    無黨團結聯盟(bill) {
      return +bill['無黨團結聯盟提案數'] > 0
    },
    政府(bill) {
      return +bill['政府提案數'] > 0
    },
  },
  排審總次數: {
    '0 次'(bill) {
      return +bill['排審總次數'] === 0
    },
    '5 次以下'(bill) {
      return +bill['排審總次數'] < 5
    },
    '5 ~ 10 次'(bill) {
      return +bill['排審總次數'] >= 5 && +bill['排審總次數'] < 10
    },
    '10 ~ 20 次'(bill) {
      return +bill['排審總次數'] >= 10 && +bill['排審總次數'] < 20
    },
    '20 次以上'(bill) {
      return +bill['排審總次數'] >= 20
    },
  },
  排審政黨: {
    國民黨(bill) {
      return +bill['國民黨排審數'] > 0
    },
    民進黨(bill) {
      return +bill['民進黨排審數'] > 0
    },
    台灣團結聯盟(bill) {
      return +bill['台灣團結聯盟排審數'] > 0
    },
    台灣民眾黨(bill) {
      return +bill['台灣民眾黨排審數'] > 0
    },
  },
}

export const state = () => ({
  dataOriginal: [],
  data: [],
  extents: {
    停留屆期: [],
    提案總次數: [],
    排審總次數: [],
  },
  singleColor: {
    藍綠色: true,
    黑白色: false,
  },
  colors: {
    類別: true,
    停留屆期: false,
    提案總次數: false,
    排審總次數: false,
  },
  sorts: {
    類別: null,
    屆期: 'ascending',
    提案總次數: null,
    排審總次數: null,
    停留屆期: null,
  },
  filters: {
    是否三讀通過: {
      是: false,
      否: false,
    },
    屆期: {
      第七屆: false,
      第八屆: false,
      第九屆: false,
      第十屆: false,
    },
    類別: {
      ...mapValues(billCategories, function () {
        return false
      }),
    },
    停留屆期: {
      一屆: false,
      兩屆: false,
      三屆: false,
      四屆: false,
    },
    行政院優先法案: {
      第七屆: false,
      第八屆: false,
      第九屆: false,
    },
    黨團協商次數: {
      '5 次以下': false,
      '5 ~ 10 次': false,
      '10 次以上': false,
    },
    提案總次數: {
      '5 次以下': false,
      '5 ~ 10 次': false,
      '10 ~ 20 次': false,
      '20 次以上': false,
    },
    提案政黨: {
      國民黨: false,
      民進黨: false,
      親民黨: false,
      時代力量: false,
      台灣基進: false,
      台灣民眾黨: false,
      台灣團結聯盟: false,
      無黨籍: false,
      無黨團結聯盟: false,
      政府: false,
    },
    排審總次數: {
      '0 次': false,
      '5 次以下': false,
      '5 ~ 10 次': false,
      '10 ~ 20 次': false,
      '20 次以上': false,
    },
    排審政黨: {
      國民黨: false,
      民進黨: false,
      台灣團結聯盟: false,
      台灣民眾黨: false,
    },
  },
})

export const getters = {
  colorScale(state) {
    function getEnabledColorOption(option) {
      const optionValue = option[1]
      return optionValue === true
    }
    const singleColorBy = Object.entries(state.singleColor).filter(
      getEnabledColorOption
    )?.[0]?.[0]
    const colorBy = Object.entries(state.colors).filter(
      getEnabledColorOption
    )?.[0]?.[0]
    return d3
      .scaleSequential()
      .domain(state.extents[colorBy] ?? [])
      .range(Object.values(hue[singleColorBy]))
  },
}

export const mutations = {
  SET_DATA(state, data) {
    const _data = data.sort(sortComparators['屆期'].ascending)
    state.data = _data
    state.dataOriginal = _data
    createExtentsOfData(state.extents, _data)
  },
  SORT_DATA(state, { sortBy = '屆期', orderBy = 'ascending' } = {}) {
    state.data = state.data.sort(sortComparators[sortBy][orderBy])
    state.dataOriginal = state.dataOriginal.sort(
      sortComparators[sortBy][orderBy]
    )

    Object.keys(state.sorts).forEach(function resetSort(sort) {
      state.sorts[sort] = null
    })
    state.sorts[sortBy] = orderBy
  },

  RESET_DATA(state) {
    state.data = state.dataOriginal

    for (const [filterName, filterOptions] of Object.entries(state.filters)) {
      for (const [optionName, optionValue] of Object.entries(filterOptions)) {
        if (optionValue) {
          state.filters[filterName][optionName] = false
        }
      }
    }

    createExtentsOfData(state.extents, state.data)
  },

  SET_SINGLE_COLOR_OPTION(state, optionName) {
    Object.keys(state.singleColor).forEach(function resetColor(color) {
      state.singleColor[color] = false
    })
    state.singleColor[optionName] = true
  },
  SET_COLOR_OPTION(state, optionName) {
    Object.keys(state.colors).forEach(function resetColor(color) {
      state.colors[color] = false
    })
    state.colors[optionName] = true
  },

  SET_FILTER_OPTION(state, { filterName, optionName }) {
    state.filters[filterName][optionName] = !state.filters[filterName][
      optionName
    ]

    const filters = getFilterCriterias(state.filters, filterCriterias)
    state.data = filterArray(state.dataOriginal, filters)

    createExtentsOfData(state.extents, state.data)
  },

  SET_PRESET_FILTER(state, presetName) {
    switch (presetName) {
      case 'mine': {
        // const filters = {
        //   停留屆期: [filterCriterias['停留屆期']['四屆']],
        //   排審總次數: [filterCriterias['排審總次數']['0 次']],
        //   是否三讀通過: [filterCriterias['是否三讀通過']['否']],
        // }
        //
        // state.data = filterArray(state.dataOriginal, filters)

        const filters = {
          地雷區: [
            function (bill) {
              return bill['地雷區'] === 'yes'
            },
          ],
        }
        state.data = filterArray(state.dataOriginal, filters)

        break
      }

      case 'argue': {
        const filters = {
          戰火區: [
            function (bill) {
              return bill['戰火區'] === 'yes'
            },
          ],
        }
        state.data = filterArray(state.dataOriginal, filters)

        break
      }

      case 'executiveYuanPrioritizePass': {
        // const filters = {
        //   行政院優先法案: Object.values(filterCriterias['行政院優先法案']),
        //   是否三讀通過: [filterCriterias['是否三讀通過']['是']],
        // }
        // state.data = filterArray(state.dataOriginal, filters)
        const filters = {
          '政府主推哪些優先法案通過？': [
            function (bill) {
              return bill['政府主推哪些優先法案通過？'] === 'yes'
            },
          ],
        }
        state.data = filterArray(state.dataOriginal, filters)

        break
      }

      case 'executiveYuanPrioritizeFail': {
        // const filters = {
        //   行政院優先法案: Object.values(filterCriterias['行政院優先法案']),
        //   是否三讀通過: [filterCriterias['是否三讀通過']['否']],
        // }
        // state.data = filterArray(state.dataOriginal, filters)
        const filters = {
          '完全執政都無法通過的法案？': [
            function (bill) {
              return bill['完全執政都無法通過的法案？'] === 'yes'
            },
          ],
        }
        state.data = filterArray(state.dataOriginal, filters)

        break
      }

      case 'KMTDPPPrefer': {
        // const filters = {
        //   排審數: [
        //     function (bill) {
        //       return +bill['國民黨排審數'] > 5
        //     },
        //     function (bill) {
        //       return +bill['民進黨排審數'] > 5
        //     },
        //   ],
        // }
        //
        // state.data = filterArray(state.dataOriginal, filters)

        const filters = {
          國民兩黨主力法案: [
            function (bill) {
              return bill['國民兩黨主力法案'] === 'yes'
            },
          ],
        }
        state.data = filterArray(state.dataOriginal, filters)

        break
      }

      case 'smallPartyPreferButNotPopular': {
        // const filters = {
        //   排審總次數: [filterCriterias['排審總次數']['0 次']],
        //   提案政黨: [
        //     filterCriterias['提案政黨']['時代力量'],
        //     filterCriterias['提案政黨']['台灣民眾黨'],
        //     filterCriterias['提案政黨']['台灣基進'],
        //   ],
        //   提案總次數: [
        //     function (bill) {
        //       return +bill['提案總次數'] > 0
        //     },
        //   ],
        // }
        //
        // state.data = filterArray(state.dataOriginal, filters)

        const filters = {
          小黨難突破的法案: [
            function (bill) {
              return bill['小黨難突破的法案'] === 'yes'
            },
          ],
        }
        state.data = filterArray(state.dataOriginal, filters)

        break
      }
    }

    createExtentsOfData(state.extents, state.data)
  },
}

export const actions = {
  async FETCH_DATA({ commit }) {
    const res = await axios.get('/legislature/test-data-8000-new.json')
    this.data = res.data
    commit('SET_DATA', res.data)
  },
}

function createExtentsOfData(extents, data) {
  for (const key of Object.keys(extents)) {
    extents[key] = d3
      .extent(data, function (d) {
        return +d[key]
      })
      .map(function replaceMaxIfSameWithMin(value, index, array) {
        if (index === 1 && value === array[0]) {
          return Math.max(Number.MAX_SAFE_INTEGER, value)
        }
        return value
      })
  }
}

/* eslint import/namespace: ['error', { allowComputed: true }] */
export function filterArray(array, criterias, conditionOrder = ['or', 'and']) {
  const predicate = utils[conditionOrder[1]](
    Object.values(criterias)
      .map(function todo(criterias) {
        if (!criterias.length) {
          return null
        }
        return utils[conditionOrder[0]](criterias)
      })
      .filter(function todo(value) {
        return value !== null
      })
  )
  return array.filter(predicate)
}

export function collectTrueFilters(filters) {
  return mapValues(filters, function mapOptionsToTrueOnly(options) {
    return [
      ...Object.entries(options)
        .filter(function checkOptionValueIsTrue(value) {
          const optionValue = value[1]
          return optionValue === true
        })
        .map(function getOptionName(value) {
          const optionName = value[0]
          return optionName
        }),
    ]
  })
}

export function getFilterCriterias(filters, criterias) {
  const filterEnabled = collectTrueFilters(filters)
  return mapValues(filterEnabled, function todo(enabledOptions, filterName) {
    return enabledOptions.map(function todo(optionName) {
      return criterias[filterName][optionName]
    })
  })
}
