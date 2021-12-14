<template>
  <section style="display: flex; flex-direction: column;">
    <div
      v-for="(filterOptions, filterName) in filters"
      :key="filterName"
      style="display: flex; flex-direction: column;"
    >
      <h1>{{ filterName }}</h1>
      <label
        v-for="(optionValue, optionName) in filterOptions"
        :key="optionName"
      >
        {{ optionName }}
        <input
          type="checkbox"
          :checked="optionValue"
          @change="handleChange(filterName, optionName)"
        />
      </label>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      filters: this.$store.state.data.filters,
    }
  },
  methods: {
    handleChange(filterName, optionName) {
      this.$store.commit('data/SET_FILTER_OPTION', { filterName, optionName })
    },
  },
}
</script>

<style scoped>
h1 {
  font-size: 22px;
}
</style>
