<template>
  <div>
    <RdNews v-if="shouldMountNews" :news="post" />
    <RdReport v-else :report="post" />
  </div>
</template>

<script>
import { news, report } from '~/apollo/queries/post.js'

import { SITE_TITLE, SITE_URL } from '~/helpers/index.js'

const KEYSTONE_POST_IDS = [2749, 2834, 2836, 2840, 2841, 2842]

export default {
  name: 'Post',

  components: {
    RdNews: () => import('~/components/app/RdNews.vue'),
    RdReport: () => import('~/components/app/Report/RdReport.vue'),
  },

  apollo: {
    post: {
      query() {
        return this.shouldMountNews ? news : report
      },
      variables() {
        return {
          id: this.postId,
        }
      },
    },
  },

  data() {
    return {
      post: {},
    }
  },

  computed: {
    postId() {
      return this.$route.params.id
    },
    shouldMountNews() {
      return !KEYSTONE_POST_IDS.includes(Number(this.postId))
    },
  },

  head() {
    const {
      title,
      heroImage,
      ogTitle,
      ogDescription: metaDescription,
      ogImage,
      tags = [],
      publishTime: publishedTime,
      updatedAt: modifiedTime,
    } = this.post

    const metaTitle = `${ogTitle || title} - ${SITE_TITLE}`
    const ogImg =
      ogImage?.urlDesktopSized ||
      heroImage?.urlDesktopSized ||
      `${SITE_URL}/og.jpg`
    const ogUrl = `${SITE_URL}${this.$route.path}`
    const ogTags = tags.map(function (tag) {
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
        content: metaDescription,
      },
      { hid: 'og:image', property: 'og:image', content: ogImg },
      {
        hid: 'og:url',
        property: 'og:url',
        content: ogUrl,
      },
      { hid: 'og:type', property: 'og:type', content: 'article' },
      ...ogTags,
    ]

    const metaArticle = [
      {
        hid: 'article:publisher',
        property: 'article:publisher',
        content: 'https://www.facebook.com/readr.tw',
      },
      {
        hid: 'article:published_time',
        property: 'article:published_time',
        content: publishedTime,
      },
      {
        hid: 'article:modified_time',
        property: 'article:modified_time',
        content: modifiedTime,
      },
    ]

    return {
      title: metaTitle,
      meta: [
        { hid: 'description', name: 'description', content: metaDescription },
        ...metaOg,
        ...metaArticle,
      ],
    }
  },
}
</script>
