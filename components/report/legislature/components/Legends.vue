<template>
  <div v-show="colorBy !== '類別'">
    <svg
      :key="`${colorBy}-${singleColorBy}-extent${$store.state.data.extents[colorBy]}`"
      ref="svg"
      style="color: white;"
    />
  </div>
</template>

<script>
import legend from '../utils/legend'

function getEnabledColorOption(option) {
  const optionValue = option[1]
  return optionValue === true
}

export default {
  computed: {
    colorBy() {
      const colorBy = Object.entries(this.$store.state.data.colors).filter(
        getEnabledColorOption
      )?.[0]?.[0]

      return colorBy
    },
    singleColorBy() {
      const singleColorBy = Object.entries(
        this.$store.state.data.singleColor
      ).filter(getEnabledColorOption)?.[0]?.[0]

      return singleColorBy
    },
  },
  watch: {
    async colorBy() {
      await this.$nextTick()
      this.updateLegend()
    },
    async singleColorBy() {
      await this.$nextTick()
      this.updateLegend()
    },
    async '$store.state.data.data'(value) {
      if (value.length) {
        await this.$nextTick()
        this.updateLegend()
      }
    },
  },
  methods: {
    updateLegend() {
      legend({
        ref: this.$refs.svg,
        // color: d3.scaleSequential([0, 100], d3.interpolateViridis),
        color: this.$store.getters['data/colorScale'],
        title: this.colorBy,
        ticks: 1,
        tickValues: this.$store.getters['data/colorScale'].domain(),
        marginLeft: 5,
        marginRight: 5,
      })
    },
  },
}
</script>
