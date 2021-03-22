<template>
  <section class="section" @click.self="handleClose">
    <div class="wrapper">
      <h1 class="section__title title" v-text="title" />
      <!-- eslint-disable-next-line vue/no-v-html -->
      <p class="section__description description" v-html="descriptionHtml" />
      <button
        class="section__submit-button submit-button"
        @click="handleClose"
        v-text="textSubmit"
      />
    </div>
  </section>
</template>

<script>
import { newline2br } from '~/components/helpers'

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    textSubmit: {
      type: String,
      default: '',
    },
  },
  computed: {
    descriptionHtml() {
      return newline2br(this.description)
    },
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
.section {
  z-index: 99999999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.87);
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  padding: 0 20px;
  &__description {
    margin: 16px 0 0 0;
    @include media-breakpoint-up(md) {
      margin: 20px 0 0 0;
    }
  }
  &__submit-button {
    margin: 24px 0 0 0;
    @include media-breakpoint-up(md) {
      margin: 60px auto 0 auto;
      max-width: 280px;
    }
  }
}

.wrapper {
  margin: auto;
  padding: 20px 0;
  @include media-breakpoint-up(md) {
    max-width: 568px;
    padding: 0;
  }
  @include media-breakpoint-up(xl) {
    max-width: 600px;
  }
}

.title {
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
  text-align: center;
  letter-spacing: 0.032em;
  color: #ffffff;
  @include media-breakpoint-up(md) {
    font-size: 28px;
  }
}

.description {
  font-weight: 300;
  font-size: 18px;
  line-height: 34px;
  text-align: center;
  letter-spacing: 0.006em;
  color: #ffffff;
  ::v-deep strong {
    font-weight: 600;
  }
  ::v-deep br {
    display: block;
    content: '';
    margin: 16px 0;
  }
}

.submit-button {
  width: 100%;
  height: 48px;
  background: #ff3f3f;
  border: 1px solid #ffffff;
  border-radius: 2px;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  letter-spacing: 2.5px;
  color: #ffffff;
  transition: background 0.25s ease-out;
  &:hover {
    background: #111111;
  }
}
</style>
