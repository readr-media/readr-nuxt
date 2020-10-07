<template>
  <readr-header @readrLogoLinkClick="$emit('sendGaEvt')" />
</template>

<script>
export default {
  name: 'Header',
}
</script>
