<template>
  <div class="tracked" :style="cssProps">
    <img
      v-show="trackedStatus === 'moving'"
      src="~/assets/imgs/report/follow-rule/tracked-walk.gif"
      class="tracked__walk"
    />
    <img
      v-show="trackedStatus === 'afraid'"
      src="~/assets/imgs/report/follow-rule/tracked-afraid.gif"
      class="tracked__walk"
    />
    <img
      v-show="trackedStatus === 'stand'"
      src="~/assets/imgs/report/follow-rule/tracked-stand.png"
      class="tracked__stand"
    />
  </div>
</template>

<script>
export default {
  props: {
    trackedStatus: {
      type: String,
      require: true,
      default: 'stand',
    },
    location: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  computed: {
    cssProps() {
      return {
        '--location': `${this.location}px`,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.tracked {
  margin: 5px 0;
  position: absolute;
  left: 0;
  transform: translate(calc(var(--location) - 25%), 0) !important;
}
</style>
