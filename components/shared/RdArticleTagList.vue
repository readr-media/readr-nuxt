<template>
  <ul>
    <li v-for="tag in tagList" :key="tag">
      <a :href="`/tag/${tag}`" target="_blank">{{ tag }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'RdArticleTagList',

  props: {
    tags: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    tagList() {
      return this.tags?.map((item) => item?.name ?? '') ?? ['']
    },
  },
}
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  li {
    font-size: 14px;
    line-height: 1.5;
    text-align: center;
    border-radius: 2px;
    color: rgba(0, 9, 40, 0.66);
    background-color: #f6f6fb;
    cursor: pointer;
    padding: 8px;
    margin: 0 8px 8px 0;
    &:hover,
    &:focus {
      color: rgba(0, 9, 40, 0.5);
    }
  }
}
</style>
