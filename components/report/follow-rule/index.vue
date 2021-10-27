<template>
  <div class="follow-rule">
    <RdReportHeader class="header" />
    <RdCover />
    <RdProgressBarMobile
      v-if="isMobile"
      ref="processBar"
      :tagsArray="cmsData.contentApiData.tag"
      :isScrollingUp="isScrollingUp"
    />
    <RdProgressBar
      v-else
      ref="processBar"
      :tagsArray="cmsData.contentApiData.tag"
      :nowTagId="nowTagId"
    />

    <RdArticle
      :cmsData="cmsData"
      @chaneParagraph="(id) => chaneParagraph(id)"
    />
    <RdReportExtras
      :contents="cmsData.contentApiData.extras.contents"
      @sendGaEvent="sendGaEvent"
    />
    <div class="donate-button">
      <readr-donate-button
        @clickButton="$ga.event('projects', 'click', 'donate')"
      />
    </div>
    <RdReportCredit
      :authors="cmsData.contentApiData.credit"
      :publishedAt="cmsData.contentApiData.publishedAt"
      :canSendGaEvent="shouldShowArticle || forceSectionNavActiveIndex === 1"
    />
    <LazyRenderer class="latest-coverages">
      <readr-latest-coverages />
    </LazyRenderer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LazyRenderer from 'vue-lazy-renderer'
import RdCover from './components/RdCover.vue'
import RdProgressBarMobile from './components/RdProgressBarMobile.vue'
import RdProgressBar from './components/RdProgressBar.vue'
import RdArticle from './components/RdArticle.vue'
import RdReportHeader from '~/components/app/Report/RdReportHeader.vue'
import RdReportExtras from '~/components/app/Report/RdReportExtras.vue'
import RdReportCredit from '~/components/app/Report/RdReportCredit.vue'
import { scrollDirection } from '~/components/helpers/vue/mixins/index.js'

export default {
  components: {
    RdReportHeader,
    RdCover,
    RdProgressBar,
    RdArticle,
    RdReportExtras,
    RdReportCredit,
    LazyRenderer,
    RdProgressBarMobile,
  },
  mixins: [scrollDirection],
  props: {
    cmsData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },

  data() {
    return {
      isMobile: true,
      nowTagId: 1,
    }
  },

  computed: {
    ...mapGetters('viewport', ['viewportWidth']),
  },

  watch: {
    viewportWidth(width) {
      this.isMobile = true
      this.isMobile = width < 768
    },
  },

  mounted() {
    if (this.viewportWidth > 768) this.isMobile = false
  },

  methods: {
    handleSim() {
      this.nowTagId++
    },
    handleSimDecrease() {
      this.nowTagId--
    },
    chaneParagraph(id) {
      this.nowTagId = id
    },
  },
}
</script>

<style lang="scss" scoped>
$--primary-color: rgba(254, 234, 223, 1);
$--secondary-color: rgb(133, 101, 93);

.sim {
  margin: 0 auto;
  width: 150px;
  padding: 5px;
  border: 1px solid #28ddb1;
  cursor: pointer;
}

.follow-rule {
  background-color: $--primary-color;
  .header {
    visibility: inherit;
  }

  &::v-deep {
    .report-extras {
      background: rgba(243, 229, 225, 1);
      .container:first-child {
        background: rgba(255, 233, 214, 1);
      }
    }

    u {
      text-decoration: none;
      position: relative;
      z-index: 2;
      &::after {
        content: '';
        background-image: url('~/assets/imgs/report/follow-rule/underline.svg');
        background-repeat: no-repeat;
        background-size: cover;
        position: absolute;
        bottom: -0.125rem;
        left: -0.5rem;
        right: -0.5rem;
        height: 0.75rem;
        z-index: 1;
      }
    }

    .report-article {
      background: #feeade;
      &__title {
        font-size: 24px;
        line-height: 36px;
      }
    }
  }

  .donate-button::v-deep {
    padding: 32px 0 28px 0;
    background: #ffe9d6;
    @include media-breakpoint-up(md) {
      padding: 60px 0 64px 0;
    }
    readr-donate-button {
      margin: 0 auto;
      width: 100%;
      @include media-breakpoint-up(md) {
        width: 476px;
      }
    }
    a.sc-readr-donate-button {
      width: 95%;
      &::before {
        background-color: #111111;
      }

      div.sc-readr-donate-button {
        background-color: #000000;
        color: white;
        border-color: white;

        &:hover {
          background-color: #28ddb1;
          color: white;
        }
      }
    }
  }

  .report-credit::v-deep {
    background: rgba(235, 235, 235, 1);
  }

  .latest-coverages::v-deep {
    background: rgba(235, 235, 235, 1);
    .hydrated {
      max-width: 600px;
      margin: 0 auto;
      padding: 0 0 40px 0;
      h2 {
        background: rgba(17, 17, 17, 1);
        color: #ebebeb;
      }
    }
  }
}
</style>
