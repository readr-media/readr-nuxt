<template>
  <button type="button">{{ text }}</button>
</template>

<script>
export default {
  name: 'RdButtonUnderline',

  props: {
    text: {
      type: String,
      required: true,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
$letter-spacing: 2.5px;

button {
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  margin: 0 auto;
  text-align: center;
  letter-spacing: $letter-spacing;
  border-bottom: 1px solid currentColor;
  padding-left: $letter-spacing;
}
</style>
