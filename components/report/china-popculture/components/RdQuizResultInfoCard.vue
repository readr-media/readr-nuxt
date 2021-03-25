<template>
  <div class="info-card">
    <div class="info-card__titles titles">
      <h1 v-text="title" />
      <h2 v-text="subtitle" />
    </div>
    <div class="info-card__descriptions descriptions">
      <p
        v-for="(description, i) in descriptions"
        :key="i"
        v-text="description"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    descriptions: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.info-card {
  width: 100%;
  background: #ffffff;
  border: 1.5px solid #111111;
  box-shadow: 0 2px 12px -4px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  padding: 16px 12px;
  text-align: center;
  &__descriptions {
    margin: 12px 0 0 0;
  }

  @include media-breakpoint-up(md) {
    padding: 32px;
  }
}

.titles {
  border-bottom: 1.5px solid #111111;
  padding: 0 0 16px 0;
  h1 {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #111111;
  }
  h2 {
    font-weight: 500;
    font-size: 24px;
    line-height: 36px;
    letter-spacing: 0.032em;
    color: #f50e0e;
    margin: 4px 0 0 0;
  }
}

.descriptions {
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  color: #111111;
}
</style>
