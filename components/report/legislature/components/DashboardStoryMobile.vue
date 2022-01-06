<template>
  <div class="mobile-story">
    <RdReportArticle
      id="mobile"
      :contents="mobileContent"
      :slug="'legislature'"
      :isPart="true"
      @sendGaEvent="sendGaEvent"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import RdReportArticle from '~/components/app/Report/RdReportArticle.vue'

export default {
  layout: 'empty',
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

  computed: {
    ...mapGetters('viewport', ['viewportHeight']),

    mobileContent() {
      return this.cmsData.contentApiData.alternative
    },
  },

  mounted() {
    console.log(this.mobileContent)
  },

  methods: {},
}
</script>

<style lang="scss" scoped>
$primary-color: #33aba4;
.mobile-story {
  background: #1b1b1b !important;
  padding-top: 48px;
  padding-bottom: 32px;
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
