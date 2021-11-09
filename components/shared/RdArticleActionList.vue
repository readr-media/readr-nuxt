<template>
  <div class="action-list">
    <h3>如果你關心這個議題</h3>
    <div class="action-list__content">
      <RdArticleContentHandler
        v-for="paragraph in actionList"
        :key="paragraph.id"
        :paragraph="paragraph"
      />
    </div>
  </div>
</template>

<script>
import RdArticleContentHandler from '~/components/shared/RdArticleContentHandler.vue'

export default {
  name: 'RdArticleActionList',

  components: {
    RdArticleContentHandler,
  },
  props: {
    actionList: {
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
.action-list {
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
}
</style>
