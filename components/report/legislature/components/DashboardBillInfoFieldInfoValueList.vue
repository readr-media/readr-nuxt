<template>
  <div class="field-info">
    <p class="field-info__key">{{ keyName }}</p>
    <p class="field-info__value-wrapper value-wrapper">
      {{ listText }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    keyName: {
      type: String,
      default: 'key',
    },
    listText: {
      type: String,
      default: '',
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
    text-align: justify;
  }
}
</style>
