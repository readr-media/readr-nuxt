<template>
  <section class="editor-choice">
    <div class="editor-choice__feature">
      <RdEditorChoiceFeaturedCard
        :href="featuredPost.href"
        :img="featuredPost.img.src"
        :title="featuredPost.title"
        :date="featuredPost.date"
        :readTimeText="featuredPost.readTime"
        :isReport="featuredPost.isReport"
      />
    </div>
    <ul>
      <li v-for="item in postItems" :key="item.id">
        <RdEditorChoiceCard
          :href="item.href"
          :img="item.img.src"
          :title="item.title"
          :date="item.date"
          :readTimeText="item.readTime"
          :isReport="item.isReport"
        />
      </li>
    </ul>
  </section>
</template>

<script>
import RdEditorChoiceFeaturedCard from '~/components/shared/RdEditorChoiceFeaturedCard.vue'
import RdEditorChoiceCard from '~/components/shared/RdEditorChoiceCard.vue'

export default {
  name: 'RdEditorChoice',

  components: {
    RdEditorChoiceFeaturedCard,
    RdEditorChoiceCard,
  },
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    featuredPost() {
      return this.posts?.[0] ?? {}
    },
    postItems() {
      return this.posts?.slice(1, 3) ?? []
    },
  },
  mounted() {
    console.log('rr', this.postItems)
  },
}
</script>

<style lang="scss" scoped>
.editor-choice {
  width: 100%;
  @include media-breakpoint-up(xl) {
    display: flex;
  }
  &__feature {
    width: 100%;
    background-color: #ebf02c;
    padding: 0 0 24px;
    @include media-breakpoint-up(md) {
      padding: 40px 48px;
    }
    @include media-breakpoint-up(xl) {
      min-width: calc((100% - 1096px) / 2 + 720px + 40px);
      max-width: calc((100% - 1096px) / 2 + 720px + 40px);
      padding: 40px 40px 40px 0;
    }
  }
  ul {
    padding: 24px 20px;
    background-color: #f6f6fb;
    @include media-breakpoint-up(md) {
      display: flex;
      justify-content: space-between;
      padding: 40px 48px;
    }
    @include media-breakpoint-up(xl) {
      display: block;
      min-width: calc((100% - 1096px) / 2 + 296px + 40px);
      max-width: calc((100% - 1096px) / 2 + 296px + 40px);
      padding: 40px 0 40px 40px;
    }
    li {
      width: 100%;
      @include media-breakpoint-up(md) {
        width: calc((100% - 24px) / 2);
      }
      @include media-breakpoint-up(xl) {
        width: 100%;
      }
    }
    li + li {
      margin: 40px 0 0;
      @include media-breakpoint-up(md) {
        margin: 0;
      }
      @include media-breakpoint-up(xl) {
        margin: 40px 0 0;
      }
    }
  }
}
</style>
