<template>
  <div class="post-page">
    <UiHeaderProgress />

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

    <section class="latest-posts">
      <h2>
        <div>最新報導</div>
      </h2>
      <UiPostList :posts="latestPosts" />
    </section>
  </div>
</template>

<script>
import { ref, useFetch, useContext } from 'nuxt-composition-api'

export default {
  name: 'Post',
  setup() {
    const post = ref({})
    const latestPosts = ref([])
    const { $fetchPost, route, $fetchPosts } = useContext()

    useFetch(async () => {
      const responseOfPost = await $fetchPost(route.value.params.id)
      post.value = responseOfPost?.items?.[0] ?? {}

      const responseOfPosts = await $fetchPosts({
        publishStatus: '{"$in":[2]}',
        type: '{"$in":[1,4]}',
        // type: '{"$in":[4]}',
        maxResult: 3,
        page: 1,
        sort: '-published_at',
        showAuthor: false,
        showUpdater: false,
        showTag: false,
        showComment: false,
        showProject: false,
      })
      latestPosts.value = responseOfPosts?.items ?? []
    })

    return {
      post,
      latestPosts,
    }
  },
}
</script>

<style lang="scss" scoped>
.post-page {
  padding-top: 68.63px;
  overflow: hidden;
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
    p {
      margin-top: 30px;
      margin-bottom: 30px;
      @include word-wrap;
      @include media-breakpoint-up(md) {
        margin-top: 34px;
        margin-bottom: 34px;
      }
    }
    blockquote {
      background-color: rgba(245, 235, 255, 0.2);
      font-weight: 500;
      font-size: 15px;
      line-height: 2;
      letter-spacing: 0.6px;
      padding: 20px 30px 30px 30px;
      margin: 30px auto;
      max-width: 600px;
      @media (min-width: 600px) {
        border-radius: 2px;
      }
      @include media-breakpoint-up(md) {
        font-size: 18px;
        line-height: 1.8;
        letter-spacing: 2.5px;
        padding-left: 50px;
        padding-right: 50px;
        padding-bottom: 35px;
      }
      &::before {
        content: url(~assets/quotation-mark.svg);
        display: block;
        text-align: center;
        // 11 = 30 - 19
        margin-bottom: 11px;
        @include media-breakpoint-up(md) {
          margin-bottom: 13px;
        }
      }
    }
    a {
      color: #04295e;
      border-bottom: 1px solid #04295e;
    }
    .readme-image,
    .readme-embed {
      margin: 40px auto;
      max-width: 600px;
      @include media-breakpoint-up(md) {
        margin-top: 30px;
        margin-bottom: 30px;
      }
    }
    .readme-image {
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
    ul,
    ol {
      font-weight: 500;
      font-size: 15px;
      line-height: 1.8;
      letter-spacing: 0.6px;
      margin: 40px 30px;
      max-width: 500px;
      @media (min-width: 560px) {
        margin-left: auto;
        margin-right: auto;
      }
      @include media-breakpoint-up(md) {
        font-size: 18px;
        letter-spacing: 2.5px;
      }
      li {
        position: relative;
        padding-left: 30px;
        margin-top: 12px;
        margin-bottom: 12px;
        @include media-breakpoint-up(md) {
          padding-left: 40px;
        }
        &::before {
          display: block;
          position: absolute;
        }
      }
    }
    ul {
      li {
        &::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #04295e;
          left: 9px;
          // (15 * 1.8 - 6) / 2
          top: 10.5px;
          @include media-breakpoint-up(md) {
            width: 8px;
            height: 8px;
            left: 14px;
            // (18 * 1.8 - 8) / 2
            top: 12.2px;
          }
        }
      }
    }
    ol {
      counter-reset: num;
      li {
        &::before {
          top: 0;
          left: 0;
          counter-increment: num;
          content: counter(num) '.';
          width: 24px;
          text-align: center;
          @include media-breakpoint-up(md) {
            width: 36px;
          }
        }
      }
    }
    hr {
      display: none;
    }
  }
}

.latest-posts {
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 50px;
  max-width: 600px;
  @media (min-width: 620px) {
    margin-left: auto;
    margin-right: auto;
  }
  @include media-breakpoint-up(md) {
    margin-bottom: 22px;
  }
  h2 {
    background-color: #f5ebff;
    border-radius: 2px;
    text-align: center;
    color: #04295e;
    font-weight: 900;
    font-size: 18px;
    line-height: 1.5;
    padding: 8px 24px;
    margin-bottom: 14px;
  }
  div {
    letter-spacing: 5px;
    // to offset letter-spacing at the rightmost
    margin-left: 2.5px;
  }
}
</style>
