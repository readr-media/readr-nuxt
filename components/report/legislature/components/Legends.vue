<template>
  <div class="legends">
    <LegendsCategory v-show="colorBy === '類別'" />
    <LegendsSequential v-show="colorBy !== '類別'" />
  </div>
</template>

<script>
import LegendsCategory from './LegendsCategory.vue'
import LegendsSequential from './LegendsSequential.vue'

function getEnabledColorOption(option) {
  const optionValue = option[1]
  return optionValue === true
}

export default {
  components: {
    LegendsCategory,
    LegendsSequential,
  },
  computed: {
    colorBy() {
      const colorBy = Object.entries(this.$store.state.data.colors).filter(
        getEnabledColorOption
      )?.[0]?.[0]

      return colorBy
    },
  },
}
</script>
