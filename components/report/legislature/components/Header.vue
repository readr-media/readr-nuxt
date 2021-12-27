<template>
  <div class="header">
    <readr-header
      @readrLogoLinkClick="sendGaClickEvent('back to home')"
      @shareFacebookLinkClick="sendGaClickEvent('share to fb')"
      @shareLineLinkClick="sendGaClickEvent('share to line')"
    />
    <div class="header__anchors">
      <img src="../../../../assets/imgs/report/legislature/arrow.svg" />
      <Anchor title="看立法院專題報導" />
      <Anchor title="看法案資料" :isActive="true" />
    </div>
  </div>
</template>

<script>
import Anchor from './Anchor.vue'
export default {
  components: {
    Anchor,
  },
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  z-index: 200;
  background: #1b1b1b;
  width: 100vw;

  readr-header::v-deep {
    path {
      fill: #fff;
    }

    share-nav {
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

  &__anchors {
    padding: 15px 0 24px 0;
    margin: 0 20px;
    border-bottom: 0.5px solid #ffffff;
    display: flex;
    @include media-breakpoint-up(md) {
      border-bottom: 0;
      position: absolute;
      top: 12px;
      right: 90px;
    }
    img {
      margin-right: 8px;
      display: none;
      @include media-breakpoint-up(md) {
        display: inherit;
      }
    }
  }
}
</style>
