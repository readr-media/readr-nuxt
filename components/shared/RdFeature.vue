<template>
  <div class="feature">
    <ul>
      <li v-for="(item, i) in posts" :key="item.id" :class="{ first: i === 0 }">
        <RdFeatureCard
          :href="item.href"
          :img="item.img.src"
          :title="item.title"
          :subtitle="item.subtitle"
          :description="item.description"
          :isFirst="i === 0"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import RdFeatureCard from '~/components/shared/RdFeatureCard.vue'

export default {
  name: 'RdFeature',

  components: {
    RdFeatureCard,
  },
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.feature {
  ul {
    width: 100%;
    @include media-breakpoint-up(md) {
      display: flex;
      flex-wrap: wrap;
    }
    li {
      width: 100%;
      @include media-breakpoint-up(md) {
        width: 50%;
      }
      @include media-breakpoint-up(xl) {
        width: calc(100% / 3);
      }
      &.first {
        @include media-breakpoint-up(xl) {
          width: 100%;
        }
      }
    }
  }
}
</style>
