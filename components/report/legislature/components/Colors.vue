<template>
  <section style="display: flex; flex-direction: column;">
    <h1>配色按照</h1>
    <label v-for="(optionValue, optionName) in colorOptions" :key="optionName">
      {{ optionName }}
      <input
        type="radio"
        :checked="optionValue"
        @change="handleChange(optionName)"
      />
    </label>
    <div v-show="!$store.state.data.colors['類別']">
      <h1>單色按照</h1>
      <label
        v-for="(optionValue, optionName) in colorSingleOptions"
        :key="optionName"
      >
        {{ optionName }}
        <input
          type="radio"
          :checked="optionValue"
          @change="handleChangeSingle(optionName)"
        />
      </label>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      colorOptions: this.$store.state.data.colors,
      colorSingleOptions: this.$store.state.data.singleColor,
    }
  },
  methods: {
    handleChange(optionName) {
      this.$store.commit('data/SET_COLOR_OPTION', optionName)
    },
    handleChangeSingle(optionName) {
      this.$store.commit('data/SET_SINGLE_COLOR_OPTION', optionName)
    },
  },
}
</script>

<style scoped>
h1 {
  font-size: 22px;
}
</style>
