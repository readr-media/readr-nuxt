<template>
  <div class="cover">
    <div class="cover__wrapper">
      <div class="cover__subtitle">{{ contents.subtitle }}</div>
      <div class="cover__title">{{ contents.title }}</div>
      <RdUiContinueUpdate />
      <div class="cover__description">{{ contents.description }}</div>
      <div class="cover__bookmarts">
        <div v-for="bookmart in contents.bookmarts" :key="bookmart.slug">
          <RdUiBookmart :bookmart="bookmart" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RdUiContinueUpdate from './RdUiContinueUpdate'
import RdUiBookmart from './RdUiBookmart'
export default {
  components: {
    RdUiContinueUpdate,
    RdUiBookmart,
  },
  props: {
    contents: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="scss" scoped>
.cover {
  padding: 24px 16px;
  @include media-breakpoint-up(md) {
    padding: 60px 16px;
  }
  &__wrapper {
    max-width: 1120px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__subtitle {
    font-weight: bold;
    font-size: 24px;
    line-height: 35px;
    color: #000928;
    opacity: 0.3;
    margin: 0 0 4px 0;
    @include media-breakpoint-up(md) {
      font-size: 36px;
      line-height: 60px;
    }
  }
  &__title {
    font-weight: bold;
    font-size: 32px;
    line-height: 150%;
    color: #bf6d28;
    margin: 0 0 24px 0;
    @include media-breakpoint-up(md) {
      margin: 0 0 32px 0;
      font-size: 60px;
      line-height: 72px;
    }
  }
  &__description {
    max-width: 640px;
    font-size: 18px;
    line-height: 200%;
    color: #000928;
    @include media-breakpoint-up(md) {
      color: #333333;
    }
  }
  &__bookmarts {
    padding: 28px 36px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    @include media-breakpoint-up(md) {
      flex-direction: row;
      padding: 36px 0;
    }
  }
}
</style>
