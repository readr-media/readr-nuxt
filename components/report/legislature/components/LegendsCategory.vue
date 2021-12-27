<template>
  <ul>
    <li
      v-for="[categoryName, categoryValue] in Object.entries(billCategories)"
      :key="categoryName"
    >
      <div class="bill-category">
        <span
          class="bill-category__icon icon"
          :style="{ backgroundColor: categoryValue.color }"
        />
        <span class="bill-category__text text">
          {{ categoryName }}
        </span>
      </div>
    </li>
  </ul>
</template>

<script>
import billCategories from '../constants/billCategories.json'

export default {
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

.bill-category {
  display: flex;
  align-items: center;
  &__text {
    margin: 0 0 0 4px;
  }
}
.icon {
  display: inline-block;
  width: 12px;
  height: 12px;
}
.text {
  color: white;
  font-size: 14px;
  font-weight: 300;
}
</style>
