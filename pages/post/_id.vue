<template>
  <div>
    <RdNews v-if="shouldMountNews" :news="post" />
    <RdReport v-else :report="post" />
  </div>
</template>

<script>
import { post, news } from '~/apollo/queries/post.gql'

import { SITE_TITLE } from '~/constants/metadata.js'
import { formatDate } from '~/helpers/index.js'

const KEYSTONE_DEV_POST_IDS = [2749, 2834, 2836, 2840]

export default {
  name: 'Post',

  components: {
    RdNews: () => import('~/components/app/RdNews.vue'),
    RdReport: () => import('~/components/app/Report/RdReport.vue'),
  },

  async fetch() {
    if (this.shouldMountNews) {
      await this.loadNews()
    } else {
      await this.loadReport()
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
    shouldMountNews() {
      return !KEYSTONE_DEV_POST_IDS.includes(Number(this.postId))
    },
  },

  methods: {
    async loadNews() {
      const response =
        (await this.$apolloProvider.defaultClient.query({
          query: news,
          variables: {
            id: this.postId,
          },
        })) || {}
      const {
        title = '',
        heroImage = {},
        contentHtml = '',
        ogTitle = '',
        ogDescription = '',
        ogImage = {},
        tags = [],
        publishTime = '',
        updatedAt = '',
      } = response.data?.news || {}
      this.post = {
        title,
        heroImg: {
          src: {
            xs: heroImage?.urlMobileSized,
            sm: heroImage?.urlDesktopSized,
          },
          alt: heroImage?.name || '',
        },
        date: formatDate(publishTime),
        content: contentHtml,
        metaTitle: `${ogTitle || title} - ${SITE_TITLE}`,
        ogDescription,
        ogImg:
          ogImage?.urlDesktopSized || heroImage?.urlDesktopSized || '/og.jpg',
        ogTags: tags.map((tag) => ({
          property: 'article:tag',
          content: tag.name,
        })),
        publishTime,
        updatedAt,
      }
    },
    async loadReport() {
      const { keystoneDevClient } = this.$apolloProvider.clients
      const response =
        (await keystoneDevClient.query({
          query: post,
          variables: {
            id: this.postId,
          },
        })) || {}
      this.post = response.data?.post || {}
    },
  },
}
</script>
