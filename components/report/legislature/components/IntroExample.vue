<template>
  <section>
    <img
      :src="
        require(`~/assets/imgs/report/legislature/intro/example/${pictureId}.png`)
      "
    />
    <div class="example" :style="cssProps">
      <div class="example__description">{{ description }}</div>
      <div class="example__lawname">{{ lawName }}</div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    pictureId: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    lawName: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
  },
  computed: {
    cssProps() {
      return {
        '--background-color': this.color,
      }
    },
    imgSrc() {
      return `~/assets/imgs/report/legislature/intro/example/${this.pictureId}.png`
    },
  },
}
</script>

<style lang="scss" scoped>
.example {
  margin-top: 8px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
  background: var(--background-color);
  width: 185px;
  padding: 6px;
  &__lawname {
    margin-top: 24px;
  }
}
</style>
