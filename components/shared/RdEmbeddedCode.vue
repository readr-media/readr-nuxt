<template>
  <div>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="embeddedCodeWithoutScript" />
  </div>
</template>

<script>
export default {
  name: 'RdEmbeddedCode',
  props: {
    content: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  computed: {
    caption() {
      return this.content?.caption ?? ''
    },
    scripts() {
      return this.content?.scripts ?? []
    },
    embeddedCodeWithoutScript() {
      return this.content?.embeddedCodeWithoutScript ?? ''
    },
  },
  mounted() {
    this.insertScriptsInBody()
  },
  methods: {
    insertScriptsInBody() {
      if (process.browser) {
        if (this.caption === 'reporter-scroll-video') {
          this.handleReporterScrollVideoScripts()
        } else {
          this.handleScripts()
        }
      }
    },
    handleReporterScrollVideoScripts() {
      const src1 = this.scripts?.[0]?.text ?? ''
      const src2 = this.scripts?.[0]?.attribs?.src ?? ''
      const s1 = document.createElement('script')
      s1.type = 'text/javascript'
      s1.async = true
      s1.appendChild(document.createTextNode(src1))
      document.head.appendChild(s1)
      // t.text = src2
      // document.head.appendChild(t)
      const s2 = document.createElement('script')
      s2.type = 'text/javascript'
      s2.crossorigin = true
      s2.src = src2
      document.body.appendChild(s2)
    },
    handleScripts() {
      this.scripts?.forEach((item) => {
        const src = item.attribs?.src ?? ''
        const s = document.createElement('script')
        s.setAttribute('src', src)
        document.body.appendChild(s)
      })
    },
  },
}
</script>
