<template>
  <div class="article">
    <RdReportArticle
      v-observe-visibility="handleArticle1VisibilityChange"
      :id="`article1`"
      :contents="paragraph[0]"
      :slug="'legislature'"
      :isPart="true"
      @sendGaEvent="sendGaEvent"
    />
    <RdReportArticle
      v-observe-visibility="handleArticle2VisibilityChange"
      :id="`article2`"
      :contents="paragraph[1]"
      :slug="'legislature'"
      :isPart="true"
      @sendGaEvent="sendGaEvent"
    />
    <RdReportArticle
      v-observe-visibility="handleArticle3VisibilityChange"
      :id="`article3`"
      :contents="paragraph[2]"
      :slug="'legislature'"
      :isPart="true"
      @sendGaEvent="sendGaEvent"
    />
  </div>
</template>

<script>
import RdReportArticle from '~/components/app/Report/RdReportArticle.vue'
export default {
  components: {
    RdReportArticle,
  },
  props: {
    cmsData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    handleArticle1VisibilityChange: {
      type: Function,
      defaule: () => {},
    },
    handleArticle2VisibilityChange: {
      type: Function,
      defaule: () => {},
    },
    handleArticle3VisibilityChange: {
      type: Function,
      defaule: () => {},
    },
  },
  data() {
    return {
      paragraph: [],
    }
  },
  mounted() {
    if (!this.cmsData.contentApiData?.article) return
    let temp = []
    this.cmsData.contentApiData.article.map((line) => {
      if (line.type === 'title' && temp.length) {
        this.paragraph.push(temp)
        temp = []
      }
      temp.push(line)
    })
    this.paragraph.push(temp)
  },
}
</script>

<style lang="scss" scoped>
$primary-color: #33aba4;
.article {
  background: #1b1b1b !important;
  padding: 48px 0;
}

.report-article::v-deep {
  background: #1b1b1b !important;
  color: #ffffff !important;

  h2 {
    color: $primary-color;
  }

  .report-article__picture_description {
    color: #fff !important;
  }

  a {
    color: $primary-color;
  }

  .annotated {
    color: #fff;
    .toggle {
      background: $primary-color;
      path {
        fill: #fff;
      }
    }
  }

  .annotation {
    background: $primary-color;
  }
}
</style>
