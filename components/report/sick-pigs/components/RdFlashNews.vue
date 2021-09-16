<template>
  <div class="flash-news">
    <h1 class="flash-news__title">最新重點消息</h1>
    <div class="flash-news__container">
      <RdFlashNewsCard
        v-for="index in showedFlashNewsCount"
        :key="index - 1"
        :flashNews="sortedFlashNews[index - 1]"
      />
    </div>

    <RdUiReadmoreButton
      v-if="showReadMore"
      title="展開所有快訊"
      @click.native="expandHandler"
    />
  </div>
</template>

<script>
import RdFlashNewsCard from './RdFlashNewsCard.vue'
import RdUiReadmoreButton from './RdUiReadmoreButton.vue'

export default {
  components: { RdFlashNewsCard, RdUiReadmoreButton },
  props: {
    flashNewsList: {
      type: Array,
      isRequired: true,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      flashCount: 3,
    }
  },

  computed: {
    sortedFlashNews() {
      // console.log(this.flashNewsList)
      return this.flashNewsList
    },

    showReadMore() {
      return this.flashCount < this.sortedFlashNews.length
    },

    showedFlashNewsCount() {
      return this.flashCount > this.sortedFlashNews.length
        ? this.sortedFlashNews.length
        : this.flashCount
    },
  },

  methods: {
    expandHandler() {
      console.log(12333)
      const newFlashCount =
        this.flashCount + 3 > this.sortedFlashNews.length
          ? this.sortedFlashNews.length
          : this.flashCount + 3

      this.flashCount = newFlashCount
      // this.gaClickHandler('看更多消息')
    },
  },
}
</script>

<style lang="scss" scoped>
.flash-news {
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 48px;
  @include media-breakpoint-up(md) {
    padding: 48px 0;
  }

  &__title {
    margin: 0 0 24px 0;
    font-size: 44px;
    line-height: 150%;
    color: #bf6d28;
    @include media-breakpoint-up(md) {
      margin: 0 0 32px 0;
      font-size: 48px;
      line-height: 70px;
    }
  }

  &__container {
    max-width: 640px;
    margin: auto;
  }
}
</style>
