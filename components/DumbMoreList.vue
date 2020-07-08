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

      <div class="load-more-wrapper">
        <button type="button">看更多</button>
        <svg
          fill="none"
          height="8"
          viewBox="0 0 13 8"
          width="13"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m6.9622 7.67246c-.39166.39736-1.03274.39736-1.4244 0l-5.187961-5.26348c-.622955-.63202-.175226-1.701977.712201-1.701977l10.37596.000001c.8874 0 1.3351 1.069956.7122 1.701976z"
            fill="#000928"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DumbMoreList',
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
  user-select: none;
  cursor: pointer;
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
.load-more-wrapper {
  text-align: center;
  margin-top: 20px;
  user-select: none;
  cursor: pointer;
  @include media-breakpoint-up(md) {
    margin-top: 26px;
  }
}
button {
  color: #000928;
  letter-spacing: 2.5px;
  // to offset letter-spacing at the rightmost
  margin-left: 1.75px;

  font-size: 15px;
  line-height: 1.5;
  font-weight: 700;
  margin-bottom: 8px;
}
svg {
  margin-left: auto;
  margin-right: auto;
}
</style>
