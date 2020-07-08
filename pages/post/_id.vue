<template>
  <article>
    <div class="date">{{ $getFormattedDate(post.publishedAt) }}</div>
    <h1>{{ post.title }}</h1>
  </article>
</template>

<script>
import { ref, useFetch, useContext } from 'nuxt-composition-api'

export default {
  name: 'Post',
  setup() {
    const post = ref({})
    const { $fetchPost, route } = useContext()

    useFetch(async function fetchPost() {
      const response = await $fetchPost(route.value.params.id)
      post.value = response?.items?.[0] ?? {}
    })

    return {
      post,
    }
  },
}
</script>

<style lang="scss" scoped>
.date {
  text-align: center;
  font-size: 13px;
  line-height: 1.4;
  color: rgba(#000, 0.87);
  margin-bottom: 12px;
  @include media-breakpoint-up(md) {
    font-size: 15px;
    margin-bottom: 20px;
  }
}
h1 {
  font-weight: 900;
  font-size: 30px;
  line-height: 1.47;
  padding-left: 20px;
  padding-right: 20px;
  color: #000928;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  @include media-breakpoint-up(md) {
    text-align: center;
    font-size: 36px;
    line-height: 1.33;
  }
}
</style>
