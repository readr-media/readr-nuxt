<template>
  <article class="article">
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
    <div class="article__contents contents">
      <p v-for="(content, i) in contents" :key="i">
        <template v-for="text in content.texts">
          <RdQuizArticleAnswerText
            v-if="isTextTypeAnswer(text)"
            :key="text.value"
            :text="text.value"
            :shouldDisableAnswerClick="shouldDisableAnswerClick"
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
    />
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
      this.$emit('answerClick', { text, isToggle })
    },
  },
}
</script>

<style lang="scss" scoped>
.article {
  padding: 18px 20px 48px 20px;
  @include media-breakpoint-up(md) {
    padding: 52px 0 48px 0;
    max-width: 568px;
    margin: 0 auto;
  }
  @include media-breakpoint-up(xl) {
    padding: 50px 0 60px 0;
    max-width: 600px;
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
    margin: 48px 0 0 0;
    @include media-breakpoint-up(md) {
      margin: 48px auto 0 auto;
      max-width: 280px;
    }
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
  letter-spacing: 0.032em;
  color: #111111;
  p + p {
    margin: 48px 0 0 0;
  }
}
</style>
