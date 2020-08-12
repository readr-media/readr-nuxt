<template>
  <div class="post-list-joined">
    <a
      v-for="post in posts"
      :key="post.id"
      :href="$getHref(post)"
      target="_blank"
    >
      <article>
        <picture>
          <img :src="$getImage(post)" alt="" />
        </picture>
        <h1>{{ post.title }}</h1>
      </article>
    </a>
  </div>
</template>

<script>
export default {
  name: 'PostListJoined',
  props: {
    posts: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.post-list-joined {
  display: flex;
  overflow-y: auto;
  color: #000928;
  line-height: 1.5;
}

a {
  flex: 0 0 auto;
  width: 100%;
  max-width: 200px;
  @include media-breakpoint-up(md) {
    max-width: 274px;
  }

  &:hover {
    img {
      transform: scale(1.1);
    }
  }
}

picture {
  padding-top: 50%;
  position: relative;
  overflow: hidden;
}

img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

h1 {
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 2.5px;
  margin-top: 9px;
  width: 87.5%;
  word-wrap: break-word;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  @include media-breakpoint-up(md) {
    font-size: 18px;
    margin-top: 14px;
  }
}
</style>
