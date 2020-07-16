<template>
  <button
    type="button"
    class="btn btn-primary"
    :class="{ [`btn-primary--${subtype}`]: subtype }"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'ButtonPrimary',
  props: {
    text: {
      type: String,
      default: '',
      required: true,
    },
    // for details, see: ~/css/buttons.scss
    subtype: {
      type: String,
      default: '',
    },
  },
}
</script>
