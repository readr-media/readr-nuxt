<template>
  <div class="wrapper">
    <div class="content">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita esse ut
      quia alias incidunt omnis! Dolorem, non est excepturi repellendus eaque
      voluptate iure vel doloribus aperiam ab modi quisquam laboriosam!
    </div>
    <ElectionFooter :updatedAt="updatedAt" />
  </div>
</template>

<script>
import ElectionFooter from '~/components/report/elections-2022mayor/components/election-footer.vue'
export default {
  name: 'ElectionMayor',

  components: {
    ElectionFooter,
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
  background: #dddddd;
  height: 358px;
  @include media-breakpoint-up(md) {
    height: 209px;
  }
  @include media-breakpoint-up(xl) {
    height: 301px;
  }
}

.content {
  /* height: calc(100%-80px); */
}
</style>
