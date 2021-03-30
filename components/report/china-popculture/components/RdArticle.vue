<template>
  <section v-show="shouldShowArticle" class="article">
    <div class="article__article-leading-description-wrapper">
      <RdArticleLeadingDescription
        :description="cmsData.contentApiData.articleLeadingDescription"
      />
    </div>
    <RdReportArticle
      :contents="cmsData.contentApiData.article.contents"
      :slug="'china-popculture'"
      @sendGaEvent="sendGaEvent"
    />
    <RdReportExtras
      :contents="cmsData.contentApiData.extras.contents"
      @sendGaEvent="sendGaEvent"
    />
    <div class="donate-button">
      <readr-donate-button
        @clickButton="sendGaClickEvent({ label: 'donate' })"
      />
    </div>
  </section>
</template>

<script>
import RdArticleLeadingDescription from './RdArticleLeadingDescription.vue'
import RdReportArticle from '~/components/app/Report/RdReportArticle.vue'
import RdReportExtras from '~/components/app/Report/RdReportExtras.vue'

export default {
  components: {
    RdArticleLeadingDescription,
    RdReportArticle,
    RdReportExtras,
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

<style lang="scss">
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
</style>
<style lang="scss" scoped>
.article {
  padding: 118px 0 0 0;
  @include media-breakpoint-up(md) {
    padding: 135px 0 0 0;
  }
  &__article-leading-description-wrapper {
    background-color: #f1f1f1;
    padding: 48px 20px 0 20px;
    display: flex;
    justify-content: center;
    @include media-breakpoint-up(xl) {
      padding: 60px 0 0 0;
    }
  }
}

.donate-button {
  padding: 0 20px;
  margin: 72px 0;
  @include media-breakpoint-up(md) {
    max-width: 476px;
    margin: 96px auto;
  }
  @include media-breakpoint-up(xl) {
    margin: 120px auto;
  }
}
</style>
