<template>
  <section class="article">
    <div class="article__article-leading-description-wrapper">
      <RdArticleLeadingDescription
        :description="cmsData.contentApiData.articleLeadingDescription"
      />
    </div>
    <RdReportArticle
      :contents="cmsData.contentApiData.article.contents"
      :slug="'china-popculture'"
      @sendGaEvent="sendGaEvent"
    />
    <div class="article__report-quiz-wrapper">
      <RdReportQuiz
        :quizTitle="cmsData.contentApiData.articleQuiz.title"
        :quizDescription="cmsData.contentApiData.articleQuiz.description"
        :quizOptions="cmsData.contentApiData.articleQuiz.options"
        :quizDetailTitleCorrect="
          cmsData.contentApiData.articleQuiz.answerDetailTitleCorrect
        "
        :quizDetailTitleWrong="
          cmsData.contentApiData.articleQuiz.answerDetailTitleWrong
        "
        :quizDetailDescription="
          cmsData.contentApiData.articleQuiz.answerDetailDescription
        "
      />
    </div>
    <RdReportExtras
      :contents="cmsData.contentApiData.extras.contents"
      @sendGaEvent="sendGaEvent"
    />
    <div class="donate-button">
      <readr-donate-button
        @clickButton="$ga.event('projects', 'click', 'donate')"
      />
    </div>
  </section>
</template>

<script>
import RdArticleLeadingDescription from './RdArticleLeadingDescription.vue'
import RdReportQuiz from './RdReportQuiz.vue'
import RdReportArticle from '~/components/app/Report/RdReportArticle.vue'
import RdReportExtras from '~/components/app/Report/RdReportExtras.vue'

export default {
  components: {
    RdArticleLeadingDescription,
    RdReportArticle,
    RdReportQuiz,
    RdReportExtras,
  },
  props: {
    cmsData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  methods: {
    sendGaEvent({ action, label, value }) {
      this.$ga.event('projects', action, label, value)
    },
  },
}
</script>

<style lang="scss">
readr-donate-button {
  width: 100%;
  @include media-breakpoint-up(md) {
    width: 476px;
  }
}
a.sc-readr-donate-button {
  &::before {
    background-color: #111111;
  }

  div.sc-readr-donate-button {
    background-color: #ff3f3f;
    color: white;
    border-color: white;

    &:hover {
      background-color: #111111;
      color: white;
    }

    &:active {
      color: white;
    }
  }
}
</style>
<style lang="scss" scoped>
.article {
  padding: 118px 0 0 0;
  background-color: #f1f1f1;
  @include media-breakpoint-up(md) {
    padding: 135px 0 0 0;
  }
  &__article-leading-description-wrapper {
    background-color: #f1f1f1;
    padding: 48px 20px 0 20px;
    display: flex;
    justify-content: center;
    @include media-breakpoint-up(xl) {
      padding: 60px 0 0 0;
    }
  }
  &__report-quiz-wrapper {
    padding: 0 20px 48px 20px;
    background-color: #f1f1f1;

    @include media-breakpoint-up(xl) {
      padding: 0 0 60px 0;
    }
  }
}

.donate-button {
  padding: 72px 20px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  @include media-breakpoint-up(md) {
    padding: 96px 0;
  }
  @include media-breakpoint-up(xl) {
    padding: 120px 0;
  }
}
</style>
