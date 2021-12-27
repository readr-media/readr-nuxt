<template>
  <div class="bill-info-category">
    <TagBillCategory
      v-for="category in categories"
      :key="category.text"
      class="bill-info-category__item category"
      :iconColor="category.color"
      :text="category.text"
      :textColor="category.color"
    />
    <TagPreset
      v-for="tag in tags"
      :key="tag.text"
      class="bill-info-category__item"
      :emoji="tag.emoji"
      :text="tag.text"
    />
  </div>
</template>

<script>
import TagBillCategory from './TagBillCategory.vue'
import TagPreset from './TagPreset.vue'
export default {
  components: {
    TagPreset,
    TagBillCategory,
  },
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    tags: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.bill-info-category {
  display: flex;
  flex-wrap: wrap;
  margin: -5px -4px;
  &__item {
    margin: 5px 4px;
  }
}

.category {
  ::v-deep .icon {
    width: 20px !important;
    height: 20px !important;
  }
  ::v-deep .text {
    font-weight: normal !important;
  }
}
</style>
