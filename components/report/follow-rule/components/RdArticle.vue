<template>
  <article class="article">
    <section
      v-for="section in articleSections"
      :key="section.type"
      :id="`section-${section.type}`"
      :ref="`section`"
    >
      <RdArticleSection
        :loadScrollMagicScriptTimes="loadScrollMagicScriptTimes"
        :sectionArticle="section.value"
      />
    </section>
  </article>
</template>

<script>
/* global ScrollMagic */
/* eslint no-undef: "error" */
import RdArticleSection from './RdArticleSection.vue'

export default {
  components: {
    RdArticleSection,
  },
  props: {
    cmsData: {
      type: Object,
      default: () => {},
    },
    loadScrollMagicScriptTimes: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      contentGroup: [],
      sceneArray: [],
      heightArray: [],
    }
  },
  watch: {
    loadScrollMagicScriptTimes(times) {
      if (times === 4) this.addTagObserver()
    },
  },

  computed: {
    viewportHeight() {
      return this.$store.getters[
        ('viewport/viewportHeight', 'viewport/viewportWidth')
      ]
    },
    articleSections() {
      return this.cmsData.contentApiData.article
    },
  },

  methods: {
    sendGaEvent({ action, label }) {
      this.$ga.event('projects', action, label)
    },
    addTagObserver() {
      // const triggerHook = 90 / this.viewportHeight
      this.$refs.section.map((target) =>
        this.heightArray.push(target.clientHeight)
      )
      const controller = new ScrollMagic.Controller({
        globalSceneOptions: {
          triggerHook: 0.4,
          reverse: true,
        },
      })
      for (let i = 0; i < this.articleSections.length; i++) {
        this.sceneArray[i] = new ScrollMagic.Scene({
          duration: this.heightArray[i],
          triggerElement: `#section-${i + 1}`,
        })
          .on('enter', (e) => this.$emit('chaneParagraph', i + 1))
          .addTo(controller)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.article {
  padding: 48px 20px;
  color: #000000;
  background-color: rgba(254, 234, 223, 1);
  @include media-breakpoint-up(md) {
    padding: 48px 100px;
  }
  @include media-breakpoint-up(xl) {
    padding: 60px 100px;
  }
}
</style>
