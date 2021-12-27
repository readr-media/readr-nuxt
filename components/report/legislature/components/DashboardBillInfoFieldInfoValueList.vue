<template>
  <div class="field-info">
    <p class="field-info__key">{{ keyName }}</p>
    <div class="field-info__value-wrapper value-wrapper">
      <ul>
        <li v-for="item in data" :key="item">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    keyName: {
      type: String,
      default: 'key',
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.field-info {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  &__key {
    font-weight: 900;
  }
  &__value-wrapper {
    margin: 8px 0 0 0;
  }
}

ul {
  display: flex;
  flex-wrap: wrap;
  text-align: justify;
}

li {
  &:not(:first-child) {
    &:before {
      content: '、';
    }
  }
}
</style>
