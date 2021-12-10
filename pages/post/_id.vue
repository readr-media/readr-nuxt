<template>
  <div class="post-and-report-wrapper">
    <RdNews v-if="shouldMountNews" :news="post" />
    <RdReport v-if="shouldMountEmbeddedReport" :report="post" />
  </div>
</template>

<script>
// import { news, report } from '~/apollo/queries/post.js'
import { post } from '~/apollo/queries/post.js'
import { SITE_TITLE, SITE_URL } from '~/helpers/index.js'

const validStyles = ['news', 'embedded', 'project3', 'report']

export default {
  name: 'Post',

  components: {
    RdNews: () => import('~/components/app/RdNews.vue'),
    RdReport: () => import('~/components/app/Report/RdReport.vue'),
  },

  apollo: {
    post: {
      query() {
        return post
      },
      variables() {
        return {
          id: this.postId,
        }
      },
      update(data) {
        if (
          !data.post?.title ||
          data.post?.state !== 'published' ||
          (data.post?.style && !validStyles.includes(data.post?.style))
        ) {
          this.has404Err = true
          if (process.server) {
            this.$nuxt.context.res.statusCode = 404
          }
        }
        return data?.post ?? {}
      },
      // doc: https://v4.apollo.vuejs.org/guide-composable/error-handling.html#error-policies
      errorPolicy: 'all',
      error(error) {
        const statusCode = error.networkError?.statusCode ?? 404
        const is5xxError = /^5[0-9]/
        const status = is5xxError.test(statusCode) ? 500 : 404
        this[`has${status}Err`] = true
        if (process.server) {
          this.$nuxt.context.res.statusCode = status
        }
        // eslint-disable-next-line no-console
        console.log('[GQL_ERR]', error)
      },
    },
  },

  data() {
    return {
      post: {},
      has404Err: false,
      has500Err: false,
    }
  },

  computed: {
    postId() {
      return this.$route.params.id
    },
    postSlug() {
      return this.post?.slug ?? ''
    },
    postStyle() {
      return this.post?.style ?? ''
    },
    shouldMountNews() {
      return this.postStyle === 'news' || this.postStyle === ''
    },
    shouldMountEmbeddedReport() {
      return this.postStyle === 'embedded'
    },
  },
  mounted() {
    if (this.has404Err) {
      this.$nuxt.error({ statusCode: 404 })
    }
    if (this.has500Err) {
      this.$nuxt.error({ statusCode: 500 })
    }
    if (
      (this.postStyle === 'report' || this.postStyle === 'project3') &&
      window
    ) {
      if (this.postSlug) {
        const url = this.postStyle === 'report' ? 'project' : 'project/3'
        window.location.href = `${SITE_URL}/${url}/${this.postSlug}`
      } else {
        this.$nuxt.error({ statusCode: 404 })
      }
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
