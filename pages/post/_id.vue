<template>
  <div class="post-page">
    <DumbHeaderProgress />

    <article id="post">
      <div class="date">{{ $getFormattedDate(post.publishedAt) }}</div>
      <h1>{{ post.title }}</h1>
      <div class="container">
        <picture class="hero-img">
          <img :src="$getImage(post)" alt="" />
        </picture>
        <div class="content" v-html="post.content" />
      </div>
    </article>
  </div>
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
.post-page {
  padding-top: 68.63px;
}
article {
  padding-top: 14px;
}
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
  margin-bottom: 20px;
  @include media-breakpoint-up(md) {
    text-align: center;
    font-size: 36px;
    line-height: 1.33;
    margin-bottom: 30px;
  }
  @media (min-width: 840px) {
    padding-left: 0;
    padding-right: 0;
  }
}
.container {
  max-width: 660px;
  margin-left: auto;
  margin-right: auto;
}
.hero-img {
  position: relative;
  padding-top: 50%;
  background-color: #d8d8d8;
  @include media-breakpoint-up(md) {
    border-radius: 2px;
    overflow: hidden;
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.content {
  padding-top: 20px;
  padding-bottom: 70px;
  font-size: 15px;
  line-height: 2;
  letter-spacing: 0.6px;
  color: rgba(#000, 0.87);
  @include media-breakpoint-up(md) {
    font-size: 18px;
    line-height: 1.89;
    padding-top: 30px;
  }
  ::v-deep {
    p,
    h2 {
      max-width: 600px;
      margin-left: 30px;
      margin-right: 30px;
      @media (min-width: 660px) {
        margin-left: auto;
        margin-right: auto;
      }
    }
    h2 {
      font-weight: 900;
      font-size: 24px;
      line-height: 1.5;
      margin-top: 60px;
      margin-bottom: 40px;
      letter-spacing: 0;
      @include media-breakpoint-up(md) {
        font-size: 26px;
        margin-bottom: 30px;
        line-height: 1.46;
      }
    }
    p + p {
      margin-top: 30px;
      @include media-breakpoint-up(md) {
        margin-top: 34px;
      }
    }
    a {
      color: #04295e;
      border-bottom: 1px solid #04295e;
    }
    .readme-image {
      margin: 40px auto;
      max-width: 600px;
      @include media-breakpoint-up(md) {
        margin-top: 30px;
        margin-bottom: 30px;
      }
      img {
        width: 100%;
        background-color: rgba(216, 216, 216, 0.15);
        @include media-breakpoint-up(md) {
          border-radius: 4px;
        }
      }
      &::after {
        display: block;
        content: attr(text);
        font-size: 13px;
        line-height: 1.46;
        letter-spacing: 1px;
        color: rgba(#000, 0.66);
        margin-left: 30px;
        margin-right: 30px;
        margin-top: 10px;
        @media (min-width: 600px) {
          margin-left: calc(30px - (100vw - 600px) / 2);
          margin-right: calc(30px - (100vw - 600px) / 2);
        }
        @media (min-width: 660px) {
          margin-left: 1px;
          margin-right: 1px;
        }
        @include media-breakpoint-up(md) {
          font-size: 15px;
          line-height: 1.27;
        }
      }
      &[text='undefined']::after {
        content: none;
      }
    }
  }
}
</style>
