<template>
  <div>
    <TagBillCategory
      v-for="category in categories"
      :key="category.text"
      class="category"
      :iconColor="category.color"
      :text="category.text"
      :textColor="category.color"
    />
  </div>
</template>

<script>
import TagBillCategory from './TagBillCategory.vue'
export default {
  components: { TagBillCategory },
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
