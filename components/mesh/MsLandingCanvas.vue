<template>
  <div ref="wrapper" class="container">
    <div class="background">
      <div class="background__title">
        <span class="background__title--daily">MY DAILY</span
        ><span class="background__title--date">6/16</span>
      </div>
    </div>
    <MsLandingTitle />
    <div class="draggers">
      <vue-draggable-resizable
        :resizable="false"
        h="auto"
        w="fit-content"
        :parent="true"
        className="draggers--item"
      >
        <img src="../../assets/imgs/mesh/Mobile_Illustration_1.svg" />
      </vue-draggable-resizable>
      <vue-draggable-resizable
        :resizable="false"
        h="auto"
        w="fit-content"
        :parent="true"
        className="draggers--item"
        :x="100"
        :y="200"
      >
        <img src="../../assets/imgs/mesh/Mobile_Illustration_2.svg" />
      </vue-draggable-resizable>
      <vue-draggable-resizable
        :resizable="false"
        h="auto"
        w="fit-content"
        :parent="true"
        className="draggers--item"
        :x="300"
        :y="400"
      >
        <img src="../../assets/imgs/mesh/Mobile_Illustration_3.svg" />
      </vue-draggable-resizable>
      <vue-draggable-resizable
        :resizable="false"
        h="auto"
        w="fit-content"
        :parent="true"
        className="draggers--item"
        :x="150"
        :y="450"
      >
        <img src="../../assets/imgs/mesh/Mobile_Illustration_4.svg" />
      </vue-draggable-resizable>
      <vue-draggable-resizable
        :resizable="false"
        h="auto"
        w="fit-content"
        :parent="true"
        className="draggers--item"
        :x="100"
        :y="500"
      >
        <img src="../../assets/imgs/mesh/Mobile_Illustration_5.svg" />
      </vue-draggable-resizable>
      <vue-draggable-resizable
        :resizable="false"
        h="auto"
        w="fit-content"
        :parent="true"
        className="draggers--item"
        :x="300"
        :y="100"
      >
        <img src="../../assets/imgs/mesh/Mobile_Illustration_6.svg" />
      </vue-draggable-resizable>
      <vue-draggable-resizable
        :resizable="false"
        h="auto"
        w="fit-content"
        :parent="true"
        className="draggers--item"
        :x="100"
        :y="300"
      >
        <img src="../../assets/imgs/mesh/Mobile_Illustration_7.svg" />
      </vue-draggable-resizable>
      <vue-draggable-resizable
        :resizable="false"
        h="auto"
        w="fit-content"
        :parent="true"
        className="draggers--item"
        :x="300"
        :y="600"
      >
        <img src="../../assets/imgs/mesh/Mobile_Illustration_8.svg" />
      </vue-draggable-resizable>
      <vue-draggable-resizable
        :resizable="false"
        h="auto"
        w="fit-content"
        :parent="true"
        className="draggers--item"
        :x="400"
        :y="200"
      >
        <img src="../../assets/imgs/mesh/Mobile_Illustration_9.svg" />
      </vue-draggable-resizable>
    </div>
  </div>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
import MsLandingTitle from '~/components/mesh/MsLandingTitle.vue'
export default {
  name: 'MsLandingDrager',
  components: { VueDraggableResizable, MsLandingTitle },
  computed: {
    viewportWidth() {
      return this.$store.getters['viewport/viewportWidth']
    },
    isDesktop() {
      return this.viewportWidth > 768
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
}
.background {
  width: calc(100vw - 20px);
  height: calc((100vw - 20px) * 1.5);
  max-width: 400px;
  max-height: 600px;
  margin: 10px auto;
  background: #fff;
  border: 1px solid #000928;
  padding: 24px 20px;
  margin-bottom: 60px;
  @include media-breakpoint-up(md) {
    margin-bottom: 46px;
  }
  &__title {
    padding: 2px 12px;
    border-top: 1px solid #000928;
    border-bottom: 1px solid #000928;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &--daily {
      font-weight: 700;
      font-size: 24px;
      line-height: 36px;
      letter-spacing: 0.1em;
      color: rgba(0, 9, 40, 0.87);
    }
    &--date {
      position: absolute;
      right: 12px;
      top: 7.5px;
      display: flex;
      align-items: center;
      &:before {
        content: '';
        display: block;
        border-radius: 50%;
        width: 6px;
        height: 6px;
        background: #007aff;
        margin: 0 8px;
      }
    }
  }
}

.draggers {
  position: absolute;
  z-index: 20;
  top: 0;
  left: 0;
  width: 100vw;
  height: calc((100vw - 20px) * 1.5 + 48px);
  max-height: 648px;
  &--item {
    width: fit-content !important;
    position: absolute;
    top: 0;
    left: 0;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
