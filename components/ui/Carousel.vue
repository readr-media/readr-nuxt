<template>
  <div class="carousel">
    <div class="heading-wrapper">
      <slot name="heading" />
    </div>

    <article>
      <a :href="activePost.link" target="_blank" @click="$emit('sendGaEvt')">
        <div class="title-wrapper">
          <h1
            v-for="(post, idx) in posts"
            :key="post.id"
            :class="{ active: shouldActive(idx) }"
          >
            {{ post.name }}
          </h1>
          <SvgDialogBox class="dialog-box" />
        </div>
        <div class="img-wrapper">
          <img
            v-for="(post, idx) in posts"
            :key="post.id"
            :src="heroImage(post)"
            :class="{ active: shouldActive(idx) }"
            alt=""
          />
        </div>
      </a>
    </article>

    <div
      v-for="(post, idx) in posts"
      :key="post.id"
      :style="{ backgroundImage: `url(${heroImage(post)})` }"
      :class="{ active: shouldActive(idx) }"
      class="bg bg--img"
    />
    <div class="bg bg--color" />

    <div
      v-if="shouldOpenArrow"
      class="arrow-wrapper arrow-wrapper--prev"
      @click="toPrevPost"
    >
      <SvgArrowPrev />
    </div>
    <div
      v-if="shouldOpenArrow"
      class="arrow-wrapper arrow-wrapper--next"
      @click="toNextPost"
    >
      <SvgArrowNext />
    </div>
  </div>
</template>

<script>
import SvgDialogBox from '~/assets/dialog-box.svg?inline'
import SvgArrowPrev from '~/assets/arrow-prev.svg?inline'
import SvgArrowNext from '~/assets/arrow-next.svg?inline'
import defaultImgPost from '~/assets/default/post.svg'

export default {
  name: 'Carousel',
  components: {
    SvgDialogBox,
    SvgArrowPrev,
    SvgArrowNext,
  },
  props: {
    posts: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      activePostIdx: 0,
      timeoutIdOfAutoToNextPost: undefined,
    }
  },
  computed: {
    activePost() {
      return this.posts[this.activePostIdx]
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
  beforeDestroy() {
    this.stopAutoToNextPost()
  },
  methods: {
    shouldActive(idx) {
      return idx === this.activePostIdx
    },
    toPrevPost() {
      this.stopAutoToNextPost()

      const hasReachedTheBeginning = this.activePostIdx <= 0
      if (!hasReachedTheBeginning) {
        this.activePostIdx -= 1
      } else {
        const theLastPostIdx = this.totalPosts - 1
        this.activePostIdx = theLastPostIdx
      }

      this.startAutoToNextPost()
    },
    toNextPost() {
      this.stopAutoToNextPost()

      const hasReachedTheEnd = this.activePostIdx >= this.totalPosts - 1
      if (!hasReachedTheEnd) {
        this.activePostIdx += 1
      } else {
        const theFirstPostIdx = 0
        this.activePostIdx = theFirstPostIdx
      }

      this.startAutoToNextPost()
    },
    startAutoToNextPost() {
      this.timeoutIdOfAutoToNextPost = setTimeout(this.toNextPost, 3000)
    },
    stopAutoToNextPost() {
      clearTimeout(this.timeoutIdOfAutoToNextPost)
    },
    heroImage({ heroImage = {} }) {
      return heroImage?.urlTabletSized || defaultImgPost
    },
  },
}
</script>

<style lang="scss" scoped>
.carousel {
  position: relative;
  padding-top: 20px;
  @include media-breakpoint-up(md) {
    padding-top: 30px;
    overflow: hidden;
  }
}
.heading-wrapper {
  margin-bottom: 20px;
  @include media-breakpoint-up(md) {
    margin-bottom: 30px;
  }
}
article {
  padding-right: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
  @include media-breakpoint-up(md) {
    padding-right: 0px;
    padding-left: 0px;
    padding-bottom: 30px;
  }
}
a {
  display: block;
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
  display: flex;
  align-items: center;
  // 24 * 1.5 * 3
  min-height: 108px;
  @include media-breakpoint-up(md) {
    border-left: none;
    padding-left: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
    width: calc((100% - 66px) * 0.32);
    order: 2;
    position: relative;
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
  opacity: 0;
  position: absolute;
  transition: none;
  @include media-breakpoint-up(md) {
    font-size: 36px;
    letter-spacing: 5.4px;
  }
  &.active {
    opacity: 1;
    position: relative;
    transition: opacity 2.1s;
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

.img-wrapper {
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
  opacity: 0;
  transition: none;
  &.active {
    opacity: 1;
    transition: opacity 2.1s;
  }
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
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0;
    transition: none;
    // fix transition flickering for Safari
    transform: translate3d(0, 0, 0);

    &.active {
      opacity: 0.2;
      transition: opacity 2.1s;
    }
  }
  &--color {
    background-color: #ebf02c;
    @include media-breakpoint-up(md) {
      height: 78.49%;
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
  &:active ::v-deep {
    circle {
      fill: #000928;
    }
  }
  svg {
    position: absolute;
    width: 36px;
    height: 36px;
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
    svg {
      right: 0;
    }
  }
  &--next {
    right: 0;
    svg {
      left: 0;
    }
  }
}
</style>
