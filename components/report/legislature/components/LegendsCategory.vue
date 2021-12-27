<template>
  <ul>
    <li
      v-for="[categoryName, categoryValue] in Object.entries(billCategories)"
      :key="categoryName"
    >
      <TagBillCategory :iconColor="categoryValue.color" :text="categoryName" />
    </li>
  </ul>
</template>

<script>
import billCategories from '../constants/billCategories.json'
import TagBillCategory from './TagBillCategory.vue'

export default {
  components: { TagBillCategory },
  data() {
    return {
      billCategories,
    }
  },
}
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  margin: -3px -2px;
}

li {
  margin: 3px 2px;
}
</style>
