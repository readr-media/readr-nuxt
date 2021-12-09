<template>
  <div v-if="isDev" class="referendum-wrapper">
    <iframe src="https://dev.readr.tw/referendum" />
  </div>
</template>

<script>
import { ENV } from '~/configs/config'
export default {
  computed: {
    isDev() {
      return ENV === 'local' || ENV === 'dev'
    },
  },
}
</script>

<style lang="scss" scoped>
.referendum-wrapper {
  width: 100%;
  padding: 10px;
  iframe {
    height: 446px;
    width: 100%;
    @include media-breakpoint-up(md) {
      height: 245px;
    }
  }
}
</style>
