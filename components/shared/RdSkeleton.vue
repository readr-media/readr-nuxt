<template>
  <div>
    <div
      v-for="n in 4"
      :key="`skeleton${n}`"
      class="category__post post-skeleton"
    >
      <div class="post-skeleton__picture" />
      <div class="post-skeleton__title" />
      <div class="post-skeleton__title" />
      <div class="post-skeleton__title post-skeleton__title--last" />
      <div class="post-skeleton__date" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'RdSkeleton',
}
</script>

<style lang="scss" scoped>
.post-skeleton {
  overflow-anchor: none;

  &__picture {
    padding-top: 50%;
    margin-bottom: 12px;
    background-image: linear-gradient(
      270deg,
      rgba(196, 196, 196, 0.2) 0%,
      rgba(196, 196, 196, 0.3) 27.08%,
      rgba(196, 196, 196, 0.3) 64.06%,
      rgba(196, 196, 196, 0.2) 100%
    );
  }

  &__title {
    height: 20px;
    margin-bottom: 6px;
    background-image: linear-gradient(
      270deg,
      rgba(196, 196, 196, 0.2) 0%,
      rgba(196, 196, 196, 0.3) 33.85%,
      rgba(196, 196, 196, 0.3) 57.29%,
      rgba(196, 196, 196, 0.2) 100%
    );

    &--last {
      margin-bottom: 24px;
      width: 52.4%;
    }
  }

  &__date {
    margin: 0 auto;
    width: 90px;
    height: 16px;
    background-image: linear-gradient(
      270deg,
      rgba(196, 196, 196, 0.3) 0%,
      rgba(196, 196, 196, 0.2) 100%
    );
  }
}
</style>
