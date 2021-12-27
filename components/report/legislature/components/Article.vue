<template>
  <section>
    <RdReportArticle
      :contents="cmsData.contentApiData.article"
      :slug="'sick-pigs'"
      @sendGaEvent="sendGaEvent"
    />
  </section>
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
  },
}
</script>

<style lang="scss" scoped>
$primary-color: #33aba4;
.report-article::v-deep {
  background: #1b1b1b !important;
  color: #ffffff !important;

  h2 {
    color: $primary-color;
  }

  &__picture_description {
    color: #fff;
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
