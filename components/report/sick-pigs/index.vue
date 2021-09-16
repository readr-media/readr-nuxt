<template>
  <div class="sick-pigs">
    <RdReportHeader class="header" />

    <RdCover :contents="cmsData.contentApiData.cover" :latestNews="news[0]" />
    <RdAnimation />
    <RdFlashNews :flashNewsList="news" />
    <RdReportArticle
      :contents="cmsData.contentApiData.article"
      :slug="'sick-pigs'"
      @sendGaEvent="sendGaEvent"
    />
    <RdQuiz
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
      :canSendGaEvent="shouldShowArticle || forceSectionNavActiveIndex === 1"
    />
    <div class="donate-button">
      <readr-donate-button
        @clickButton="$ga.event('projects', 'click', 'donate')"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import RdCover from './components/RdCover.vue'
import RdAnimation from './components/RdAnimation.vue'
import RdQuiz from './components/RdQuiz.vue'
import RdFlashNews from './components/RdFlashNews.vue'
import RdReportArticle from '~/components/app/Report/RdReportArticle.vue'
import RdReportExtras from '~/components/app/Report/RdReportExtras.vue'
import RdReportHeader from '~/components/app/Report/RdReportHeader.vue'
import RdReportCredit from '~/components/app/Report/RdReportCredit.vue'
export default {
  components: {
    RdReportHeader,
    RdReportCredit,
    RdReportExtras,
    RdCover,
    RdAnimation,
    RdQuiz,
    RdReportArticle,
    RdFlashNews,
  },
  props: {
    cmsData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      news: [],
    }
  },
  mounted() {
    axios
      .get('https://storage.googleapis.com/projects.readr.tw/dashboard.json')
      .then((res) => {
        const { news } = res.data
        this.news = news
        console.log(news)
        this.isLoadingData = false
      })
  },
}
</script>

<style lang="scss" scoped>
.sick-pigs {
  background: #dddddd;

  .donate-button::v-deep {
    display: flex;
    justify-content: center;
    padding: 24px 0 28px 0;
    font-weight: bold;
    background: #dddddd;
    @include media-breakpoint-up(md) {
      padding: 60px 0;
    }
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
        background-color: rgba(191, 109, 40, 1);
        color: rgba(0, 9, 40, 1);
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
  }

  &::v-deep {
    readr-header {
      visibility: inherit;
    }
    .report-extras {
      background: #dddddd;
    }
    a {
      font-weight: 300;
      font-size: 18px;
      line-height: 34px;
      letter-spacing: 0.006em;
      color: #161616;
      &:hover {
        font-weight: bold;
        color: #bf6d28;
      }
      &:active {
        font-weight: normal !important;
      }
    }
    .report-article {
      background: #dddddd;
      .toggle {
        background: rgba(191, 109, 40, 1);
        path {
          fill: #ffffff;
        }
      }
      .annotation {
        background: rgba(191, 109, 40, 1);
        color: #ffffff;
      }
    }
  }
}
</style>

<style lang="scss">
#default-footer {
  background-color: #dddddd;
}
</style>
