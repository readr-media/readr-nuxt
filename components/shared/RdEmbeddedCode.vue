<template>
  <div>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="embeddedCodeWithoutScript" />
  </div>
</template>

<script>
export default {
  name: 'UiEmbeddedCode',
  props: {
    content: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  computed: {
    scripts() {
      return this.content?.scripts ?? []
    },
    embeddedCodeWithoutScript() {
      return this.content?.embeddedCodeWithoutScript ?? ''
    },
  },
  mounted() {
    this.insertScriptsInBody(this.scripts)
  },
  methods: {
    insertScriptsInBody(scripts) {
      if (process.browser) {
        scripts.forEach((item) => {
          const src = item.attribs?.src ?? ''
          const s = document.createElement('script')
          s.setAttribute('src', src)
          document.body.appendChild(s)
        })
      }
    },
  },
}
</script>
