<template>
  <div v-click-outside="handleCloseOptions" class="select-wrapper">
    <button class="select-wrapper__button button" @click="handleButtonClick">
      排序：{{ activeSortName }}
    </button>
    <div
      v-show="isOptionsToggled"
      class="select-wrapper__options-wrapper options-wrapper"
    >
      <ButtonsSort />
    </div>
  </div>
</template>

<script>
import ButtonsSort from './ButtonsSort.vue'

export default {
  components: {
    ButtonsSort,
  },
  data() {
    return {
      isOptionsToggled: false,
    }
  },
  computed: {
    activeSortName() {
      return Object.entries(this.$store.state.data.sorts).find(
        function getTruthySortValue([sortName, sortValue]) {
          return !!sortValue
        }
      )?.[0]
    },
  },
  methods: {
    handleButtonClick() {
      this.isOptionsToggled = !this.isOptionsToggled
    },
    handleCloseOptions() {
      this.isOptionsToggled = false
    },
  },
}
</script>

<style lang="scss" scoped>
.select-wrapper {
  position: relative;
  width: 131px;
  &__options-wrapper {
    position: absolute;
    top: 28px;
    left: 0px;
  }
}

.button {
  padding: 3px 6px;
  font-size: 12px;
  font-weight: 900;
  background-color: #c9c9c9;
  color: #1b1b1b;
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
}

.options-wrapper {
  width: 100%;
  padding: 0 6px 8px 6px;
  display: flex;
  flex-direction: column;
  background-color: #c9c9c9;
  color: #1b1b1b;
  z-index: 9999;
}

.option {
  text-align: left;
  padding: 0px 0;
  font-size: 12px;
  font-weight: 900;
  &:hover {
    color: #cb3838;
  }
}
</style>
