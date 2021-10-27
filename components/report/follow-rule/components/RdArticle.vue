<template>
  <div>
    <RdReportArticle
      :contents="splitUnderline(cmsData.contentApiData.article)"
      slug="follow-rule"
      :processBarHeight="processBarHeight"
      @sendGaEvent="sendGaEvent"
      @observe="(target) => handleObserve(target)"
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
  </div>
</template>

<script>
import RdReportQuiz from './RdReportQuiz.vue'
import RdReportArticle from '~/components/app/Report/RdReportArticle.vue'

export default {
  components: {
    RdReportArticle,
    RdReportQuiz,
  },
  props: {
    cmsData: {
      type: Object,
      default: () => {},
    },
    processBarHeight: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    splitUnderline(contents) {
      contents = contents.map((content) => {
        if (typeof content.value !== 'string') return content
        const underlineContent = content.value.match(/<u*.*>*.*<\/u>/)
        if (underlineContent) {
          const newContent =
            '<u>' +
            underlineContent[0]
              .split('')
              .slice(3, underlineContent.length - 5)
              .join('</u><u>') +
            '</u>'
          content.value = content.value.replace(/<u*.*>*.*<\/u>/, newContent)
        }
        return content
      })
      return contents
    },
    handleObserve(target) {
      this.$emit('chaneParagraph', target.id)
    },
  },
}
</script>

<style lang="scss" scoped>
.report-article::v-deep {
  padding: 48px 20px;
  color: #000000;
  background-color: rgba(254, 234, 223, 1);

  a {
    color: rgba(40, 221, 177, 1);
  }

  .paragraph-with-annotation {
    .toggle {
      background: #ffffff;
      border: 1px solid rgba(40, 221, 177, 1);

      path {
        fill: #28ddb1;
      }
    }

    .annotation {
      background: rgba(17, 17, 17, 1);
      background: rgba(40, 221, 177, 1);
      border: 1px solid rgba(0, 0, 0, 1);
    }
  }
}
</style>
