<template>
  <div class="flourish-wrapper">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <h1 class="flourish-wrapper__title title" v-html="title" />
    <div
      :id="`${chartId}`"
      class="flourish-wrapper__flourish-embed flourish-embed"
      :data-src="`visualisation/${chartId}`"
    />
    <p class="flourish-wrapper__info info" v-text="info" />
  </div>
</template>

<script>
export default {
  name: 'RdFlourish',
  props: {
    chartId: {
      type: String,
      required: true,
      default: '',
    },
    title: {
      type: String,
      required: true,
      default: '',
    },
    info: {
      type: String,
      required: true,
      default: '',
    },
  },
  mounted() {
    /*
    if (!document.getElementById(`flourish-async-${this.chartId}`)) {
      console.log('fetch flourish js')
      const d = document.getElementsByTagName('script')[0]
      const o = document.createElement('script')
      o.async = true
      o.id = `flourish-async-${this.chartId}`
      o.src = 'https://public.flourish.studio/resources/embed.js'
      d.parentNode.insertBefore(o, d)
    }
    */
    console.log('chartId', this.chartId)
    const d = document.getElementById(this.chartId)
    const o = document.createElement('script')
    o.async = true
    o.id = `flourish-async-${this.chartId}`
    o.src = 'https://public.flourish.studio/resources/embed.js'

    if (window.chartCount) {
      window.chartCount += 1
      if (window.chartCount === 2) {
        d.appendChild(o)
      }
    } else {
      window.chartCount = 1
    }
  },
}
</script>
