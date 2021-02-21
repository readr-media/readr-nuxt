<template>
  <div class="report"></div>
</template>

<script>
export default {
  name: 'RdReport',

  props: {
    report: {
      type: Object,
      require: true,
      default: () => ({}),
    },
  },
}
</script>

<style lang="sass" scoped></style>
