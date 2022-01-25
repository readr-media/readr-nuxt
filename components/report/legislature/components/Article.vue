<template>
  <div class="article">
    <RdReportArticle
      id="article1"
      v-observe-visibility="{
        callback: handleArticle1VisibilityChange,
        intersection,
      }"
      :contents="paragraph[0]"
      :slug="'legislature'"
      :isPart="true"
      @sendGaEvent="sendGaEvent"
    />
    <RdReportArticle
      id="article2"
      v-observe-visibility="{
        callback: handleArticle2VisibilityChange,
        intersection,
      }"
      :contents="paragraph[1]"
      :slug="'legislature'"
      :isPart="true"
      @sendGaEvent="sendGaEvent"
    />
    <RdReportArticle
      id="article3"
      v-observe-visibility="{
        callback: handleArticle3VisibilityChange,
        intersection,
      }"
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
    intersection: {
      type: Object,
      default: () => {},
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
      if (line.type === 'title' && temp.length > 2) {
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
$secondary-color: #d9a87b;

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

#article2::v-deep {
  background: #484848 !important;
  padding-top: 20px !important;
  padding-bottom: 20px !important;

  h2 {
    color: $secondary-color;
  }

  .report-article__picture_description {
    color: #fff !important;
  }

  a {
    color: $secondary-color;
  }

  .annotated {
    color: #fff;
    .toggle {
      background: $secondary-color;
    }
  }

  .annotation {
    background: $secondary-color;
  }
}
</style>
