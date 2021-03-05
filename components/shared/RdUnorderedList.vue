<template>
  <ul>
    <!-- eslint-disable-next-line vue/require-v-for-key, vue/no-v-html -->
    <li v-for="item in items" v-html="item"></li>
  </ul>
</template>

<script>
export default {
  name: 'RdUnorderedList',

  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
ul {
  font-size: 18px;
  line-height: 36px;
  letter-spacing: 0.01em;
  font-weight: 300;

  &::v-deep {
    a {
      border-bottom: 1px solid currentColor;

      &:hover {
        font-weight: 500;
      }
    }

    strong {
      font-weight: 500;
    }
  }
}

li {
  position: relative;
  padding-left: 18px;

  + li {
    margin-top: 8px;
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 16px;
    left: 0;
    background-color: #2b2b2b;
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }
}
</style>
