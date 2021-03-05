<template>
  <div>
    <RdNews v-if="shouldMountNews" :news="post" />
    <RdReport v-else :report="post" />
  </div>
</template>

<script>
import { post } from '~/apollo/queries/post.gql'

const KEYSTONE_POST_IDS = [2749]

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
      return !KEYSTONE_POST_IDS.includes(Number(this.postId))
    },
  },

  methods: {
    async loadNews() {
      const response = (await this.$fetchPost(this.postId)) || {}
      this.post = response.items?.[0] || {}
    },
    async loadReport() {
      const response =
        (await this.$apollo.query({
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
