<template>
  <article class="article">
    <div class="wrapper">
      <RdQuizArticleAuthorProfile
        class="article__author-profile"
        :authorId="authorProfileId"
        :authorName="authorProfile.name"
        :thumbnailText="authorProfileThumbnailText"
      />
      <h1 class="article__title title" v-text="title" />
      <p class="article__info info">
        <span v-text="info.category" />
        <span>・</span>
        <span v-text="info.time" />
      </p>
      <div
        class="article__contents contents"
        :class="{ 'contents--dimmed': isInTutorialMode }"
      >
        <p
          v-for="(content, i) in contents"
          :key="i"
          :class="{ highlight: isInTutorialMode && i === 0 }"
        >
          <template v-for="(text, j) in content.texts">
            <RdQuizArticleAnswerText
              v-if="isTextTypeAnswer(text)"
              :key="text.value"
              class="contents__answer-text"
              :text="text.value"
              :shouldDisableAnswerClick="shouldDisableAnswerClick"
              :shouldShowClickHint="isInTutorialMode && i === 0 && j === 1"
              @toggle="(isToggle) => handleTextToggle(isToggle, text)"
            />
            <span v-else :key="text.value" v-text="text.value" />
          </template>
        </p>
      </div>
      <RdSubmitButton
        class="article__submit-button"
        :state="!shouldDisableAnswerClick ? 'disable' : 'normal'"
        :text="textSubmitButton"
        @click.native="handleSubmitButtonClick"
      />
    </div>
  </article>
</template>

<script>
import RdQuizArticleAuthorProfile from './RdQuizArticleAuthorProfile.vue'
import RdQuizArticleAnswerText from './RdQuizArticleAnswerText.vue'
import RdSubmitButton from './RdSubmitButton.vue'

export default {
  name: 'RdQuizArticle',
  components: {
    RdQuizArticleAuthorProfile,
    RdQuizArticleAnswerText,
    RdSubmitButton,
  },
  props: {
    authorProfile: {
      type: Object,
      default: () => ({ name: '', id: '' }),
      validator(info) {
        return 'name' in info && 'id' in info
      },
    },
    title: {
      type: String,
      default: '',
    },
    info: {
      type: Object,
      default: () => ({ category: '', time: '' }),
      validator(info) {
        return 'category' in info && 'time' in info
      },
    },
    contents: {
      type: Array,
      default: () => [],
    },
    textSubmitButton: {
      type: String,
      default: '',
    },
    shouldDisableAnswerClick: {
      type: Boolean,
      default: false,
    },
    isInTutorialMode: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    authorProfileId() {
      return `@${this.authorProfile.id}`
    },
    authorProfileThumbnailText() {
      return this.authorProfile.id[0]
    },
  },
  methods: {
    isTextTypeAnswer(text) {
      return (text?.type ?? '').startsWith('answer')
    },
    handleTextToggle(isToggle, text) {
      if (this.isInTutorialMode) {
        this.$emit('exitTutorialMode')
      }
      this.$emit('answerClick', { text, isToggle })
    },
    handleSubmitButtonClick() {
      if (!this.shouldDisableAnswerClick) {
        return
      }
      this.$emit('submit')
    },
  },
}
</script>

<style lang="scss" scoped>
.article {
  padding: 118px 0 0 0;
  background-color: white;
  @include media-breakpoint-up(md) {
    padding: 135px 0 0 0;
  }

  &__title,
  &__info {
    margin: 12px 0 0 0;
    @include media-breakpoint-up(md) {
      margin: 16px 0 0 0;
    }
  }
  &__contents {
    margin: 24px 0 0 0;
  }
  &__submit-button {
    display: none !important;
    margin: 48px 0 0 0;
    @include media-breakpoint-up(md) {
      display: flex !important;
      margin: 48px auto 0 auto;
      max-width: 280px;
    }
  }
}

.wrapper {
  padding: 66px 20px 48px 20px;
  @include media-breakpoint-up(md) {
    padding: 100px 0 48px 0;
    max-width: 568px;
    margin: 0 auto;
  }
  @include media-breakpoint-up(xl) {
    padding: 98px 0 60px 0;
    max-width: 600px;
  }
}

.title {
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: 0.032em;
  color: #111111;
}

.info {
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
  color: #111111;
}

.contents {
  font-weight: 300;
  font-size: 24px;
  line-height: 48px;
  letter-spacing: 1px;
  color: #111111;
  p + p {
    margin: 24px 0 0 0;
  }
  &__answer-text {
    margin: 0 1px;
  }

  &--dimmed {
    &:after {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      z-index: 99999999;
      display: inline-block;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.87);
    }
  }

  p.highlight {
    z-index: 999999999;
    background-color: white;
    position: relative;
    left: -20px;
    width: 100vw;
    padding: 0 20px;

    @include media-breakpoint-up(md) {
      left: calc((100vw - 568px) / 2 * -1);
      padding: 0;
      padding-left: calc((100vw - 568px) / 2);
      padding-right: calc((100vw - 568px) / 2);
    }
    @include media-breakpoint-up(xl) {
      left: calc((100vw - 600px) / 2 * -1);
      padding: 0;
      padding-left: calc((100vw - 600px) / 2);
      padding-right: calc((100vw - 600px) / 2);
    }
  }
}
</style>
