<template>
  <section class="dashboard-wrapper">
    <Lightbox v-show="isTooltipVisible" @close="isTooltipVisible = false">
      <section>
        <p style="margin-top: 16px; margin-bottom: 8px;">
          類別：{{ tooltip['類別'] }}
        </p>
        <h1 style="margin-top: 8px; margin-bottom: 8px;">
          名稱：{{ tooltip['名稱'] }}
        </h1>
        <div style="margin-top: 8px; margin-bottom: 8px;">
          是否三讀通過：{{ tooltip['是否三讀通過'] === 'pass' ? '是' : '否' }}
        </div>
        <div style="margin-top: 8px; margin-bottom: 8px;">首次提案日期：❓</div>
        <div style="margin-top: 8px; margin-bottom: 8px;">
          停留屆期：{{ tooltip['停留屆期'] }}
        </div>
        <div style="margin-top: 8px; margin-bottom: 8px;">
          黨團協商次數：{{ tooltip['黨團協商次數'] }}
        </div>
        <div style="margin-top: 8px; margin-bottom: 8px;">提案人：🚧</div>
        <div style="margin-top: 8px; margin-bottom: 8px;">每屆審議狀態：🚧</div>
        <ChartExaminationProgressBar
          :data="dataChartExaminationProgressBar"
          :xTickValues="xTickValuesChartExaminationProgressBar"
        />
        <div style="margin-top: 16px; margin-bottom: 8px;">提案總次數：🚧</div>
        <div style="margin-top: 8px; margin-bottom: 8px;">排審總次數：🚧</div>
        ---------
        <div style="white-space: pre;">{{ formatJson(tooltip) }}</div>
      </section>
    </Lightbox>
    <ol
      v-for="(chunk, index) in dataChunk"
      :key="index"
      style="display: flex; flex-direction: column;"
    >
      <GridItem
        v-for="bill in chunk"
        :key="bill.id"
        :backgroundImage="getBillBackgroundImage(bill)"
        :verticalLength="Number(bill['停留屆期'])"
        @click.native="handleMouseClick(bill)"
      />
    </ol>
  </section>
</template>

<script>
import chunk from 'lodash/chunk'
import debounce from 'lodash/debounce'
import Lightbox from '../components/Lightbox.vue'
import ChartExaminationProgressBar from '../components/ChartExaminationProgressBar.vue'
import GridItem from '../components/GridItem.vue'

import billCategories from '../constants/billCategories.json'
import chartExaminationProgressBarXTickValues from '../constants/chartExaminationProgressBarXTickValues.json'

export default {
  components: {
    Lightbox,
    ChartExaminationProgressBar,
    GridItem,
  },
  data() {
    return {
      tooltip: {},
      isTooltipVisible: false,
      windowWidth: 0,
    }
  },
  computed: {
    dataChunk() {
      const isMobile = this.windowWidth < 1024
      const data = this.$store.state.data.data
      const size = isMobile
        ? Math.ceil(data.length / 10)
        : Math.ceil(data.length / 60)
      return chunk(this.$store.state.data.data, size)
    },
    xTickValuesChartExaminationProgressBar() {
      return chartExaminationProgressBarXTickValues.map(
        function transformEveryXTickValuesColor(value) {
          return value.map(function transformColor(value) {
            return { ...value, color: 'brown' }
          })
        }
      )
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
        .map(function mapToChartDataFormat([key, value]) {
          return {
            session: +key.replace('屆', ''),
            progressEnd: getBillProgressEndAtSession(value),
            barColor: 'brown',
            hasLeftArrowIcon: ['撤回', '退回程序'].includes(
              getBillProgressEndAtSessionLastRecord(value)
            ),
            hasRightGoalIcon: [
              '一讀(待審)',
              '不予審議',

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
            return +value[value.length - 1] !== 0
          })
        if (!step) {
          return '提案'
        }
        step = step.substring(0, step.length - 1)

        return step
      }
      function getBillProgressEndAtSession(billProgressAtSession) {
        const step = getBillProgressEndAtSessionLastRecord(
          billProgressAtSession
        )

        switch (step) {
          case '一讀(待審)':
          case '不予審議': {
            return '一讀'
          }

          case '委員會':
          case '委員會審議中':
          case '委員會審竣': {
            return '委員會'
          }

          case '逕付二讀':
          case '二讀廣泛討論':
          case '二讀逐條討論':
          case '二讀(議決)':
          case '撤回': {
            return '二讀'
          }

          case '三讀':
          case '覆議':
          case '三讀後復議': {
            return '三讀'
          }

          case '提案':
          case '退回程序':
          default: {
            return '提案'
          }
        }
      }
    },
  },
  async beforeMount() {
    await this.$store.dispatch('data/FETCH_DATA')
  },
  mounted() {
    this.windowWidth = window.innerWidth
    window.addEventListener(
      'resize',
      debounce(() => {
        this.windowWidth = window.innerWidth
      }, 1000)
    )
  },
  methods: {
    getFirstCategory(bill) {
      return bill['類別'].split('、')[0]
    },
    handleMouseClick(bill) {
      this.tooltip = bill
      this.isTooltipVisible = true
    },
    formatJson(json) {
      if (!json) {
        return
      }

      return JSON.stringify(json, null, 2)
    },
    getBillBackgroundImage(bill) {
      function getEnabledColorOption(option) {
        const optionValue = option[1]
        return optionValue === true
      }
      const colorBy = Object.entries(this.$store.state.data.colors).filter(
        getEnabledColorOption
      )?.[0]?.[0]

      switch (colorBy) {
        case '類別': {
          const categories = bill['類別'].split('、')
          const categoriesLength = categories.length
          if (!categoriesLength) {
            return 'linear-gradient(to right, white 0%, white 100%)'
          }

          const categoriesGradient = categories.map(
            function getGradientByCategories(category, index) {
              const colorCategory = billCategories[category]?.color ?? 'white'
              const scaleBegin = (100 / categoriesLength) * index
              const scaleEnd = (100 / categoriesLength) * (index + 1)
              return `${colorCategory} ${scaleBegin}%, ${colorCategory} ${scaleEnd}%`
            }
          )
          return `linear-gradient(to right, ${categoriesGradient.join(',')})`
        }

        default: {
          return `linear-gradient(to right, ${this.$store.getters[
            'data/colorScale'
          ](+bill[colorBy])} 0%, ${this.$store.getters['data/colorScale'](
            +bill[colorBy]
          )} 100%)`
        }
      }
    },
  },
}
</script>

<style scoped>
.dashboard-wrapper {
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
}
@media (min-width: 1024px) {
  .dashboard-wrapper {
    grid-template-columns: repeat(60, minmax(0, 1fr));
  }
}
</style>
