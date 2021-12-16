<template>
  <section class="flex flex-col">
    <h1>排列按照：</h1>
    <button class="flex" @click="handleSortButtonClick('類別')">
      類別 {{ getOrderIcon('類別') }}
    </button>
    <button class="flex" @click="handleSortButtonClick('屆期')">
      屆期 {{ getOrderIcon('屆期') }}
    </button>
    <button class="flex" @click="handleSortButtonClick('提案總次數')">
      提案總次數 {{ getOrderIcon('提案總次數') }}
    </button>
    <button class="flex" @click="handleSortButtonClick('排審總次數')">
      排審總次數 {{ getOrderIcon('排審總次數') }}
    </button>
    <button class="flex" @click="handleSortButtonClick('停留屆期')">
      停留屆期 {{ getOrderIcon('停留屆期') }}
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
    getOrderIcon(orderName) {
      const order = this.$store.state.data.sorts[orderName]
      switch (order) {
        case 'ascending':
          return '⬆️'
        case 'descending':
          return '⬇️'
        default:
          return ''
      }
    },
  },
}
</script>

<style scoped>
.flex {
  display: flex;
}
.flex-col {
  flex-direction: column;
}

h1 {
  font-size: 22px;
}
</style>
