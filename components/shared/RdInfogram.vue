<template>
  <div
    class="infogram-embed"
    :data-id="chartId"
    data-type="interactive"
    :data-title="title"
  />
</template>

<script>
export default {
  name: 'RdInfogram',

  props: {
    chartId: {
      type: String,
      required: true,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },

  mounted() {
    /* eslint-disable no-var, one-var, no-unused-expressions, no-sequences */
    !(function (e, i, n, s) {
      var t = 'InfogramEmbeds',
        d = e.getElementsByTagName('script')[0]
      if (window[t] && window[t].initialized)
        window[t].process && window[t].process()
      else if (!e.getElementById(n)) {
        var o = e.createElement('script')
        ;(o.async = 1),
          (o.id = n),
          (o.src = 'https://e.infogram.com/js/dist/embed-loader-min.js'),
          d.parentNode.insertBefore(o, d)
      }
    })(document, 0, 'infogram-async')
  },
}
</script>
