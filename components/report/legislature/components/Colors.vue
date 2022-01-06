<template>
  <section class="filter-category">
    <h1>配色按照</h1>
    <FilterOption
      v-for="(optionValue, optionName) in colorOptions"
      :key="optionName"
      class="filter-category__label"
      :checked="optionValue"
      :optionName="optionName"
      @change="handleChange"
    />
  </section>
</template>

<script>
import FilterOption from './FilterOption.vue'

export default {
  components: {
    FilterOption,
  },
  data() {
    return {
      colorOptions: this.$store.state.data.colors,
    }
  },
  methods: {
    handleChange(optionName) {
      this.$store.commit('data/SET_COLOR_OPTION', optionName)
    },
  },
}
</script>

<style lang="scss" scoped>
.filter-category {
  display: flex;
  flex-direction: column;
  &__label {
    margin: 8px 0 0 0;
  }
}

h1 {
  font-size: 12px;
  color: #1b1b1b;
  font-weight: 900;
}
</style>
