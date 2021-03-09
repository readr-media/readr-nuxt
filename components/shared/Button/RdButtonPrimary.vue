<template>
  <button
    type="button"
    class="btn-primary"
    :class="{ [`btn-primary--${subtype}`]: subtype }"
    @click="$emit('sendGaEvent')"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'RdButtonPrimary',
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
