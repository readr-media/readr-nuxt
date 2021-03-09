<template>
  <readr-header
    @readrLogoLinkClick="sendGaClickEvt('back to home')"
    @shareFacebookLinkClick="sendGaClickEvt('share to fb')"
    @shareLineLinkClick="sendGaClickEvt('share to line')"
  />
</template>

<script>
export default {
  name: 'RdReportHeader',

  methods: {
    sendGaClickEvt(label) {
      this.$ga.event('projects', 'click', label)
    },
  },
}
</script>
