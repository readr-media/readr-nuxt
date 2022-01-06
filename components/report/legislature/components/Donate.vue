<template>
  <div class="donate">
    <ArticleButton content="贊助 READr" @click.native="handleClick" />
  </div>
</template>

<script>
import ArticleButton from './ArticleButton.vue'
export default {
  components: { ArticleButton },
  methods: {
    handleClick() {
      this.$ga.event('projects', 'click', 'donate')
      const route = this.$router.resolve({ path: '/donate' })
      window.open(route.href)
    },
  },
}
</script>

<style lang="scss" scoped>
.donate {
  background: #1b1b1b;
  padding: 24px 59px 28px 55px;
  @media (min-width: 768px) {
    padding: 60px;
  }
  &__button {
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
    &:hover {
      cursor: pointer;
      background: #5a8a87;
      color: #4f4f4f;
    }
  }
}
</style>
