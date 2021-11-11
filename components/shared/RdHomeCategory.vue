<template>
  <section class="home-category">
    <RdListHeading
      title="最新報導"
      :readMoreText="categoryReadMoreText"
      :categorySlug="currentCategory.slug"
      :categoryName="currentCategory.name"
      color="#ebf02c"
      class="home-category__heading"
    />
    <RdCategoryNav
      :categories="categoryList"
      :currentCategorySlug="currentCategory.slug"
      class="home-category__nav"
      @item-clicked="refetchList"
    />
    <div class="home-category__list">
      <RdHomeCategoryList
        v-if="currentPosts.length"
        :posts="currentPosts"
        :shouldSetLgBreakPoint="true"
        class="home-category__list-posts"
      />
      <RdHomeCategoryReportCard
        v-if="currentReport"
        :href="currentReport.href"
        :img="currentReport.img.src"
        :title="currentReport.title"
        :date="currentReport.date"
        :readTimeText="currentReport.readTime"
        :isReport="currentReport.isReport"
        class="home-category__list-report"
      />
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import RdListHeading from '~/components/shared/RdListHeading.vue'
import RdCategoryNav from '~/components/shared/RdCategoryNav.vue'
import RdHomeCategoryList from '~/components/shared/RdHomeCategoryList.vue'
import RdHomeCategoryReportCard from '~/components/shared/RdHomeCategoryReportCard.vue'

export default {
  name: 'RdHomeCategory',

  components: {
    RdListHeading,
    RdCategoryNav,
    RdHomeCategoryList,
    RdHomeCategoryReportCard,
  },
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    latest: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      currentCategory: {
        name: '',
        slug: 'all',
      },
    }
  },
  computed: {
    ...mapGetters({
      categoryList: 'category/categoryList',
    }),
    categoryReadMoreText() {
      return `更多${this.currentCategory.name}報導`
    },
    currentItem() {
      if (this.currentCategory.slug === 'all') {
        return this.latest ?? {}
      }
      const matchedItem = this.categories?.find(
        (item) => item.slug === this.currentCategory.slug
      )
      return matchedItem && matchedItem.posts && matchedItem.reports
        ? matchedItem
        : undefined
    },
    currentPosts() {
      return this.currentItem?.posts ?? []
    },
    currentReport() {
      return this.currentItem?.reports?.[0] ?? undefined
    },
  },
  methods: {
    refetchList({ name, slug }) {
      this.currentCategory.name = name && name !== '不分類' ? name : ''
      this.currentCategory.slug = slug ?? ''
    },
  },
}
</script>

<style lang="scss" scoped>
.home-category {
  width: 100%;
  margin: 0 0 48px;
  &__heading {
    margin: 0 0 12px;
  }
  &__nav {
    margin: 0 0 20px;
  }
  &__list {
    display: block;
    @include media-breakpoint-up(xl) {
      display: flex;
      justify-content: space-between;
    }
    &-posts {
      margin: 0;
    }
    &-report {
      @include media-breakpoint-up(xl) {
        min-width: calc((100% - 24px) / 2);
        max-width: calc((100% - 24px) / 2);
        margin-left: 24px;
      }
    }
  }
}
</style>
