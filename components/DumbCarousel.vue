<template>
  <div class="carousel">
    <div class="heading-wrapper">
      <slot name="heading" />
    </div>

    <div
      class="posts-wrapper"
      :class="{ transitioned: isTransitioning }"
      :style="{ transform: `translate3d(${translateX}, 0, 0)` }"
      @transitionend="updateRenderedPosts"
      @webkitTransitionEnd="updateRenderedPosts"
      @oTransitionEnd="updateRenderedPosts"
    >
      <!-- 當 posts prop 只有兩篇文章時，會出現 duplicate keys 的錯誤，故綁定 idx，以提供唯一 key -->
      <article v-for="(post, idx) in renderedPosts" :key="`${post.id}--${idx}`">
        <a :href="post.link" target="_blank">
          <div class="title-wrapper">
            <h1>{{ post.title }}</h1>
            <svg
              class="dialog-box"
              width="348"
              height="187"
              viewBox="0 0 348 187"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 0V144.48H30.36V186.64L90.16 144.48H348V133.482H83.72L42.32 161.894V133.482H11.04V0H0Z"
                fill="#000928"
              />
            </svg>
          </div>
          <picture>
            <img :src="getImage(post)" alt="" />
          </picture>
        </a>

        <div
          class="bg bg--img"
          :style="{ backgroundImage: `url(${getImage(post)})` }"
        />
        <div class="bg bg--color" />
      </article>
    </div>

    <div
      v-if="shouldOpenArrow"
      class="arrow-wrapper arrow-wrapper--prev"
      @click="toPrevPost"
    >
      <DumbCarouselArrowLeft />
    </div>
    <div
      v-if="shouldOpenArrow"
      class="arrow-wrapper arrow-wrapper--next"
      @click="toNextPost"
    >
      <DumbCarouselArrowRight />
    </div>
  </div>
</template>

<script>
import defaultImage from '~/assets/og-image.jpg'

export default {
  name: 'DumbCarousel',
  props: {
    posts: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      x: 1,
      currentPostIdx: 0,
      isTransitioning: false,
      timeoutIdOfAutoToNextPost: undefined,
    }
  },
  computed: {
    renderedPosts() {
      if (this.hasOnlyOnePost) {
        return [this.posts[this.currentPostIdx]]
      }

      let prevPostIdx = this.currentPostIdx - 1
      const doesPrevExceedTheFirst = prevPostIdx < 0
      if (doesPrevExceedTheFirst) {
        const lastPostIdx = this.totalPosts - 1
        prevPostIdx = lastPostIdx
      }

      let nextPostIdx = this.currentPostIdx + 1
      const doesNextExceedTheLast = nextPostIdx >= this.totalPosts
      if (doesNextExceedTheLast) {
        const firstPostIdx = 0
        nextPostIdx = firstPostIdx
      }

      return [
        this.posts[prevPostIdx],
        this.posts[this.currentPostIdx],
        this.posts[nextPostIdx],
      ]
    },
    translateX() {
      if (this.hasOnlyOnePost) {
        return 0
      }

      return `${this.x * -100}%`
    },
    totalPosts() {
      return this.posts.length
    },
    hasOnlyOnePost() {
      return this.totalPosts === 1
    },
    shouldOpenArrow() {
      return !this.hasOnlyOnePost
    },
  },
  mounted() {
    if (!this.hasOnlyOnePost) {
      this.startAutoToNextPost()
    }
  },
  methods: {
    toPrevPost() {
      if (this.isTransitioning) {
        return
      }

      this.stopAutoToNextPost()

      this.x -= 1
      this.isTransitioning = true
    },
    toNextPost() {
      if (this.isTransitioning) {
        return
      }

      this.stopAutoToNextPost()

      this.x += 1
      this.isTransitioning = true
    },
    updateRenderedPosts() {
      this.isTransitioning = false

      switch (this.x) {
        case 0: {
          const doesCurrentReachTheFirst = this.currentPostIdx <= 0
          if (doesCurrentReachTheFirst) {
            const lastPostIdx = this.totalPosts - 1
            this.currentPostIdx = lastPostIdx
            break
          }

          this.currentPostIdx -= 1
          break
        }
        case 2: {
          const doesCurrentReachTheLast =
            this.currentPostIdx >= this.totalPosts - 1
          if (doesCurrentReachTheLast) {
            const firstPostIdx = 0
            this.currentPostIdx = firstPostIdx
            break
          }

          this.currentPostIdx += 1
          break
        }
      }

      this.x = 1

      this.startAutoToNextPost()
    },
    startAutoToNextPost() {
      this.timeoutIdOfAutoToNextPost = setTimeout(() => {
        this.x += 1
        this.isTransitioning = true
      }, 2000)
    },
    stopAutoToNextPost() {
      clearTimeout(this.timeoutIdOfAutoToNextPost)
    },
    getImage({ image } = {}) {
      return image || defaultImage
    },
  },
}
</script>

