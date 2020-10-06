<template>
  <div class="load-more" @click="$emit('loadMore')">
    <button type="button">看更多</button>
    <SvgMoreIcon />
  </div>
</template>

<script>
import SvgMoreIcon from '~/assets/more-icon.svg?inline'

export default {
  name: 'LoadMore',
  components: {
    SvgMoreIcon,
  },
}
</script>

<style lang="scss" scoped>
.load-more {
  user-select: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
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
</style>
