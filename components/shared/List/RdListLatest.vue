<template>
  <div class="list-latest">
    <article class="list-latest__main">
      <a :href="postMain.href" target="_blank" @click="$emit('sendGaEvent')">
        <div class="img-wrapper">
          <img v-lazy="postMain.img.src" :alt="postMain.img.alt" />
        </div>
        <h1>{{ postMain.title }}</h1>
        <span class="date">{{ postMain.date }}</span>
      </a>
    </article>

    <RdList
      :posts="postsSub"
      class="list-latest__sub"
      @sendGaEvent="$emit('sendGaEvent')"
    />
  </div>
</template>

<script>
import RdList from '~/components/shared/List/RdList.vue'

export default {
  name: 'RdListLatest',

  components: {
    RdList,
  },

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
.list-latest {
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
