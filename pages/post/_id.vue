<template>
  <div class="post-and-report-wrapper">
    <RdReport v-if="shouldMountEmbeddedReport" :report="post" />
  </div>
</template>

<script>
import { SITE_TITLE, SITE_URL } from '~/helpers/index.js'

export default {
  name: 'Post',
  components: {
    RdReport: () => import('~/components/app/Report/RdReport.vue'),
  },
  async asyncData({ params, error }) {
    try {
      // Dynamically import the JavaScript file based on the page ID

      const module = await import(`~/consts/post-${params?.id}.js`)

      const { post } = module
      return { post }
    } catch (e) {
      console.error('error message?', e)
    }
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
    postStyle() {
      return this.post?.style ?? ''
    },
    shouldMountEmbeddedReport() {
      return this.postStyle === 'embedded'
    },
  },
  mounted() {
    if (Object.keys(this.post).length === 0) {
      this.$nuxt.error({ statusCode: 404 })
    }
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

<style lang="scss" scoped>
.post-and-report-wrapper {
  min-height: 100vh;
}
</style>
