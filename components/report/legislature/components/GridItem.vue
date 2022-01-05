<template>
  <div
    :class="['grid', 'w-full', 'aspect-w-1', `aspect-h-${verticalLength}`]"
    :style="{
      width: '100%',
      aspectRatio: `1 / ${verticalLength}`,
      backgroundImage: backgroundImage,
    }"
    @mouseover="handleMouseoverGridItem"
    @mousemove="handleMousemoveGridItem"
    @mouseout="handleMouseoutGridItem"
  >
    <span class="star">
      {{ hasStarMarkIcon ? '*' : '' }}
    </span>
    <div
      v-show="isGridItemTooltipShow"
      class="tooltip"
      :style="gridItemTooltipPosition"
    >
      {{ billName }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    backgroundImage: {
      type: String,
      default: 'linear-gradient(to right, white 0%, white 100%)',
    },
    verticalLength: {
      type: Number,
      default: 1,
    },
    hasStarMarkIcon: {
      type: Boolean,
      default: false,
    },
    billName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isGridItemTooltipShow: false,
      gridItemTooltipPosition: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    }
  },
  methods: {
    handleMouseoverGridItem(e) {
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
.grid {
  outline: 2px solid #1b1b1b;
  outline-offset: -2px;
  color: black;
  font-size: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  @include media-breakpoint-up(xl) {
    width: 16px !important;
    outline: 2px solid #1b1b1b;
    outline-offset: -1px;
    font-size: 36px;
  }
}

.star {
  position: absolute;
  top: 50%;
  line-height: 0.5;
}

.tooltip {
  position: fixed;
  background-color: white;
  padding: 3px 6px;
  font-size: 14px;
  font-weight: 500;
  color: #985f0b;
  visibility: hidden;
  width: max-content !important;
  z-index: 9999;
  @include media-breakpoint-up(xl) {
    visibility: visible;
  }
}

.aspect-h-1 {
  height: 0;
  padding-top: 100%;
}
.aspect-h-2 {
  height: 0;
  padding-top: 200%;
}
.aspect-h-3 {
  height: 0;
  padding-top: 300%;
}
.aspect-h-4 {
  height: 0;
  padding-top: 400%;
}
</style>
