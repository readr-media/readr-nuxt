<template>
  <button class="anchor" :class="{ active: isActive }">{{ title }}</button>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
      require: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.anchor {
  padding: 4px 8px;
  font-weight: 900;
  font-size: 16px;
  line-height: 23px;
  color: #ffffff;
  background: #33aba4;

  & + & {
    margin-left: 8px;
  }
}

.active {
  background: #979797;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
