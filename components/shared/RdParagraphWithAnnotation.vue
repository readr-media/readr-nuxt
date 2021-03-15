<template>
  <p class="paragraph-with-annotation">
    <template v-for="splitContent in splitContents">
      <!-- eslint-disable-next-line vue/valid-v-for -->
      <ClientOnly v-if="splitContent.pureAnnotationText !== undefined">
        <readr-annotation :text="splitContent.pureAnnotationText"
          ><span slot="toggle" class="toggle"><SvgArrowToggle /></span
          >{{ splitContent.text }}</readr-annotation
        >
      </ClientOnly>
      <!-- eslint-disable-next-line vue/require-v-for-key, vue/no-v-html -->
      <span v-else v-html="splitContent.html"></span>
    </template>
  </p>
</template>

<script>
import SvgArrowToggle from '~/assets/arrow-toggle.svg?inline'

export default {
  name: 'RdParagraphWithAnnotation',

  components: {
    SvgArrowToggle,
  },

  props: {
    content: {
      type: String,
      required: true,
      default: '',
    },
  },

  computed: {
    splitContents() {
      return this.content
        .split(/<!--__ANNOTATION__=|-->/gm)
        .filter(function isAnnotationOrText(item) {
          return !item.startsWith('<!--')
        })
        .filter(function isTruthy(item) {
          return item
        })
        .map(function parseStr(str) {
          // str 有可能是不合法的 JSON 格式（比如 'fake str'），這時 JSON.parse 會報錯
          try {
            return {
              ...JSON.parse(str),
            }
          } catch {
            return { html: str }
          }
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.paragraph-with-annotation {
  text-align: left !important; /* Do not use “justify”; otherwise it will break the layout when an annotation is open */
}

.toggle {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 4px 4px 4px;
  width: 24px;
  height: 24px;
  vertical-align: middle;
  border-radius: 50%;
  background-color: #ffd41d;
}

svg {
  display: inline-block;
  transition: transform 0.3s;
}

::v-deep .annotation {
  padding: 12px 24px;
  margin: 8px 0 32px 0;
  font-size: 16px;
  line-height: 24px;
  background-color: #ffd41d;
  @include media-breakpoint-up(md) {
    padding: 24px 32px;
  }
  @include media-breakpoint-up(xl) {
    padding: 24px 48px;
  }
}

readr-annotation {
  color: #161616;

  &.open svg {
    transform: rotate(-180deg);
  }
}
</style>
