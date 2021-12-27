<template>
  <section>
    <DashboardBillInfoCategory :categories="categories" :tags="tags" />
    <DashboardBillInfoName :text="tooltip['名稱']" style="margin-top: 12px;" />
    <DashboardBillInfoFieldInfo
      :fieldInfo="fieldInfo"
      style="margin-top: 20px;"
    />
    <DashboardBillInfoFieldInfoValueList
      :keyName="'提案人'"
      :listText="tooltip['每版本首位提案人']"
      style="margin-top: 20px;"
    />
    <div style="margin-top: 20px;">
      <p class="key-name">每屆審議狀態</p>
      <ChartExaminationProgressBar
        :data="dataChartExaminationProgressBar"
        :xTickValues="chartExaminationProgressBarXTickValues"
        style="margin-top: 16px;"
      />
    </div>
    <div style="margin-top: 56px;">
      <p class="key-name">
        <span>提案總次數</span>
        <span class="key-name__hint">（長按色塊，顯示各黨團提案次數）</span>
      </p>
      <ChartStackBar
        style="margin-top: 12px;"
        :data="dataChartStackBarProposal"
      />
    </div>
    <div style="margin-top: 12px;">
      <p class="key-name">
        <span>排審總次數</span>
        <span
          v-if="!isDataChartStackBarExaminationNotExist"
          class="key-name__hint"
        >
          （長按色塊，顯示各黨團提案次數）
        </span>
      </p>
      <span v-if="isDataChartStackBarExaminationNotExist">
        0
      </span>
      <ChartStackBar
        v-else
        style="margin-top: 12px;"
        :data="dataChartStackBarExamination"
      />
    </div>
    <div v-if="tooltip['重點法案標注'] === 'yes'">
      ---------
      <br />
      <button style="border: 1px solid black;">看文章</button>
    </div>
  </section>
</template>

<script>
import partyColor from '../constants/partyColor.json'
import chartExaminationProgressBarXTickValues from '../constants/chartExaminationProgressBarXTickValues.json'
import billCategories from '../constants/billCategories.json'
import billPresets from '../constants/billPresets.json'
import ChartExaminationProgressBar from './ChartExaminationProgressBar.vue'
import ChartStackBar from './ChartStackBar.vue'
import DashboardBillInfoCategory from './DashboardBillInfoCategory.vue'
import DashboardBillInfoName from './DashboardBillInfoName.vue'
import DashboardBillInfoFieldInfo from './DashboardBillInfoFieldInfo.vue'
import DashboardBillInfoFieldInfoValueList from './DashboardBillInfoFieldInfoValueList.vue'

