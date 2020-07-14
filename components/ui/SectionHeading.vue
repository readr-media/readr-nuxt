<template>
  <div class="section-heading" :style="{ color }">
    <h2>{{ title }}</h2>

    <svg
      fill="none"
      width="110"
      height="59"
      viewBox="0 0 110 59"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g :fill="fill">
        <path
          d="m29.8707 58.7931c16.4971 0 29.8707-13.1613 29.8707-29.3966 0-16.2352-13.3736-29.3965-29.8707-29.3965s-29.8707 13.1613-29.8707 29.3965c0 16.2353 13.3736 29.3966 29.8707 29.3966z"
        />
        <path
          d="m80.1292 58.7931c16.4971 0 29.8708-13.1613 29.8708-29.3966 0-16.2352-13.3737-29.3965-29.8708-29.3965s-29.8707 13.1613-29.8707 29.3965c0 16.2353 13.3736 29.3966 29.8707 29.3966z"
        />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'SectionHeading',
  props: {
    title: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#04295e',
    },
    fill: {
      type: String,
      default: '#fff',
    },
  },
}
</script>

<style lang="scss" scoped>
.section-heading {
  position: relative;
}
h2 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  font-weight: 900;
  line-height: 1.5;
  letter-spacing: 5px;
  // to offset letter-spacing at the rightmost
  margin-left: 2.5px;

  @include media-breakpoint-up(md) {
    font-size: 24px;
  }
}
svg {
  margin-left: auto;
  margin-right: auto;
  @include media-breakpoint-up(md) {
    width: 134px;
    height: 71.87px;
  }
}
</style>
