<template>
  <div class="record-box">
    <div v-if="shouldOpenRecord" class="record">
      <img v-lazy="require('~/assets/owl.jpg')" alt="" />
      <slot name="record" />
      <SvgCrossIcon class="cross-icon" @click="handleCancelClick" />
    </div>

    <slot v-else name="feedback" />
  </div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'

import SvgCrossIcon from '~/assets/cross-icon.svg?inline'

export default {
  name: 'RdRecordBox',
  components: {
    SvgCrossIcon,
  },
  setup(props, { emit }) {
    const shouldOpenRecord = ref(true)

    function handleCancelClick() {
      emit('cancel')
      openFeedback()
    }

    function openFeedback() {
      shouldOpenRecord.value = false
    }

    return {
      shouldOpenRecord,
      handleCancelClick,
    }
  },
}
</script>

<style lang="scss" scoped>
.record-box {
  background-color: rgba(#f5ebff, 0.2);
  border-radius: 2px;
  text-align: center;
  position: relative;
}
.record {
  padding: 30px;
  @include media-breakpoint-up(md) {
    padding-left: 50px;
    padding-right: 50px;
  }
}
.cross-icon {
  position: absolute;
  top: 14px;
  right: 13.72px;
  cursor: pointer;
  user-select: none;
}

img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 14px;
}
</style>
