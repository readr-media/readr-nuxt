<template>
  <div>
    <RdNews v-if="shouldMountNews" :news="post" />
    <RdReport v-else :report="post" />
  </div>
</template>

<script>
import { news, report } from '~/apollo/queries/post.gql'

const KEYSTONE_POST_IDS = [2749, 2834, 2836, 2840]

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
}
</script>
