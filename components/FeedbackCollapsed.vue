<template>
  <section class="feedback-collapsed">
    <div class="title" @click="toggleContent">
      <p>意見調查</p>
      <SvgCrossIcon class="cross-icon" @click="closeFeedback" />
    </div>

    <div v-show="shouldShowContent" class="content">
      <div ref="contentWrapper" :style="{ height: contentHeight }">
        <template v-if="!shouldThank">
          <p>喜歡 READr 的改版嗎？</p>
          <UiStarRating
            class="feedback-collapsed__star-rating"
            @userGiveRating="setRating"
          />
          <textarea
            v-if="canSubmit"
            v-model="feedback.opinion"
            placeholder="有什麼想和 READr 說的嗎？建議或讚美都可以唷～（選填）"
          />
        </template>
        <p v-else>謝謝您的回饋，<br />READr 會持續優化頁面。</p>
      </div>

      <UiButtonPrimary
        v-if="canSubmit"
        class="feedback-collapsed__btn"
        :text="submitBtnText"
        subtype="feedback"
        @click.native="handleSubmit"
      />
    </div>
  </section>
</template>

<script>
import { ref, reactive, computed, useContext } from '@nuxtjs/composition-api'
import { post as axiosPost } from 'axios'

import SvgCrossIcon from '~/assets/cross-icon.svg?inline'

if (process.browser) {
  // eslint-disable-next-line no-var
  var {
    state: { userUuid },
  } = require('~/composition/store/local-storage.js')
}

export default {
  name: 'FeedbackCollapsed',
  components: {
    SvgCrossIcon,
  },
  setup(props, { emit }) {
    const { route } = useContext()

    function closeFeedback() {
      emit('close')
    }

    const shouldShowContent = ref(true)

    function toggleContent() {
      shouldShowContent.value = !shouldShowContent.value
    }

    const feedback = reactive({
      rating: 0,
      opinion: '',
    })

    const canSubmit = computed(() => feedback.rating > 0)

    function setRating(val) {
      feedback.rating = val
    }

    const shouldThank = ref(false)

    function handleSubmit() {
      sendFeedbackToGoogleSheet()

      setContentHeight()
      thank()
      countdownToClose()
    }

    function sendFeedbackToGoogleSheet() {
      const { rating, opinion } = feedback

      axiosPost('/api/google-sheets/append', {
        spreadsheetId: '1q9t4tpDlEPiiSAb2TU9rn6G2MnKI1QjpYL_07xnUyGA',
        range: '改版回饋!A2:D',
        valueInputOption: 'RAW',
        resource: {
          values: [
            [Date.now(), userUuid.value, route.value.path, rating, opinion],
          ],
        },
      })
    }

    const contentWrapper = ref(undefined)
    const contentHeight = ref('')

    function setContentHeight() {
      contentHeight.value = `${contentWrapper.value.clientHeight}px`
    }

    function thank() {
      shouldThank.value = true
    }

    const secondsBeforeClose = ref(3)
    const submitBtnText = computed(() =>
      !shouldThank.value ? '送出' : `${secondsBeforeClose.value} 秒後關閉`
    )

    function countdownToClose() {
      if (secondsBeforeClose.value === 0) {
        closeFeedback()

        return
      }

      setTimeout(() => {
        secondsBeforeClose.value -= 1

        countdownToClose()
      }, 1000)
    }

    return {
      closeFeedback,

      shouldShowContent,
      toggleContent,

      feedback,
      setRating,
      canSubmit,
      handleSubmit,

      shouldThank,

      contentWrapper,
      contentHeight,

      submitBtnText,
    }
  },
}
</script>

<style lang="scss" scoped>
.feedback-collapsed {
  text-align: center;
  background-color: #fdfbff;
  border-radius: 2px;
  overflow: hidden;

  &__star-rating {
    max-width: 175px;
    margin-left: auto;
    margin-right: auto;
    ::v-deep {
      .star-icon {
        width: 28px;
      }

      .star.selected .star-icon:first-child path {
        fill: #ebf02c;
      }

      .star-icon:last-child.pulse-enter-active path {
        fill: #ebf02c;
      }
    }
  }

  &__btn {
    width: 100%;
    margin-top: 18px;
  }
}

.title {
  background-color: #04295e;
  position: relative;
  letter-spacing: 5px;
  color: #ebf02c;
  font-weight: 900;
  font-size: 18px;
  line-height: 1.5;
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer;
  user-select: none;

  p {
    padding-left: 5px;
  }
}

.cross-icon {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  user-select: none;

  path {
    fill: #ebf02c;
  }
}

.content {
  font-weight: 500;
  font-size: 15px;
  line-height: 1.5;
  letter-spacing: 2.5px;
  color: rgba(#000, 0.87);
  padding: 24px 10px;
  @include media-breakpoint-up(sm) {
    font-size: 18px;
    line-height: 1.8;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }

  p {
    margin-bottom: 16px;
    @include media-breakpoint-up(sm) {
      margin-bottom: 12px;
    }
  }
}

textarea {
  margin-top: 20px;
  background-color: rgba(245, 235, 255, 0.5);
  border-radius: 2px;
  padding: 12px 10px;
  font-size: 15px;
  line-height: 1.5;
  display: block;
  width: 100%;
  min-height: 100px;
  font-weight: 500;
  letter-spacing: 2.5px;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: rgba(#000, 0.66);
  }
}
</style>