<style lang="scss" scoped>
.carousel {
  position: relative;
  overflow: hidden;
}
.heading-wrapper {
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #ebf02c;
  @include media-breakpoint-up(md) {
    padding-top: 30px;
    padding-bottom: 30px;
  }
}
.posts-wrapper {
  display: flex;
  align-items: flex-start;
  &.transitioned {
    transition: transform 0.45s;
  }
}
article {
  padding-right: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
  position: relative;
  overflow: hidden;
  flex: 0 0 100%;
  @include media-breakpoint-up(md) {
    padding-right: 0px;
    padding-left: 0px;
    padding-bottom: 30px;
  }
}
a {
  display: block;
  user-select: none;
  cursor: pointer;
  @include media-breakpoint-up(md) {
    display: flex;
    max-width: 1096px;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between;
    align-items: flex-start;
  }
}
.title-wrapper {
  border-left: 10px solid #000928;
  padding-left: 10px;
  margin-bottom: 25px;
  margin-left: -10px;
  @include media-breakpoint-up(md) {
    border-left: none;
    padding-left: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
    width: calc((100% - 66px) * 0.32);
    order: 2;
    position: relative;
    display: flex;
    align-items: center;
    // 36 * 1.5 * 3
    min-height: 162px;
  }
}
h1 {
  font-size: 24px;
  line-height: 1.5;
  color: #000928;
  font-weight: 900;
  word-wrap: break-word;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  @include media-breakpoint-up(md) {
    font-size: 36px;
    letter-spacing: 5.4px;
  }
}
.dialog-box {
  display: none;
  @include media-breakpoint-up(md) {
    display: block;
    position: absolute;
    top: 52px;
    left: -36px;
  }
}
picture {
  display: block;
  position: relative;
  padding-top: 50%;
  @include media-breakpoint-up(md) {
    width: calc((100% - 66px) * 0.68);
    padding-top: calc((100% - 66px) * 0.34);
    order: 1;
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
.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 25vw + 8px);
  z-index: -1;
  &--img {
    height: 100%;
    opacity: 0.2;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  &--color {
    background-color: #ebf02c;
    @include media-breakpoint-up(md) {
      height: 71.58%;
    }
  }
}
.arrow-wrapper {
  position: absolute;
  top: 0;
  // 41 = 36 + 5
  width: 41px;
  height: 100%;
  cursor: pointer;
  user-select: none;
  @include media-breakpoint-up(md) {
    // 86 = 60 + 26
    width: 86px;
  }
  & svg {
    position: absolute;
    // 20px + ((100vw - 20px * 2) / 2 / 2) - 18px
    bottom: calc(25vw - 8px);
    @include media-breakpoint-up(md) {
      width: 60px;
      height: 60px;
      // (30px + 72px + 30px) + (100% - (30px + 72px + 30px) - 30px) / 2 - 30px
      top: calc(21px + 50%);
    }
  }
  &--prev {
    left: 0;
    & svg {
      right: 0;
    }
  }
  &--next {
    right: 0;
    & svg {
      left: 0;
    }
  }
}
</style>
