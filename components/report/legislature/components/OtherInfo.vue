<template>
  <section>
    <!--閱讀測驗、如果你關心這個議題等等功能-->
    <Quiz
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
    <RdReportExtras
      :contents="cmsData.contentApiData.extras.contents"
      @sendGaEvent="sendGaEvent"
    />
    <RdReportCredit
      :authors="cmsData.contentApiData.credit"
      :publishedAt="cmsData.contentApiData.publishedAt"
      :canSendGaEvent="true"
    />
    <Donate @clickButton="$ga.event('projects', 'click', 'donate')" />
    <RdNewsLetterBtn
      @click.native="$ga.event('projects', 'click', `訂閱電子報`)"
    />

    <LazyRenderer class="latest-coverages">
      <RelatedPost :relatedPosts="cmsData.relatedPosts" />
      <LatestPost />
    </LazyRenderer>
  </section>
</template>

<script>
import Donate from './Donate.vue'
import Quiz from './Quiz.vue'
import LatestPost from './LatestPost.vue'
import RelatedPost from './RelatedPost.vue'
import RdReportExtras from '~/components/app/Report/RdReportExtras.vue'
import RdReportCredit from '~/components/app/Report/RdReportCredit.vue'
import RdNewsLetterBtn from '~/components/shared/RdNewsLetterBtn.vue'

export default {
  components: {
    RdReportExtras,
    RdReportCredit,
    Donate,
    Quiz,
    RdNewsLetterBtn,
    LatestPost,
    RelatedPost,
  },
  props: {
    cmsData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
}
</script>

<style lang="scss" scoped>
$primary-color: #33aba4;

.report-extras::v-deep {
  background: #1b1b1b !important;
  color: #ffffff !important;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    padding-left: 1em;
  }
  li::before {
    content: ' ';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #fff;
  }
  a {
    color: $primary-color;
  }
}

.report-credit {
  background: #1b1b1b;
  color: #ffffff !important;
}

.news-letter::v-deep {
  background: #1b1b1b !important;
  a {
    color: $primary-color;
    border: 2px solid $primary-color;
    max-width: 476px;
    &:hover {
      background: #000000 !important;
    }
  }
}
</style>
