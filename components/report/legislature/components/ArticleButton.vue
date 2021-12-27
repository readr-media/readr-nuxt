<template>
  <button class="article-button">{{ content }}</button>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: '',
      require: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.article-button {
  margin: 0 auto;
  width: 100%;
  background: #33aba4;
  border: 1px solid #dddddd;
  border-radius: 2px;
  padding: 12px 48px;
  max-width: 476px;
  text-align: center;
  letter-spacing: 2.5px;
  color: #000928;
  font-size: 16px;
  line-height: 23px;
  position: relative;
  box-shadow: 4px 4px #000;
  display: block;
  &:hover {
    cursor: pointer;
    background: #5a8a87;
    color: #4f4f4f;
    box-shadow: 4px 4px #4f4f4f;
  }
}
</style>
