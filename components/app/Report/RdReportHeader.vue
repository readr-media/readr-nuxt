<template>
  <readr-header
    @readrLogoLinkClick="sendGaClickEvent('back to home')"
    @shareFacebookLinkClick="sendGaClickEvent('share to fb')"
    @shareLineLinkClick="sendGaClickEvent('share to line')"
  />
</template>

<script>
export default {
  name: 'RdReportHeader',

  methods: {
    sendGaClickEvent(label) {
      this.$ga.event('projects', 'click', label)
    },
  },
}
</script>
