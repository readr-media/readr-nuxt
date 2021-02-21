<template>
  <ul class="list">
    <li v-for="post in posts" :key="post.id">
      <article>
        <a :href="$getHref(post)" target="_blank" @click="$emit('sendGaEvt')">
          <div class="img-wrapper">
            <img v-lazy="$getImage(post)" alt="" />
          </div>
          <div class="text-wrapper">
            <h1>{{ post.title }}</h1>
            <div class="date">
              {{ $getFormattedDate(post.publishedAt) }}
            </div>
          </div>
        </a>
      </article>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'RdList',
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
.list {
  li + li {
    margin-top: 18px;
    @include media-breakpoint-up(md) {
      margin-top: 24px;
    }
  }
  h1 {
    font-weight: 700;
    font-size: 15px;
    line-height: 1.5;
    color: rgba(#000, 0.87);
    letter-spacing: 2.5px;
    word-wrap: break-word;
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    @include media-breakpoint-up(md) {
      font-size: 18px;
    }
  }
  a {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .text-wrapper {
    width: calc((100% - 14px) * 0.64);
    @include media-breakpoint-up(md) {
      width: calc((100% - 24px) * 0.68);
    }
  }
  .date {
    font-size: 13px;
    line-height: 1.4;
    color: rgba(#000, 0.66);
    margin-top: 12px;
    @include media-breakpoint-up(md) {
      font-size: 15px;
      margin-top: 20px;
    }
  }
}

.img-wrapper {
  position: relative;
  width: calc((100% - 14px) * 0.36);
  padding-top: calc((100% - 14px) * 0.18);
  @include media-breakpoint-up(md) {
    width: calc((100% - 24px) * 0.32);
    padding-top: calc((100% - 24px) * 0.16);
  }
}
</style>
