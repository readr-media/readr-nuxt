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
    <RdNewsLetterBtn />

    <LazyRenderer class="latest-coverages">
      <div style="background: #1b1b1b;">
        <readr-latest-coverages />
      </div>
    </LazyRenderer>
  </section>
</template>

<script>
import Donate from './Donate.vue'
import Quiz from './Quiz.vue'
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
  background: #1b1b1b;
  a {
    color: $primary-color;
    border: 2px solid $primary-color;
    max-width: 476px;
    &:hover {
      background: #000000;
    }
  }
}

::v-deep .latest-coverages {
  .hydrated {
    max-width: 600px;
    margin: 0 auto;
    padding: 0 0 40px 0;
    h2 {
      background: #fff;
      color: rgba(27, 27, 27, 1);
    }
    h3 {
      color: #fff;
    }
  }
}
</style>
