<template>
  <div class="report">
    <component
      :is="featureComponent"
      :cmsData="cmsData"
      :reportSlug="slug"
    ></component>
  </div>
</template>

<script>
import archieml from 'archieml'

import intersect from '~/components/helpers/directives/intersect.js'

import { SITE_TITLE, SITE_URL } from '~/constants/metadata.js'

export default {
  name: 'RdReport',

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
    featureComponent() {
      return () => import(`~/components/report/${this.slug}/index.vue`)
    },
    cmsData() {
      const aml = JSON.parse(this.report.contentApiData)
        .filter(function isNeededType(item) {
          return ['unstyled', 'annotation'].includes(item.type)
        })
        .flatMap(function getContent(item) {
          return item.content
        })
        .join('\n')

      const json = archieml.load(aml) || {}

      return {
        ...this.report,
        contentApiData: json,
      }
    },

    slug() {
      return this.report.slug
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
