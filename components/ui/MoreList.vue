<template>
  <div class="more-list">
    <h3 v-if="topic">{{ topic }}</h3>
    <div class="list-wrapper">
      <ul>
        <li v-for="post in posts" :key="post.id">
          <article>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <picture>
                <img :src="post.heroImage" alt="" />
              </picture>
              <div class="text-wrapper">
                <h1>{{ post.title }}</h1>
                <div class="date">{{ post.publishedAt }}</div>
              </div>
            </a>
          </article>
        </li>
      </ul>

      <!-- <UiLoadMore class="more-list__load-more" /> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'MoreList',
  props: {
    topic: {
      type: String,
      default: '',
    },
    posts: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
// .more-list {
//   &__load-more {
//     margin-top: 20px;
//     @include media-breakpoint-up(md) {
//       margin-top: 26px;
//     }
//   }
// }
h3 {
  color: #000928;
  letter-spacing: 2.8px;
  font-size: 24px;
  font-weight: 900;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 18px;
  @include media-breakpoint-up(md) {
    font-size: 32px;
    letter-spacing: 3.75px;
  }
}
.list-wrapper {
  background-color: #fff;
  border-radius: 2px;
  padding: 16px 15px 18px 15px;
  @include media-breakpoint-up(md) {
    padding: 26px 25px 29px 25px;
  }
}
li + li {
  margin-top: 18px;
}
a {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
picture {
  position: relative;
  width: calc((100% - 16px) * 0.49);
  // 0.33 = 0.49 * 0.67
  padding-top: calc((100% - 16px) * 0.33);
  border-radius: 2px;
  overflow: hidden;
  @include media-breakpoint-up(md) {
    width: calc((100% - 16px) * 0.44);
    // 0.29 = 0.44 * 0.67
    padding-top: calc((100% - 16px) * 0.29);
  }
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
  width: calc((100% - 16px) * 0.51);
  @include media-breakpoint-up(md) {
    width: calc((100% - 16px) * 0.56);
  }
}
h1 {
  font-weight: 700;
  font-size: 15px;
  line-height: 1.5;
  color: rgba(#000, 0.87);
  word-wrap: break-word;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.date {
  font-size: 13px;
  color: rgba(#000, 0.66);
  line-height: 1.4;
  margin-top: 10px;
}
</style>
