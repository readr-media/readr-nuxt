<template>
  <ul v-if="shouldShowCategoryNav">
    <li
      v-for="category in formatedCategories"
      :key="category.slug"
      :class="{ active: category.slug === currentCategorySlug }"
      @click="handleItemClicked(category)"
    >
      {{ category.name }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'RdCategoryNav',

  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    currentCategorySlug: {
      type: String,
      default: 'all',
    },
  },
  computed: {
    formatedCategories() {
      return [{ name: '不分類', slug: 'all' }, ...this.categories]
    },
    shouldShowCategoryNav() {
      return this.categories?.length > 1
    },
  },
  methods: {
    handleItemClicked(item) {
      this.$emit('item-clicked', item)
    },
  },
}
</script>

<style lang="scss" scoped>
ul {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 12px 0 0;
  li {
    font-size: 16px;
    line-height: 1.5;
    color: rgba(0, 9, 40, 0.3);
    cursor: pointer;
    margin: 0 20px 12px 0;
    @include media-breakpoint-up(sm) {
      font-size: 18px;
      margin: 0 24px 12px 0;
    }
    &:last-child {
      margin: 0 0 12px;
    }
    &.active {
      position: relative;
      color: rgba(0, 9, 40, 0.87);
      &:after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 2px;
        background-color: #ebf02c;
      }
    }
  }
}
</style>
