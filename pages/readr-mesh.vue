<template>
  <div class="mesh">
    <MsHeader />
    <MsLandingTitle />
    <div class="mesh__discord">
      <div class="mesh__discord--left">
        <LargeArrowSvg /><span>Discord</span>
      </div>
      <img src="../assets/imgs/mesh/discord-qr-code.png" />
    </div>
  </div>
</template>

<script>
import { ENV } from '~/configs/config'
import LargeArrowSvg from '~/assets/imgs/mesh/arrow-large.svg?inline'
import MsHeader from '~/components/mesh/MsHeader'
import MsLandingTitle from '~/components/mesh/MsLandingTitle.vue'
export default {
  name: 'ReadrMesh',
  components: {
    LargeArrowSvg,
    MsHeader,
    MsLandingTitle,
  },
  mounted() {
    if (ENV === 'prod' || ENV === 'staging') {
      this.$nuxt.error({ statusCode: 404 })
    }
  },
}
</script>

<style lang="scss">
.mesh {
  &__discord {
    width: 100%;
    background: #04295e;
    box-shadow: inset 0px -1px 0px #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      max-width: 76px;
      @include media-breakpoint-up(md) {
        max-width: 192px;
      }
    }

    &--left {
      padding: 8px 0;
      font-weight: 400;
      font-size: 20px;
      line-height: 130%;
      letter-spacing: 0.01em;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      @include media-breakpoint-up(md) {
        font-size: 44px;
        line-height: 64px;
      }
      span {
        padding-bottom: 4px;
        box-shadow: inset 0px -1px 0px #ffffff;
        &:hover {
          cursor: pointer;
          color: #ebf02c;
          box-shadow: inset 0px -1px 0px #ebf02c;
        }
      }
      svg {
        width: 28px;
        margin-right: 10px;
        @include media-breakpoint-up(md) {
          width: 51px;
        }
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
