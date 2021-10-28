<template>
  <div v-if="doesHaveList" class="concern">
    <h3>如果你關心這個議題</h3>
    <ul>
      <!-- eslint-disable-next-line vue/require-v-for-key, vue/no-v-html -->
      <li v-for="item in items" v-html="item" />
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RdArticleConcern',

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    doesHaveList() {
      return this.items?.length > 0
    },
  },
}
</script>

<style lang="scss" scoped>
.concern {
  padding: 0 20px;
  @include media-breakpoint-up(md) {
    padding: 0;
  }
  h3 {
    font-size: 24px;
    font-weight: 700;
    line-height: 1.5;
    letter-spacing: 0.032em;
    color: rgba(0, 9, 40, 0.87);
    margin: 0 0 16px;
    @include media-breakpoint-up(md) {
      font-size: 28px;
    }
  }
  ul {
    font-size: 18px;
    line-height: 2;
    letter-spacing: 0.01em;
    color: rgba(0, 9, 40, 0.87);
    li {
      position: relative;
      padding: 0 0 0 18px;
      &::before {
        content: '';
        display: block;
        position: absolute;
        top: 16px;
        left: 0;
        background-color: #04295e;
        width: 6px;
        height: 6px;
        border-radius: 50%;
      }
    }
    li + li {
      margin-top: 4px 0 0;
    }
    &::v-deep {
      a {
        border-bottom: 2px solid #ebf02c;
        &:hover {
          color: #000928;
          border-bottom: 2px solid #04295e;
        }
      }

      strong {
        font-weight: 500;
      }
    }
  }
}
</style>
