<template>
  <div class="chart">
    <div
      v-for="(value, index) in data"
      :key="index"
      class="chart__bar bar"
      :style="{
        width: `${value.value * 100}%`,
        backgroundColor: value.color,
      }"
      @mouseover="handleMouseover($event, value)"
      @mousemove="handleMousemove"
      @mouseout="handleMouseout"
    />
    <div v-show="isTooltipShow" class="tooltip" :style="tooltipPosition">
      {{ tooltipText }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [
        {
          color: 'blue',
          value: 0.3,
          tooltipText: '時代力量:5次',
        },
        {
          color: 'red',
          value: 0.7,
          tooltipText: '時代力量:50次',
        },
      ],
    },
  },
  data() {
    return {
      isTooltipShow: false,
      tooltipPosition: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      tooltipText: '',
    }
  },
  methods: {
    handleMouseover(e, data) {
      this.isTooltipShow = true

      const shouldFlipTooltip = e.clientX > window.innerWidth / 2
      this.tooltipPosition = shouldFlipTooltip
        ? {
            top: `${e.clientY + 10}px`,
            right: `${window.innerWidth - e.clientX - 10}px`,
          }
        : {
            top: `${e.clientY + 10}px`,
            left: `${e.clientX + 10}px`,
          }

      this.tooltipText = data.tooltipText
    },
    handleMousemove(e) {
      const shouldFlipTooltip = e.clientX > window.innerWidth / 2
      this.tooltipPosition = shouldFlipTooltip
        ? {
            top: `${e.clientY + 10}px`,
            right: `${window.innerWidth - e.clientX - 10}px`,
          }
        : {
            top: `${e.clientY + 10}px`,
            left: `${e.clientX + 10}px`,
          }
    },
    handleMouseout() {
      this.isTooltipShow = false
    },
  },
}
</script>

<style scoped>
.chart {
  height: 31px;
  display: flex;
}

.bar {
  height: 100%;
}

.tooltip {
  position: fixed;
  background-color: white;
  font-size: 16px;
  background: #eeeeee;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  padding: 1px 3px;
}
</style>
