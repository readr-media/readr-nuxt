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
            <CheckIcon />
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

    <div v-else class="thanks">
      感謝你的回饋，<br />READr 會繼續努力提供更好的內容給你
    </div>
  </div>
</template>

<script>
import { ref, computed, useContext } from 'nuxt-composition-api'
import { post as axiosPost } from 'axios'

import CheckIcon from '~/assets/check-icon.svg?inline'

export default {
  name: 'RecordFeedback',
  components: {
    CheckIcon,
  },
  props: {
    options: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  setup() {
    const feedback = ref('')
    const shouldOpenFeedback = ref(true)
    const hadFeedback = computed(() => feedback.value.length)

    const { route } = useContext()

    function handleBtnFeedbackClick() {
      sendFeedbackToGoogleSheet()
      closeFeedback()
    }

    function sendFeedbackToGoogleSheet() {
      axiosPost('/google-sheets/append', {
        spreadsheetId: '1YokH0yMyuc8D50XSBkN5jMTRbSXYll74OWeOs1tMXag',
        range: '閱讀字數回饋!A:C',
        valueInputOption: 'RAW',
        resource: {
          values: [[route.value.params.id, feedback.value, Date.now()]],
        },
      })
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
.feedback,
.thanks {
  padding: 30px;
  @include media-breakpoint-up(md) {
    padding-left: 50px;
    padding-right: 50px;
  }
}
.feedback {
  @include media-breakpoint-up(md) {
    padding-bottom: 22px;
  }
}
.thanks {
  @include media-breakpoint-up(md) {
    padding-top: 48px;
    padding-bottom: 48px;
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
