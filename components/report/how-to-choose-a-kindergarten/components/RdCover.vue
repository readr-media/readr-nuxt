<template>
  <div class="cover">
    <div class="circle">
      <img
        width="100"
        height="100"
        src="~/assets/report/how-to-choose-a-kindergarten/bag-close.png"
        alt=""
      />
    </div>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <h1 class="htcak-h1" v-html="title"></h1>
    <p class="htcak-body description">{{ cmsData.description }}</p>
  </div>
</template>

<script>
export default {
  name: 'RdCover',

  props: {
    cmsData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },

  computed: {
    title() {
      return this.cmsData.title.replace(/\n/g, '<br />')
    },
  },
}
</script>

<style lang="scss" scoped>
.cover {
  background-color: var(--primary-color);
  text-align: center;
  padding: 48px 20px;
  color: #161616;
}

.circle {
  width: 150px;
  height: 150px;
  background-color: #fff;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  @include media-breakpoint-up(md) {
    width: 240px;
    height: 240px;
    margin-bottom: 24px;
  }
}

img {
  width: 100px;
  @include media-breakpoint-up(md) {
    width: 160px;
  }
}

h1 {
  margin-bottom: 16px;
}

.description {
  max-width: 480px;
  margin: 0 auto;
}
</style>
