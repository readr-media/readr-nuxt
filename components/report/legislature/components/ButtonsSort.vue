<template>
  <section class="sorts">
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
      <img
        v-show="isLoading[sortName]"
        class="loading"
        src="~/assets/imgs/report/legislature/loading.gif"
        alt="reset-loading-icon"
      />
    </button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isLoading: {
        類別: false,
        屆期: false,
        提案總次數: false,
        排審總次數: false,
        停留屆期: false,
      },
    }
  },
  methods: {
    handleSortButtonClick(orderName) {
      this.isLoading[orderName] = true
      setTimeout(() => {
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

        this.isLoading[orderName] = false
      }, 100)
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

.loading {
  height: 16px;
}
</style>
