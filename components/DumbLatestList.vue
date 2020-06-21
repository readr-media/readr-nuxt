<template>
  <div class="latest-list">
    <article class="latest-list__main">
      <a :href="getHref(postMain)" target="_blank">
        <picture>
          <img :src="getImage(postMain)" alt="" />
        </picture>
        <h1>{{ postMain.title }}</h1>
        <span class="date">{{ getFormattedDate(postMain.publishedAt) }}</span>
      </a>
    </article>

    <ul>
      <li v-for="post in postsSub" :key="post.id" class="latest-list__sub">
        <article>
          <a :href="getHref(post)" target="_blank">
            <picture>
              <img :src="getImage(post)" alt="" />
            </picture>
            <div class="text-wrapper">
              <h1>{{ post.title }}</h1>
              <div class="date">
                {{ getFormattedDate(postMain.publishedAt) }}
              </div>
            </div>
          </a>
        </article>
      </li>
    </ul>
  </div>
</template>

<script>
import defaultImage from '~/assets/og-image.jpg'

export default {
  name: 'DumbLatestList',
  props: {
    postMain: {
      type: Object,
      default: () => ({}),
      required: true,
    },
    postsSub: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  methods: {
    getImage({ heroImage, ogImage } = {}) {
      return heroImage || ogImage || defaultImage
    },
    getHref({ type, id, slug }) {
      switch (type) {
        case 1:
          return `/post/${id}`
        case 4:
          return `/project/${slug}`
        default:
          return undefined
      }
    },
    getFormattedDate(datetime = '') {
      return this.$dayjs(datetime).format('MMM D, YYYY')
    },
  },
}
</script>

<style lang="scss" scoped>
.latest-list {
  @include media-breakpoint-up(md) {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  &__main {
    text-align: center;
    margin-bottom: 20px;
    @include media-breakpoint-up(md) {
      width: calc((100% - 38px) * 0.52);
    }
    h1 {
      color: #000928;
      font-weight: 900;
      font-size: 18px;
      line-height: 1.5;
      margin-top: 10px;
      @include media-breakpoint-up(md) {
        font-size: 24px;
        letter-spacing: 5px;
        margin-top: 20px;
      }
    }
    a {
      display: block;
    }
    picture {
      padding-top: 50%;
    }
    .date {
      @include media-breakpoint-up(md) {
        margin-top: 25px;
      }
    }
  }
  ul {
    @include media-breakpoint-up(md) {
      width: calc((100% - 38px) * 0.48);
    }
  }
  &__sub {
    h1 {
      font-weight: 700;
      font-size: 15px;
      line-height: 1.5;
      color: rgba(#000, 0.87);
      @include media-breakpoint-up(md) {
        font-size: 18px;
      }
    }
    a {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    picture {
      width: calc((100% - 14px) * 0.36);
      padding-top: calc((100% - 14px) * 0.18);
      @include media-breakpoint-up(md) {
        width: calc((100% - 24px) * 0.32);
        padding-top: calc((100% - 24px) * 0.16);
      }
    }
    .text-wrapper {
      width: calc((100% - 14px) * 0.64);
      @include media-breakpoint-up(md) {
        width: calc((100% - 24px) * 0.68);
      }
    }
    .date {
      @include media-breakpoint-up(md) {
        margin-top: 20px;
      }
    }
    + .latest-list__sub {
      margin-top: 18px;
      @include media-breakpoint-up(md) {
        margin-top: 24px;
      }
    }
  }
}
a {
  user-select: none;
  cursor: pointer;
}
picture {
  display: block;
  position: relative;
}
img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
h1 {
  letter-spacing: 2.5px;
  word-wrap: break-word;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.date {
  font-size: 13px;
  line-height: 1.4;
  color: rgba(#000, 0.66);
  margin-top: 12px;
  @include media-breakpoint-up(md) {
    font-size: 15px;
  }
}
</style>
