<template>
  <div class="flash-news-card">
    <h4 class="flash-news-card__title">{{ title }}</h4>

    <div class="flash-news-card__info">
      <div class="flash-news-card__info_left">
        <div class="flash-news-card__publish_time Body2">{{ updateTime }}</div>
        <div class="flash-news-card__journalist Body2">
          記者/{{ journalist }}
        </div>
      </div>

      <div class="flash-news-card__tag">{{ tag }}</div>
    </div>

    <RdHtmlContent :content="content" />
  </div>
</template>

<script>
import RdHtmlContent from './RdHtmlContent.vue'

export default {
  components: { RdHtmlContent },
  props: {
    flashNews: {
      type: Object,
      isRequired: true,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return { isExpanded: false }
  },
  computed: {
    title() {
      return this.flashNews.title
    },
    updateTime() {
      return this.flashNews.update_time
    },
    journalist() {
      return this.flashNews.journalist
    },
    tag() {
      switch (this.flashNews.tag) {
        case '疫情':
          return '疫情'

        case '電':
          return '電力'

        case '水':
          return '水情'

        default:
          return ''
      }
    },
    content() {
      const content = this.flashNews?.content?.split('<br>')
      return content
    },
  },
}
</script>

<style lang="scss" scoped>
.flash-news-card {
  padding: 24px 16px;
  background: #fff;
  box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.1),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  color: #bf6d28;

  // tablet range
  @include media-breakpoint-up(md) {
    padding: 32px;
  }

  &__title {
    margin-bottom: 12px;
    text-align: left;
    font-weight: bold;
    font-size: 20px;
    line-height: 180%;
    @include media-breakpoint-up(md) {
      font-size: 24px;
    }
  }

  &__info {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  &__publish_time {
    opacity: 0.3;
    margin-bottom: 4px;
    font-size: 16px;
    line-height: 19px;
    opacity: 0.3;
  }

  &__journalist {
    opacity: 0.66;
    font-size: 16px;
    line-height: 23px;
  }

  &__tag {
    background: #fff;
    opacity: 0.3;
    border: 1px solid #bf6d28;
    box-sizing: border-box;
    border-radius: 2px;
    font-size: 18px;
    line-height: 26px;
    padding: 4px 12px;
  }
}
</style>
