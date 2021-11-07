<template>
  <transition name="toggle-fade">
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
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </transition>
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
    // resetBodyNotScroll() {
    //   const scrollY = document.body.style.top
    //   document.body.style.overflow = ''
    //   document.body.style.top = ''
    //   window.scrollTo(0, parseInt(scrollY || '0') * -1)
    // },
    handleCategoryClicked({ name = '', slug = '' }) {
      // this.resetBodyNotScroll()
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
  min-height: 100vh;
  background-color: #fff;
  text-align: right;
  overflow-y: auto;
  padding: 12px;
  @include media-breakpoint-up(sm) {
    padding: 20px 36px;
  }
  .close {
    display: inline-block;
    width: 40px;
    height: 40px;
    margin: 0 0 16px;
    padding: 4px;
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
      max-width: 568px;
      cursor: pointer;
      margin: 0 auto;
      padding: 20px 0;
      @include media-breakpoint-up(md) {
        padding: 40px 0;
      }
      span {
        position: relative;
        font-size: 36px;
        font-weight: 900;
        line-height: 36px;
        letter-spacing: 0.03em;
        color: rgba(0, 9, 40, 0.87);
        z-index: 100;
        &:active,
        &:focus {
          &:before {
            content: '';
            position: absolute;
            top: 18px;
            left: 0;
            right: 0;
            height: 20px;
            background-color: #ebf02c;
            z-index: -1;
          }
        }
      }
    }
    li + li {
      border-top: 3px solid #04295e;
    }
  }
}

// transition effect
.toggle-fade-enter-active {
  transition: all 0.25s ease-out;
}
.toggle-fade-leave-active {
  transition: all 0.25s ease-out;
}
.toggle-fade-enter {
  opacity: 1;
}
.toggle-fade-leave-to {
  opacity: 0;
}
</style>
