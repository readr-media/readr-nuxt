<template>
  <div class="html-content">
    <RdHtmlContentBlock
      v-for="(contentBlock, index) in showedContent"
      :key="index"
      :contentBlock="contentBlock"
      :class="{ only_one: assignOnlyOneClass(index) }"
    />
    <nobr
      v-if="!isToggled"
      class="html-content__read_more"
      @click="toggleHandler"
      >...閱讀更多</nobr
    >
  </div>
</template>

<script>
import RdHtmlContentBlock from './RdHtmlContentBlock.vue'
export default {
  components: {
    RdHtmlContentBlock,
  },
  props: {
    content: {
      type: Array,
      isRequired: true,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      isToggled: false,
    }
  },
  computed: {
    showedContent() {
      if (this.isToggled) {
        return this.content
      } else {
        const newContent = this.content.filter((contentBlock, index) => {
          return index < 1
        })

        return newContent
      }
    },
  },
  methods: {
    toggleHandler() {
      this.isToggled = !this.isToggled
    },
    assignOnlyOneClass(index) {
      return this.showedContent.length === 1 && index === 0
    },
  },
}
</script>

<style lang="scss" scoped>
.html-content {
  background: transparent;

  &__read_more {
    cursor: pointer;
    font-size: 18px;
    line-height: 200%;
    text-align: justify;
    color: #000928;
    opacity: 0.5;

    &:hover {
      opacity: 0.87;
    }

    &:active {
      opacity: 1;
    }
  }
}
</style>
