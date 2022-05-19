<template>
  <section class="header">
    <readr-header
      @readrLogoLinkClick="sendGaClickEvent('back to home')"
      @shareFacebookLinkClick="sendGaClickEvent('share to fb')"
      @shareLineLinkClick="sendGaClickEvent('share to line')"
    />
  </section>
</template>

<script>
export default {
  name: 'RdFrameHeader',

  methods: {
    sendGaClickEvent(label) {
      this.$ga.event('projects', 'click', label)
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  z-index: 2;
  background: #f6f6f5;
  width: 100vw;

  readr-header::v-deep {
    path {
      fill: #000928;
    }

    share-nav {
      a {
        circle {
          fill: #f6f6f5;
        }
        path {
          fill: #000928;
        }
      }
    }
  }

  &__anchors {
    &_mobile {
      border-bottom: 0.5px solid #ffffff;
      padding: 15px 0 24px 0;
      margin: 0 20px;
      font-weight: 900;
      font-size: 14px;
      line-height: 32px;
      color: #33aba4;
      @include media-breakpoint-up(lg) {
        display: none;
      }
      a + a {
        margin-left: 3px;
      }

      a {
        text-decoration: underline;
        &:before {
          content: '';
          display: inline-block;
          transform: translate(0, -4px);
          margin: 0 5px;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #33aba4;
        }
      }

      .active {
        color: #c9c9c9;
        &:before {
          background: #c9c9c9;
        }
      }

      #story,
      #dashboard {
        font-weight: 900;
        font-size: 14px;
        line-height: 20px;
        color: #1b1b1b;
        padding: 1px 12px;
        background: #d9a87b;
        border: 1px solid #d9a87b;
        text-decoration: none !important;
        &:before {
          content: none;
        }
        &.active {
          color: #d9a87b;
          background: #1b1b1b;
        }
      }

      #dashboard {
        background: #33aba4;
        border: 1px solid #33aba4;
        &.active {
          color: #33aba4;
        }
      }
    }
    &_desktop {
      display: none;
      padding: 15px 0 24px 0;
      margin: 0 20px;
      flex-flow: wrap;
      gap: 8px;
      position: absolute;
      top: 12px;
      right: 90px;
      margin-left: 90px;
      @include media-breakpoint-up(lg) {
        display: flex;
      }
      img {
        margin-right: 8px;
        display: none;
        @include media-breakpoint-up(lg) {
          display: inherit;
        }
      }
    }
  }
}
</style>
