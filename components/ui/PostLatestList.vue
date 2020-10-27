<template>
  <div class="latest-list">
    <article class="latest-list__main">
      <a :href="$getHref(postMain)" target="_blank" @click="$emit('sendGaEvt')">
        <div class="img-wrapper">
          <img v-lazy="$getImage(postMain)" alt="" />
        </div>
        <h1>{{ postMain.title }}</h1>
        <span class="date">{{ $getFormattedDate(postMain.publishedAt) }}</span>
      </a>
    </article>

    <UiPostList
      :posts="postsSub"
      class="latest-list__sub"
      @sendGaEvt="$emit('sendGaEvt')"
    />
  </div>
</template>

<script>
export default {
  name: 'PostLatestList',
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
}
</script>

<style lang="scss" scoped>
.latest-list {
  @include media-breakpoint-up(md) {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    &__sub {
      width: calc((100% - 38px) * 0.48);
    }
  }
  &__main {
    text-align: center;
    margin-bottom: 20px;
    @include media-breakpoint-up(md) {
      width: calc((100% - 38px) * 0.52);
    }
  }
}
a {
  display: block;
}

.img-wrapper {
  padding-top: 50%;
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
.date {
  font-size: 13px;
  line-height: 1.4;
  color: rgba(#000, 0.66);
  margin-top: 12px;
  @include media-breakpoint-up(md) {
    margin-top: 25px;
    font-size: 15px;
  }
}
</style>
