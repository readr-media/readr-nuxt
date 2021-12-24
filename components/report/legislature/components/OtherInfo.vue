<template>
  <section>
    <!--閱讀測驗、如果你關心這個議題等等功能-->
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
  </section>
</template>

<script>
// import RdQuiz from '~/components/RdQuiz.vue'
import Donate from './Donate.vue'
import RdReportExtras from '~/components/app/Report/RdReportExtras.vue'
import RdReportCredit from '~/components/app/Report/RdReportCredit.vue'

export default {
  components: {
    // RdQuiz,
    RdReportExtras,
    RdReportCredit,
    Donate,
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
</style>
