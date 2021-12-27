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
    <div
      v-show="isTooltipShow"
      class="tooltip"
      :style="{
        left: `${tooltipX + 10}px`,
        top: `${tooltipY - 10}px`,
      }"
    >
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
      tooltipX: 0,
      tooltipY: 0,
      tooltipText: '',
    }
  },
  methods: {
    handleMouseover(e, data) {
      this.isTooltipShow = true
      this.tooltipX = e.clientX
      this.tooltipY = e.clientY
      this.tooltipText = data.tooltipText
    },
    handleMousemove(e) {
      this.tooltipX = e.clientX
      this.tooltipY = e.clientY
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
}
</style>