export default {
  components: {
    DashboardBillInfoCategory,
    DashboardBillInfoName,
    DashboardBillInfoFieldInfo,
    DashboardBillInfoFieldInfoValueList,
    ChartStackBar,
    ChartExaminationProgressBar,
  },
  props: {
    tooltip: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      chartExaminationProgressBarXTickValues,
    }
  },
  computed: {
    categories() {
      return this.tooltip['類別']
        ?.split('、')
        .map(function mapToBillCategoryTag(value) {
          return {
            color: billCategories[value].color,
            text: value,
          }
        })
    },
    tags() {
      return Object.entries(this.tooltip)
        .filter(function filterPresets([key]) {
          return Object.keys(billPresets).includes(key)
        })
        .filter(function filterYes([key, value]) {
          return value === 'yes'
        })
        .map(function mapToPresetTag([key]) {
          return {
            emoji: billPresets[key]?.emoji,
            text: key.replace('？', ''),
          }
        })
    },
    fieldInfo() {
      return {
        是否三讀通過: this.tooltip['是否三讀通過'] === 'pass' ? '是' : '否',
        首次提案日期: this.tooltip['首次提案日期'],
        停留屆期: this.tooltip['停留屆期'],
        黨團協商次數: this.tooltip['黨團協商次數'],
      }
    },
    proposals() {
      return this.tooltip['每版本首位提案人']?.split('、')
    },

    dataChartExaminationProgressBar() {
      if (!Object.keys(this.tooltip).length) {
        return undefined
      }
      return Object.entries(this.tooltip)
        .filter(function filterSessionProgressProperties([key, value]) {
          return (
            ['07屆', '08屆', '09屆', '10屆'].includes(key) && value !== 'NA'
          )
        })
        .map(function mapToChartDataFormat([key, value], index, array) {
          return {
            session: +key.replace('屆', ''),
            progressEnd: getBillProgressEndAtSession(value),
            barColor:
              +index === array.length - 1 ? 'black' : 'rgba(1, 1, 1, 0.4)',
            hasLeftArrowIcon: ['撤回', '退回程序', '不予審議'].includes(
              getBillProgressEndAtSessionLastRecord(value)
            ),
            hasRightGoalIcon: [
              '一讀(待審)',

              '委員會',
              '委員會審議中',
              '委員會審竣',

              '逕付二讀',
              '二讀廣泛討論',
              '二讀逐條討論',
              '二讀(議決)',

              '三讀',
              '三讀後復議',
              '覆議',
            ].includes(getBillProgressEndAtSessionLastRecord(value)),
          }
        })
        .sort(function ascendingWithSession(a, b) {
          return a.session - b.session
        })

      function getBillProgressEndAtSessionLastRecord(billProgressAtSession) {
        let step = billProgressAtSession
          .split(';')
          .reverse()
          .find(function lastCharNotZero(value) {
            const endsWithIntegerButNotZero = /[1-9]\d*$/
            return endsWithIntegerButNotZero.test(value)
          })

        if (!step) {
          return '提案'
        }
        const stepRegexp = /(\D+)[1-9]\d*$/
        step = step.match(stepRegexp)[1]
        return step
      }

      function getBillProgressEndAtSession(billProgressAtSession) {
        const step = getBillProgressEndAtSessionLastRecord(
          billProgressAtSession
        )

        switch (step) {
          case '一讀(待審)':
          case '不予審議': {
            return '◆一讀'
          }

          case '委員會':
          case '委員會審議中':
          case '委員會審竣': {
            return '◆委員會'
          }

          case '逕付二讀':
          case '二讀廣泛討論':
          case '二讀逐條討論':
          case '二讀(議決)':
          case '撤回': {
            return '◆二讀'
          }

          case '三讀':
          case '覆議':
          case '三讀後復議': {
            return '◆三讀'
          }

          case '提案':
          case '退回程序':
          default: {
            return '◆提案'
          }
        }
      }
    },

    dataChartStackBarProposal() {
      if (!Object.keys(this.tooltip).length) {
        return undefined
      }

      const proposals = Object.entries(this.tooltip)
        .filter(function filterProposalProperties([key, value]) {
          return key.endsWith('提案數')
        })
        .filter(function isValueInteger([key, value]) {
          return +value > 0
        })

      const proposalsTotalCount = proposals.reduce(function add(acc, curr) {
        return acc + +curr[1]
      }, 0)

      return proposals.map(function mapToChartDataFormat([key, value]) {
        return {
          color: (function getColor(key) {
            const regexp = /(\D+)提案數$/
            const party = key.match(regexp)[1]
            return partyColor[party]
          })(key),
          value: +value / proposalsTotalCount,
          tooltipText: `${key}:${value}次`,
        }
      })
    },

    isDataChartStackBarExaminationNotExist() {
      return this.dataChartStackBarExamination?.every(function checkValueExist({
        value,
      }) {
        return !value
      })
    },

    dataChartStackBarExamination() {
      if (!Object.keys(this.tooltip).length) {
        return undefined
      }

      const proposals = Object.entries(this.tooltip)
        .filter(function filterProposalProperties([key, value]) {
          return key.endsWith('排審數')
        })
        .filter(function isValueInteger([key, value]) {
          return +value > 0
        })

      const proposalsTotalCount = proposals.reduce(function add(acc, curr) {
        return acc + +curr[1]
      }, 0)

      return proposals.map(function mapToChartDataFormat([key, value]) {
        return {
          color: (function getColor(key) {
            const regexp = /(\D+)排審數$/
            const party = key.match(regexp)[1]
            return partyColor[party]
          })(key),
          value: +value / proposalsTotalCount,
          tooltipText: `${key}:${value}次`,
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
section {
  padding: 47px 13px;
}

.key-name {
  font-size: 12px;
  font-weight: 900;
  &__hint {
    font-weight: normal;
    @include media-breakpoint-up(xl) {
      display: none;
    }
  }
}
</style>
