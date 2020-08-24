<template>
  <div class="collaborator-wall">
    <div class="intro">
      截至 <strong>{{ year }}</strong> 年 <strong>{{ month }}</strong> 月
      <strong>{{ date }}</strong> 日<br />已有
      <strong class="count">{{ count }}</strong>
      人參與協作，看最新 80 位<SvgUnfoldIcon
        class="unfold-icon"
        :class="{ open: shouldOpenNameList }"
        @click="handleUnfold"
      />協作者
    </div>
    <div v-if="shouldOpenNameList" class="name-list">
      {{ names }}
    </div>
  </div>
</template>

<script>
import { ref } from 'nuxt-composition-api'

import SvgUnfoldIcon from '~/assets/unfold-icon.svg?inline'

export default {
  name: 'CollaboratorWall',
  components: {
    SvgUnfoldIcon,
  },
  props: {
    count: {
      type: Number,
      default: 0,
      required: true,
    },
    names: {
      type: String,
      default: '',
    },
    loadNames: {
      type: Function,
      default: undefined,
    },
  },
  setup(props, { emit }) {
    const shouldOpenNameList = ref(false)
    function handleUnfold() {
      shouldOpenNameList.value = !shouldOpenNameList.value

      if (props.loadNames) {
        props.loadNames()
      }

      emit('sendGa', shouldOpenNameList.value)
    }

    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const date = today.getDate()

    return {
      shouldOpenNameList,
      handleUnfold,

      year,
      month,
      date,
    }
  },
}
</script>

<style lang="scss" scoped>
.collaborator-wall {
  color: #000928;
}
.intro {
  font-size: 15px;
  line-height: 1.2;
  text-align: center;
  letter-spacing: 0.025em;
  padding-bottom: 22px;
  border-bottom: 1px solid rgba(#000, 0.1);
  @include media-breakpoint-up(md) {
    padding-bottom: 28px;
    line-height: 1.5;
    br {
      display: none;
    }
  }
}
.name-list {
  font-size: 15px;
  line-height: 1.8;
  padding-top: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(#000, 0.1);
}
strong {
  font-weight: 900;
}
.unfold-icon {
  display: inline-block;
  vertical-align: text-bottom;
  box-sizing: content-box;
  padding-left: 4px;
  // 15 * 0.025 = 0.375
  padding-right: 4.38px;
  cursor: pointer;
  user-select: none;
  transition: transform 0.3s;
  &.open {
    transform: rotate(-180deg);
  }
}
.count {
  font-size: 24px;
  line-height: 1.3;
}
</style>
