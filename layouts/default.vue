<template>
  <div class="default">
    <nuxt />

    <DumbFooter class="default__footer" />
  </div>
</template>

<script>
export default {
  name: 'Default',
}
</script>

<style lang="scss">
html {
  font-family: Inter, 'Noto Sans CJK TC', sans-serif;
}
.default {
  &__footer {
    max-width: 1096px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
