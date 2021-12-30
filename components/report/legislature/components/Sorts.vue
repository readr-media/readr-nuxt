<template>
  <section class="sorts">
    <h1>排列按照：</h1>
    <button
      v-for="sortName in Object.keys($store.state.data.sorts)"
      :key="sortName"
      :class="[
        'sorts__sort-button',
        'sort-button',
        { 'sort-button--bold': !!getSortOrder(sortName) },
      ]"
      @click="handleSortButtonClick(sortName)"
    >
      <span>{{ sortName }}</span>
      <img
        v-show="!!getSortOrder(sortName)"
        class="sort-button__order-icon"
        :style="{
          transform: `rotate(${
            getSortOrder(sortName) === 'descending' ? '180deg' : '0deg'
          })`,
        }"
        src="~/assets/imgs/report/legislature/arrow-sort.svg"
        alt="sort-order-icon"
      />
    </button>
  </section>
</template>

<script>
export default {
  methods: {
    handleSortButtonClick(orderName) {
      const getNextOrderOf = (orderName) => {
        const order = this.$store.state.data.sorts[orderName]
        switch (order) {
          case 'ascending':
            return 'descending'
          case 'descending':
          default:
            return 'ascending'
        }
      }
      this.$store.commit('data/SORT_DATA', {
        sortBy: orderName,
        orderBy: getNextOrderOf(orderName),
      })
    },
    getSortOrder(orderName) {
      return this.$store.state.data.sorts[orderName]
    },
  },
}
</script>

<style lang="scss" scoped>
.sorts {
  display: flex;
  flex-direction: column;
  &__sort-button {
    margin: 8px 0 0 0;
  }
}

.sort-button {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #1b1b1b;
  &--bold {
    font-weight: 900;
  }

  &__order-icon {
    margin: 0 0 0 6px;
  }
}

h1 {
  font-size: 12px;
  color: #1b1b1b;
  font-weight: 900;
}
</style>
