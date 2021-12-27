<template>
  <readr-header
    @readrLogoLinkClick="sendGaClickEvent('back to home')"
    @shareFacebookLinkClick="sendGaClickEvent('share to fb')"
    @shareLineLinkClick="sendGaClickEvent('share to line')"
  />
</template>

<style lang="scss" scoped>
readr-header::v-deep {
  background: #1b1b1b;
  position: fixed;
  top: 0;
  path {
    fill: #fff;
  }

  share-nav {
    position: fixed;
    right: 14px;
    @include media-breakpoint-up(md) {
      right: 20px;
    }

    a {
      circle {
        fill: #fff;
      }
      path {
        fill: #33aba4;
      }
    }
  }
}
</style>
