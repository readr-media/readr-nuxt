<template>
  <section class="filters">
    <div
      v-for="(filterOptions, filterName) in filters"
      :key="filterName"
      class="filters__filter-category filter-category"
    >
      <h1>{{ filterName }}</h1>
      <FilterOption
        v-for="(optionValue, optionName) in filterOptions"
        :key="optionName"
        class="filter-category__label"
        :checked="optionValue"
        :optionIconColor="
          filterName === '類別'
            ? billCategories[optionName].color
            : 'transparent'
        "
        :optionName="optionName"
        @change="
          (optionName) => {
            handleChange(filterName, optionName)
          }
        "
      />
    </div>
  </section>
</template>

<script>
import billCategories from '../constants/billCategories.json'
import FilterOption from './FilterOption.vue'

export default {
  components: {
    FilterOption,
  },
  data() {
    return {
      filters: this.$store.state.data.filters,
      billCategories,
    }
  },
  methods: {
    handleChange(filterName, optionName) {
      this.$store.commit('data/SET_FILTER_OPTION', { filterName, optionName })
    },
  },
}
</script>

<style lang="scss" scoped>
.filters {
  display: flex;
  flex-direction: column;
  &__filter-category {
    & + & {
      margin: 8px 0 0 0;
    }
  }
}

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
