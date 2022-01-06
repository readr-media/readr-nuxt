<template>
  <ul>
    <li v-for="[key, value] in Object.entries(fieldInfo)" :key="key">
      <div class="field-info">
        <span class="field-info__key">{{ key }}</span>
        <span class="field-info__value">{{ value }}</span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    fieldInfo: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  margin: -4px -8px;
}
li {
  margin: 4px 8px;
}

.field-info {
  display: flex;
  font-size: 12px;
  &__key {
    font-weight: 900;
  }
  &__value {
    margin: 0 0 0 16px;
  }
}
</style>
