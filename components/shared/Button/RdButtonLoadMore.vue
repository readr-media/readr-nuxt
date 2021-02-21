<template>
  <div class="btn-load-more" @click="loadMore">
    <button type="button">看更多</button>
    <SvgMoreIcon />
  </div>
</template>

<script>
import SvgMoreIcon from '~/assets/more-icon.svg?inline'

export default {
  name: 'RdButtonLoadMore',
  components: {
    SvgMoreIcon,
  },
  props: {
    loadMore: {
      type: Function,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.btn-load-more {
  text-align: center;
  user-select: none;
  cursor: pointer;
}
button {
  color: #000928;
  letter-spacing: 2.5px;
  // to offset letter-spacing at the rightmost
  margin-left: 2.5px;

  font-size: 15px;
  line-height: 1.5;
  font-weight: 700;
  margin-bottom: 8px;
}
svg {
  margin-left: auto;
  margin-right: auto;
}
</style>
