<template>
  <div class="chart">
    <div class="chart__aside aside">
      <div
        v-for="tickValue of yTickValues"
        :key="tickValue"
        class="y-tick-value"
      >
        {{ tickValue }}
      </div>
    </div>
    <div class="chart__main main">
      <div class="bar-wrapper" :style="{ height: `${height}px` }">
        <div
          v-for="sessionProgress in data"
          :key="sessionProgress.session"
          :class="[
            'bar',
            { 'bar--left-arrow-icon': sessionProgress.hasLeftArrowIcon },
            { 'bar--right-goal-icon': sessionProgress.hasRightGoalIcon },
          ]"
          :style="{
            height: `${barHeight}px`,
            color: sessionProgress.barColor,
            backgroundColor: sessionProgress.barColor,
            width: getProgressBarWidth(sessionProgress),
          }"
        />
      </div>
      <div class="x-tick-wrapper">
        <div
          v-for="(tickValue, index) in xTickValues"
          :key="index"
          class="x-tick"
        >
          <div class="x-tick__tick-value x-tick__tick-value--top tick-value">
            <p
              v-for="word of tickValue.top"
              :key="word.text"
              :style="{
                color: word.color,
                fontWeight: word.isBold ? '900' : '400',
              }"
            >
              {{ word.text }}
            </p>
          </div>
          <div
            class="x-tick__tick-line tick-line"
            :style="{ width: `${xTickWidth}px`, height: `${height}px` }"
          />
          <div class="x-tick__tick-value x-tick__tick-value--bottom tick-value">
            <p
              v-for="word of tickValue.bottom"
              :key="word.text"
              :style="{
                color: word.color,
                fontWeight: word.isBold ? '900' : '400',
              }"
            >
              {{ word.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chartExaminationProgressBarXTickValues from '../constants/chartExaminationProgressBarXTickValues.json'

export default {
  props: {
    xTickValues: {
      type: Array,
      default: () => chartExaminationProgressBarXTickValues,
    },
    data: {
      type: Array,
      default: () => [
        {
          session: 7,
          progressEnd: '一讀',
          barColor: 'brown',
          hasLeftArrowIcon: true,
          hasRightGoalIcon: true,
        },
        {
          session: 8,
          progressEnd: '二讀',
          barColor: 'brown',
        },
        {
          session: 9,
          progressEnd: '二讀',
          barColor: 'brown',
        },
        {
          session: 10,
          progressEnd: '二讀',
          barColor: 'brown',
        },
      ],
    },
  },
  data() {
    return {
      xTickWidth: 2,
      barHeight: 7,
      barMargin: 11,
    }
  },
  computed: {
    yTickValues() {
      return this.data
        .map(function getSession(value) {
          return value.session
        })
        .map(function appendWithStringTh(value) {
          return value + 'th'
        })
    },
    height() {
      return (
        this.data.length * this.barHeight +
        (this.data.length - 1) * this.barMargin
      )
    },
  },
  methods: {
    getProgressBarWidth(data) {
      const proportionEachProgress = 100 / (this.xTickValues.length - 1)
      const progressEndAt = this.xTickValues.findIndex(
        function findProgressEndMatchXTick(value) {
          const text = value.top?.[0]?.text ?? ''
          return text === data.progressEnd
        }
      )
      return `${proportionEachProgress * progressEndAt}%`
    },
  },
}
</script>

<style scoped>
.chart {
  display: flex;
  padding: 16px 24px 16px 0;
}
.chart__main {
  margin: 0 0 0 2px;
}

.aside {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.y-tick-value {
  font-size: 12px;
  line-height: 7px;
  position: relative;
}

.main {
  position: relative;
  width: 100%;
}

.x-tick-wrapper {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.x-tick {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.x-tick__tick-value {
  position: absolute;
  width: max-content;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 100%;
}
.x-tick__tick-value--top {
  top: -24px;
}
.x-tick__tick-value--bottom {
  top: calc(100% + 8px);
}

.tick-line {
  background-color: black;
}

.tick-value {
  font-size: 12px;
}

.bar-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.bar {
  position: relative;
  display: flex;
  align-items: center;
  z-index: 2;
}
.bar--left-arrow-icon::before {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  transform: rotate(45deg);
  border-left: 3px solid currentColor;
  border-bottom: 3px solid currentColor;
}
.bar--right-goal-icon::after {
  content: '';
  position: absolute;
  right: -8px;
  width: 16px;
  height: 16px;
  transform: rotate(45deg);
  background-color: currentColor;
}
</style>
