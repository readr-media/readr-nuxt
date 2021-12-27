<template>
  <div class="bill-category">
    <span
      class="bill-category__icon icon"
      :style="{ backgroundColor: iconColor }"
    />
    <span class="bill-category__text text" :style="{ color: textColor }">
      {{ text }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    iconColor: {
      type: String,
      default: 'white',
    },
    text: {
      type: String,
      default: 'text',
    },
    textColor: {
      type: String,
      default: 'white',
    },
  },
}
</script>

<style lang="scss" scoped>
.bill-category {
  display: flex;
  align-items: center;
  &__text {
    margin: 0 0 0 4px;
  }
}
.icon {
  display: inline-block;
  width: 12px;
  height: 12px;
}
.text {
  font-size: 14px;
  font-weight: 300;
}
</style>
