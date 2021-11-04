<template>
  <div class="ham-list-wrapper">
    <button type="button" class="close" @click="handleClose">
      <SvgClose class="close-icon" />
    </button>
    <ul>
      <li
        v-for="item in categories"
        :key="item.slug"
        @click="handleCategoryClicked(item)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import SvgClose from '~/assets/imgs/ham-close.svg?inline'

export default {
  name: 'RdHeaderHamList',

  components: {
    SvgClose,
  },
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleClose() {
      this.$emit('close-ham')
    },
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
.ham-list-wrapper {
  background-color: #fff;
  padding: 12px;
  text-align: right;
  @include media-breakpoint-up(md) {
    padding: 20px 36px;
  }
  .close {
    display: inline-block;
    width: 40px;
    height: 40px;
    margin: 0 0 16px;
    @include media-breakpoint-up(md) {
      margin: 0 0 20px;
    }
    &-icon {
      width: 100%;
      height: 100%;
    }
  }
  ul {
    width: 100%;
    display: block;
    text-align: left;
    padding: 0 28px 32px;
    @include media-breakpoint-up(md) {
      padding: 0 64px 32px;
    }
    li {
      width: 100%;
      font-size: 36px;
      font-weight: 900;
      line-height: 36px;
      letter-spacing: 0.03em;
      color: rgba(0, 9, 40, 0.87);
      cursor: pointer;
      padding: 20px 0;
      @include media-breakpoint-up(md) {
        padding: 40px 0;
      }
    }
    li + li {
      border-top: 3px solid #04295e;
    }
  }
}
</style>
