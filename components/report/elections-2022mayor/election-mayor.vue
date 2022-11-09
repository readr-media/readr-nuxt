<template>
  <div class="wrapper">
    <CarouselPc :polling="polling" />
    <ElectionFooter :updatedAt="updatedAt" />
  </div>
</template>

<script>
import ElectionFooter from './components/election-footer.vue'
import CarouselPc from './components/carousel-pc.vue'

export default {
  name: 'ElectionMayor',

  components: {
    ElectionFooter,
    CarouselPc,
  },

  props: {
    polling: {
      type: Array,
      default: () => {
        return []
      },
    },
    updatedAt: {
      type: String,
      default: () => {
        return ''
      },
    },
  },

  data() {
    return {
      name: 'bibo',
    }
  },
  mounted() {
    console.log(this.polling, 'election')
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #dddddd;
  height: 358px;
  @include media-breakpoint-up(md) {
    height: 209px;
  }
  @include media-breakpoint-up(xl) {
    height: 301px;
  }
}
</style>
