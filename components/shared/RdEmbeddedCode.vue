<template>
  <div
    ref="embeddedcode"
    class="embeddedcode"
    :class="{ 'full-height': caption === 'reporter-scroll-video' }"
  >
    <LazyRenderer
      v-if="!shouldEmbedImmediately"
      @load="insertScriptsInBody(embeddedCode)"
    >
      <p v-if="caption" class="caption">{{ caption }}</p>
    </LazyRenderer>
    <p v-if="shouldEmbedImmediately && caption" class="caption">
      {{ caption }}
    </p>
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
    articleType: {
      type: String,
      default: '',
    },
  },
  computed: {
    caption() {
      return this.content?.caption ?? ''
    },
    embeddedCode() {
      return this.content?.embeddedCode ?? ''
    },
    isFlourish() {
      return this.embeddedCode?.includes('flourish')
    },
    shouldEmbedImmediately() {
      return this.isFlourish || this.articleType === 'scrollablevideo'
    },
  },
  mounted() {
    if (this.shouldEmbedImmediately) {
      this.insertScriptsInBody(this.embeddedCode)
    }
  },
  methods: {
    insertScriptsInBody(embeddedCode) {
      const fragment = document.createDocumentFragment()

      const parser = new DOMParser()
      const embeddedCodeString = `<div id="draft-embed">${embeddedCode}</div>`
      const ele = parser.parseFromString(embeddedCodeString, 'text/html')

      const scripts = ele.querySelectorAll('script')
      const nonScripts = ele.querySelectorAll('div#draft-embed > :not(script)')

      nonScripts.forEach((ele) => {
        fragment.appendChild(ele)
      })

      scripts.forEach((s) => {
        const scriptEle = document.createElement('script')
        const attrs = s.attributes
        for (let i = 0; i < attrs.length; i++) {
          scriptEle.setAttribute(attrs[i].name, attrs[i].value)
        }
        scriptEle.text = s.text || ''
        fragment.appendChild(scriptEle)
      })

      this.$refs.embeddedcode.appendChild(fragment)
    },
  },
}
</script>

<style lang="scss" scoped>
.full-height {
  position: relative;
  z-index: 1000;
}
.caption {
  margin-top: 10px;
  color: rgba(#000, 0.498);
  font-size: 15px;
  line-height: 1.7;
  opacity: 0;
}
</style>
