<template>
  <div class="sick-pigs">
    <RdReportHeader class="header" />

    <RdCover :contents="cmsData.contentApiData.cover" />
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
import RdCover from './components/RdCover.vue'
import RdReportExtras from '~/components/app/Report/RdReportExtras.vue'
import RdReportHeader from '~/components/app/Report/RdReportHeader.vue'
import RdReportCredit from '~/components/app/Report/RdReportCredit.vue'
export default {
  components: {
    RdReportHeader,
    RdReportCredit,
    RdReportExtras,
    RdCover,
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
.sick-pigs {
  background: #dddddd;

  .donate-button::v-deep {
    display: flex;
    justify-content: center;
    padding: 24px 0 28px 0;
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
  }
}
</style>

<style lang="scss">
#default-footer {
  background-color: #dddddd;
}
</style>
