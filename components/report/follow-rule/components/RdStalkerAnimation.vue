<template>
  <div class="stalker" :style="cssProps">
    <img
      v-show="stalkerStatus === 'moving'"
      src="../../../../assets/imgs/report/follow-rule/stalker-run.gif"
      class="stalker__walk"
    />
    <img
      v-show="stalkerStatus === 'stand'"
      src="../../../../assets/imgs/report/follow-rule/stalker-stand.png"
      class="stalker__stand"
    />
    <img
      v-show="stalkerStatus === 'back'"
      src="../../../../assets/imgs/report/follow-rule/stalker-back.gif"
      class="stalker__stand"
    />
  </div>
</template>

<script>
export default {
  props: {
    stalkerStatus: {
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
.stalker {
  margin: 5px 0;
  transform: translate(var(--location), 0) !important;
}
</style>
