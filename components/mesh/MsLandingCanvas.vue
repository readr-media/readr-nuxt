<template>
  <div ref="wrapper" class="container">
    <div class="container__back">
      <div class="background">
        <div class="background__title">
          <span class="background__title--daily">MY DAILY</span
          ><span class="background__title--date">6/16</span>
        </div>
      </div>
      <section>
        <MsLandingTitle />
      </section>
    </div>
    <div class="draggers">
      <vue-draggable-resizable
        v-for="(item, i) in locationArray"
        :key="i"
        :resizable="false"
        h="auto"
        w="auto"
        :parent="true"
        className="draggers--item"
        :x="locationArray[i][0]"
        :y="locationArray[i][1]"
      >
        <img
          v-if="viewportWidth < 768"
          :src="
            require(`../../assets/imgs/mesh/Mobile_Illustration_${i + 1}.svg`)
          "
        />
        <img
          v-else
          :src="
            require(`../../assets/imgs/mesh/Desktop_Illustration_${i + 1}.svg`)
          "
        />
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
    locationArray() {
      const viewportWidth = this.viewportWidth
      let porperties
      if (viewportWidth < 768) {
        porperties = [
          [(205 / 320) * viewportWidth, 97],
          [(21 / 320) * viewportWidth, 352],
          [(69 / 320) * viewportWidth, 260],
          [(-50 / 320) * viewportWidth, 46],
          [(178 / 320) * viewportWidth, 222],
          [(56 / 320) * viewportWidth, 141],
          [(43 / 320) * viewportWidth, 200],
          [(158 / 320) * viewportWidth, 379],
          [(202 / 320) * viewportWidth, 399],
          [(24 / 320) * viewportWidth, 220],
          [(216 / 320) * viewportWidth, 279],
        ]
      } else if (viewportWidth < 1200) {
        porperties = [
          [(117 / 768) * viewportWidth, 6],
          [(507 / 768) * viewportWidth, 16],
          [(104 / 768) * viewportWidth, 372],
          [(458 / 768) * viewportWidth, 383],
          [(254 / 768) * viewportWidth, 179],
          [(48 / 768) * viewportWidth, 544],
          [(6 / 768) * viewportWidth, 507],
          [(91 / 768) * viewportWidth, 301],
          [(148 / 768) * viewportWidth, 166],
          [(367 / 768) * viewportWidth, 233],
          [(615 / 768) * viewportWidth, 278],
        ]
      } else {
        porperties = [
          [(68 / 1200) * viewportWidth, 65],
          [(758 / 1200) * viewportWidth, 41],
          [(714 / 1200) * viewportWidth, 481],
          [(23 / 1200) * viewportWidth, 556],
          [(878 / 1200) * viewportWidth, 207],
          [(841 / 1200) * viewportWidth, 410],
          [(272 / 1200) * viewportWidth, 579],
          [(306 / 1200) * viewportWidth, 81],
          [(416 / 1200) * viewportWidth, 117],
          [(503 / 1200) * viewportWidth, 620],
          [(1009 / 1200) * viewportWidth, 157],
        ]
      }
      return porperties
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100vw;
  &__back {
    margin: 0 auto;
    @include media-breakpoint-up(xl) {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      justify-content: center;
    }
  }
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
  @include media-breakpoint-up(xl) {
    width: 400px;
    margin-top: 80px;
    margin-bottom: 80px;
    margin-left: 135px;
    margin-right: 0;
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
  &--item::v-deep {
    width: fit-content !important;
    position: absolute;
    top: 0;
    left: 0;
    &:hover {
      cursor: pointer;
      box-shadow: 0px 4px 24px 0px #007aff4d;
    }
  }
}
</style>
