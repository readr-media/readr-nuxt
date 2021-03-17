<template>
  <div class="cp">
    <RdCover
      v-show="shouldShowCover"
      :coverImgs="coverImgs"
      :title="cmsData.contentApiData.cover.title"
      :description="cmsData.contentApiData.cover.description"
      :textGoToArticle="cmsData.contentApiData.cover.textGoToArticle"
      @goToArticle="handleGoToArticle"
    />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import RdCover from './components/RdCover.vue'

export default {
  components: {
    RdCover,
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
      shouldShowCover: true,
    }
  },
  computed: {
    coverImgs() {
      return {
        large: this.getImageSrcByType('cp-cover-large'),
        small: this.getImageSrcByType('cp-cover-small'),
      }
    },
  },
  beforeMount() {
    this.unmountArticle()
    this.unmountExtras()
    this.unmountDonateButton()
    this.unmountLatestCoverages()
    this.unobserveCredit()
  },
  methods: {
    ...mapMutations('report', [
      'unmountArticle',
      'hideArticle',
      'showArticle',

      'unmountExtras',
      'hideExtras',
      'showExtras',

      'unmountDonateButton',
      'showDonateButton',

      'unmountLatestCoverages',
      'hideLatestCoverages',
      'showLatestCoverages',

      'unobserveCredit',
      'observeCredit',
    ]),
    hideCover() {
      this.shouldShowCover = false
    },

    getImageSrcByType(type) {
      return (this.cmsData?.contentApiData?.images ?? []).find(
        function findObjectByType(object) {
          return object.type === type
        }
      )?.value?.urlMobileSized
    },
    handleGoToArticle() {
      this.showArticle()
      this.showExtras()
      this.showDonateButton()
      this.showLatestCoverages()
      // this.observeCredit()
      this.hideCover()
      window.scrollTo(0, 0)
    },
  },
}
</script>

<style lang="scss">
.report-extras {
  background-color: white !important;
}

.report-credit {
  color: #111111 !important;
  background-color: #ebebeb !important;
}

a.sc-readr-donate-button {
  &::before {
    background-color: #111111;
  }

  div.sc-readr-donate-button {
    background-color: #ff3f3f;
    color: white;
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

.default__footer {
  background-color: #ebebeb !important;
  position: relative;
  &:before {
    display: none;
    @include media-breakpoint-up(xl) {
      z-index: -1;
      position: absolute;
      left: calc((100vw - 1096px) / 2 * -1);
      display: block;
      content: '';
      width: 100vw;
      height: 100%;
      background-color: #ebebeb !important;
    }
  }
}
</style>

<style lang="scss" scoped></style>
