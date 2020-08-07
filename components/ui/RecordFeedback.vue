<template>
  <div class="record-feedback">
    <div v-if="shouldOpenFeedback" class="feedback">
      <div class="question">
        方便跟我們分享，<br />你選擇關閉這則提示的原因嗎？
      </div>
      <div class="answer">
        <label v-for="option in options" :key="option">
          <input v-model="feedback" type="radio" :value="option" />
          <div class="mark">
            <SvgCheckIcon />
          </div>
          {{ option }}
        </label>
      </div>
      <UiButtonPrimary
        text="傳送給 READr"
        subtype="feedback"
        class="record-feedback__btn"
        :disabled="!hadFeedback"
        @click.native="handleBtnFeedbackClick"
      />
    </div>

    <UiFeedbackThanks v-else />
  </div>
</template>

<script>
import { ref, computed } from 'nuxt-composition-api'

import SvgCheckIcon from '~/assets/check-icon.svg?inline'

export default {
  name: 'RecordFeedback',
  components: {
    SvgCheckIcon,
  },
  props: {
    options: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  setup(props, { emit }) {
    const feedback = ref('')
    const shouldOpenFeedback = ref(true)
    const hadFeedback = computed(() => feedback.value.length)

    function handleBtnFeedbackClick() {
      emit('userGiveFeedback', feedback.value)
      closeFeedback()
    }

    function closeFeedback() {
      shouldOpenFeedback.value = false
    }

    return {
      shouldOpenFeedback,
      feedback,
      hadFeedback,
      handleBtnFeedbackClick,
    }
  },
}
</script>

<style lang="scss" scoped>
.record-feedback {
  background-color: rgba(#f5ebff, 0.2);
  border-radius: 2px;
  font-size: 15px;
  letter-spacing: 0.6px;
  line-height: 1.5;
  @include media-breakpoint-up(md) {
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 2.5px;
    line-height: 1.8;
  }
  &__btn {
    width: 100%;
    max-width: 240px;
  }
}
.feedback {
  padding: 30px;
  @include media-breakpoint-up(md) {
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 22px;
  }
}
.question {
  margin-bottom: 16px;
  @include media-breakpoint-up(md) {
    margin-bottom: 22px;
    br {
      display: none;
    }
  }
}
.answer {
  margin-bottom: 20px;
  line-height: 1.2;
  @include media-breakpoint-up(md) {
    line-height: 1;
    margin-bottom: 22px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 350px;
    margin-left: auto;
    margin-right: auto;
  }
}
label {
  width: fit-content;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  @include media-breakpoint-up(md) {
    margin-right: 0;
    margin-left: 0;
    &:nth-child(n + 3) {
      margin-top: 10px;
    }
    // &:nth-child(odd) {
    //   justify-content: flex-start;
    // }
    // &:nth-child(even) {
    //   justify-content: flex-end;
    // }
  }
  + label {
    margin-top: 10px;
    @include media-breakpoint-up(md) {
      margin-top: 0;
    }
  }
}
input {
  display: none;
  &:checked ~ .mark {
    background-color: #f5ebff;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      display: block;
    }
  }
}
.mark {
  background-color: rgba(#f5ebff, 0.5);
  border: 2px solid #f5ebff;
  border-radius: 1px;
  width: 18px;
  height: 18px;
  margin-right: 13px;
  transition: background-color 0.3s;
  svg {
    display: none;
  }
}
</style>
