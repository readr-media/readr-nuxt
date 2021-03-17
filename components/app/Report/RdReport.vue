<template>
  <div class="report">
    <component :is="featureComponent" :cmsData="cmsData"></component>

    <LazyRenderer
      v-if="shouldMountLatestCoverages"
      v-show="shouldShowLatestCoverages"
      class="latest-coverages"
    >
      <readr-latest-coverages />
    </LazyRenderer>
  </div>
</template>

<script>
import archieml from 'archieml'
import { mapState } from 'vuex'
import LazyRenderer from 'vue-lazy-renderer'

import intersect from '~/components/helpers/directives/intersect.js'

import { SITE_TITLE, SITE_URL } from '~/constants/metadata.js'

export default {
  name: 'RdReport',

  components: {
    LazyRenderer,
  },

  directives: {
    intersect,
  },

  props: {
    report: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },

  computed: {
    ...mapState('report', [
      'shouldMountLatestCoverages',
      'shouldShowLatestCoverages',
    ]),

    featureComponent() {
      return () => import(`~/components/report/${this.report.slug}/index.vue`)
    },
    cmsData() {
      const aml = JSON.parse(this.report.contentApiData)
        .filter(function isNeededType(item) {
          return ['unstyled', 'annotation', 'image'].includes(item.type)
        })
        .map(function buildContent({ type, content = [] } = {}) {
          if (type === 'image') {
            const [{ name, urlTabletSized, urlMobileSized }] = content || [{}]
            return `
              {.${type}}
              name: ${name}
              urlMobileSized: ${urlMobileSized}
              urlTabletSized: ${urlTabletSized}
              {}
            `
          }

          return content[0]
        })
        .join('\n')

      const json = archieml.load(aml) || {}

      return {
        ...this.report,
        contentApiData: json,
      }
    },
    contentApiData() {
      return this.cmsData.contentApiData
    },
  },

  head() {
    const {
      title,
      heroImage,
      ogTitle,
      ogDescription,
      ogImage,
      tags = [],
      publishTime,
      updatedAt,
    } = this.cmsData

    const metaTitle = `${ogTitle || title} - ${SITE_TITLE}`
    const ogImg =
      ogImage?.urlOriginal || heroImage?.urlOriginal || `${SITE_URL}/og.jpg`
    const ogTags = tags.map(function buildOgTag(tag) {
      return {
        property: 'article:tag',
        content: tag.name,
      }
    })
    const metaOg = [
      { hid: 'og:title', property: 'og:title', content: metaTitle },
      {
        hid: 'og:description',
        property: 'og:description',
        content: ogDescription,
      },
      { hid: 'og:image', property: 'og:image', content: ogImg },
      {
        hid: 'og:url',
        property: 'og:url',
        content: `${SITE_URL}${this.$route.path}`,
      },
      { hid: 'og:type', property: 'og:type', content: 'article' },
      {
        property: 'article:publisher',
        content: 'https://www.facebook.com/readr.tw',
      },
      { property: 'article:published_time', content: publishTime },
      { property: 'article:modified_time', content: updatedAt },
      ...ogTags,
    ]

    return {
      title: metaTitle,
      meta: [
        { hid: 'description', name: 'description', content: ogDescription },
        ...metaOg,
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.latest-coverages {
  padding: 24px 8px;
  @include media-breakpoint-up(md) {
    padding: 48px 8px;
  }
  @include media-breakpoint-up(xl) {
    padding: 60px 8px;
  }
}

readr-latest-coverages {
  margin: 0 auto;
  max-width: 600px;
}
</style>
