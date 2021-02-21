<template>
  <div class="report"></div>
</template>

<script>
export default {
  name: 'ReadrReport',

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
