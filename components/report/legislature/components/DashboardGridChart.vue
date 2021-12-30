<template>
  <section class="dashboard-wrapper">
    <Lightbox
      v-show="isTooltipVisible"
      class="dashboard-wrapper__lightbox"
      @close="$emit('closeLightbox')"
    >
      <DashboardBillInfo :tooltip="tooltip" />
    </Lightbox>
    <main :style="{ gridTemplateColumns: gridTemplateColumns }">
      <ol
        v-for="(chunk, index) in dataChunk"
        :key="index"
        style="display: flex; flex-direction: column;"
      >
        <GridItem
          v-for="bill in chunk"
          :key="bill.id"
          :data-bill-name="bill['名稱']"
          :backgroundImage="getBillBackgroundImage(bill)"
          :verticalLength="Number(bill['停留屆期'])"
          :hasStarMarkIcon="bill['重點法案標注'] === 'yes'"
          @click.native="handleMouseClick(bill)"
          @mouseover.native="handleMouseoverGridItem($event, bill)"
          @mousemove.native="handleMousemoveGridItem"
          @mouseout.native="handleMouseoutGridItem"
        />
      </ol>
      <div
        v-show="isGridItemTooltipShow"
        class="tooltip"
        :style="gridItemTooltipPosition"
      >
        {{ gridItemTooltipText }}
      </div>
    </main>
    <aside class="dashboard-wrapper__aside aside">
      <DashboardBillInfo
        v-show="isTooltipVisible"
        class="aside__bill-info"
        :tooltip="tooltip"
      />
    </aside>
  </section>
</template>

<script>
import chunk from 'lodash/chunk'
import debounce from 'lodash/debounce'
import billCategories from '../constants/billCategories.json'

import Lightbox from './Lightbox.vue'
import GridItem from './GridItem.vue'
import DashboardBillInfo from './DashboardBillInfo.vue'

export default {
  components: {
    Lightbox,
    DashboardBillInfo,
    GridItem,
  },
  props: {
    tooltip: {
      type: Object,
      default: () => {},
    },
    isTooltipVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // tooltip: {},
      // isTooltipVisible: false,
      windowWidth: 0,

      isGridItemTooltipShow: false,
      gridItemTooltipPosition: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      gridItemTooltipText: '',
    }
  },
  computed: {
    columnsNumber() {
      if (this.$store.state.viewport.width < 1200) {
        return 10
      } else {
        const asideWidth = 326
        const asideMargin = 32
        const containerWidth =
          this.$store.state.viewport.width - asideWidth - asideMargin
        return Math.floor(containerWidth / 16)
      }
    },
    dataChunk() {
      const data = this.$store.state.data.data
      const size = Math.ceil(data.length / this.columnsNumber)
      return chunk(this.$store.state.data.data, size)
    },
    gridTemplateColumns() {
      return `repeat(${this.columnsNumber}, minmax(0, 1fr))`
    },
  },
  async beforeMount() {
    await this.$store.dispatch('data/FETCH_DATA')
  },
  mounted() {
    this.windowWidth = window.innerWidth
    window.addEventListener(
      'resize',
      debounce(() => {
        this.windowWidth = window.innerWidth
      }, 1000)
    )
  },
  methods: {
    getFirstCategory(bill) {
      return bill['類別'].split('、')[0]
    },
    handleMouseClick(bill) {
      this.$emit('clickGridItem', bill)
    },
    getBillBackgroundImage(bill) {
      function getEnabledColorOption(option) {
        const optionValue = option[1]
        return optionValue === true
      }
      const colorBy = Object.entries(this.$store.state.data.colors).filter(
        getEnabledColorOption
      )?.[0]?.[0]

      switch (colorBy) {
        case '類別': {
          const categories = bill['類別'].split('、')
          const categoriesLength = categories.length
          if (!categoriesLength) {
            return 'linear-gradient(to right, white 0%, white 100%)'
          }

          const categoriesGradient = categories.map(
            function getGradientByCategories(category, index) {
              const colorCategory = billCategories[category]?.color ?? 'white'
              const scaleBegin = (100 / categoriesLength) * index
              const scaleEnd = (100 / categoriesLength) * (index + 1)
              return `${colorCategory} ${scaleBegin}%, ${colorCategory} ${scaleEnd}%`
            }
          )
          return `linear-gradient(to right, ${categoriesGradient.join(',')})`
        }

        default: {
          return `linear-gradient(to right, ${this.$store.getters[
            'data/colorScale'
          ](+bill[colorBy])} 0%, ${this.$store.getters['data/colorScale'](
            +bill[colorBy]
          )} 100%)`
        }
      }
    },

    handleMouseoverGridItem(e, bill) {
      this.isGridItemTooltipShow = true
      const shouldFlipTooltip = e.clientX > window.innerWidth / 2
      this.gridItemTooltipPosition = shouldFlipTooltip
        ? {
            top: `${e.clientY + 10}px`,
            right: `${window.innerWidth - e.clientX - 10}px`,
          }
        : {
            top: `${e.clientY + 10}px`,
            left: `${e.clientX + 10}px`,
          }
      this.gridItemTooltipText = bill['名稱']
    },
    handleMousemoveGridItem(e) {
      const shouldFlipTooltip = e.clientX > window.innerWidth / 2
      this.gridItemTooltipPosition = shouldFlipTooltip
        ? {
            top: `${e.clientY + 10}px`,
            right: `${window.innerWidth - e.clientX - 10}px`,
          }
        : {
            top: `${e.clientY + 10}px`,
            left: `${e.clientX + 10}px`,
          }
    },
    handleMouseoutGridItem() {
      this.isGridItemTooltipShow = false
    },
  },
}
</script>

<style lang="scss" scoped>
.dashboard-wrapper {
  @include media-breakpoint-up(xl) {
    display: flex;
    justify-content: space-between;
  }
  &__lightbox {
    @include media-breakpoint-up(xl) {
      display: none !important;
    }
  }
  &__aside {
    display: none;
    @include media-breakpoint-up(xl) {
      display: block;
      margin: 0 0 0 32px;
    }
  }
}

main {
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  @include media-breakpoint-up(xl) {
    grid-template-columns: repeat(100, minmax(0, 1fr));
  }
}

.tooltip {
  position: fixed;
  background-color: white;
  padding: 3px 6px;
  font-size: 14px;
  font-weight: 500;
  color: #985f0b;
  visibility: hidden;
  @include media-breakpoint-up(xl) {
    visibility: visible;
  }
}

.aside {
  width: 326px;
  position: relative;
  &__bill-info {
    background-color: white;
    position: sticky;
    top: 90px;
    max-height: calc(100vh - 80px);
    overflow-y: scroll;
  }
}
</style>
