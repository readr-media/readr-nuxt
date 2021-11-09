<template>
  <ul>
    <li
      v-for="item in list"
      :key="item.slug"
      @click="handleCategoryClicked(item)"
    >
      <span>{{ item.name }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'RdArticleHeadingTopList',

  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleCategoryClicked({ name = '', slug = '' }) {
      if (!slug || !name) return
      this.$router.push({
        name: 'category',
        params: { name, slug },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  align-items: center;
  li {
    position: relative;
    display: inline-block;
    cursor: pointer;
    span {
      position: relative;
      font-size: 14px;
      font-weight: 700;
      line-height: 14px;
      letter-spacing: 0.05em;
      color: #000928;
      border-bottom: 2px solid #000928;
      z-index: 100;
      @include media-breakpoint-up(md) {
        font-size: 16px;
        line-height: 16px;
      }
      &::before {
        content: '';
        position: absolute;
        bottom: 4px;
        left: 0;
        right: 0;
        height: 8px;
        background-color: #ebf02c;
        z-index: -1;
      }
    }
  }
  li + li {
    padding: 0 0 0 20px;
    @include media-breakpoint-up(md) {
      padding: 0 0 0 28px;
    }
    &::before {
      content: '';
      position: absolute;
      top: 13px;
      left: 9px;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: rgba(0, 9, 40, 0.2);
      @include media-breakpoint-up(md) {
        left: 13px;
      }
    }
  }
}
</style>
