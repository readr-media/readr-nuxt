<template>
  <div v-if="shouldOpenGdpr" class="the-gdpr">
    <ClientOnly>
      <button type="button" @click="closeGdpr">
        <span>我知道了</span>
      </button>
      <div class="explan">
        <p>
          本網站使用 cookie
          以及相關技術分析來改善使用者體驗。點選「我知道了」，視窗會關閉。<a
            href="https://www.readr.tw/privacy-rule"
            target="_blank"
            >了解更多</a
          >
        </p>
      </div>
    </ClientOnly>
  </div>
</template>

<script>
export default {
  name: 'RdGdpr',

  data() {
    return {
      shouldOpenGdpr: false,
    }
  },

  mounted() {
    this.handleGdpr()
  },

  methods: {
    handleGdpr() {
      this.shouldOpenGdpr =
        JSON.parse(window.localStorage.getItem('readr3.shouldOpenGdpr')) ?? true
    },
    closeGdpr() {
      this.shouldOpenGdpr = false
      window.localStorage.setItem(
        'readr3.shouldOpenGdpr',
        JSON.stringify(this.shouldOpenGdpr)
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.the-gdpr {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  font-size: 15px;
  line-height: 1.5;
  letter-spacing: 2.5px;
  border-top-left-radius: 2px;
  border-top-left-radius: 2px;
  overflow: hidden;
  z-index: 599;
  @include media-breakpoint-up(md) {
    display: flex;
    font-size: 18px;
  }
}
button {
  background-color: #ebf02c;
  color: #04295e;
  padding-top: 11px;
  padding-bottom: 11px;
  letter-spacing: 2.5px;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  @include media-breakpoint-up(md) {
    order: 2;
    flex: 0 0 170px;
    padding-top: 32px;
    padding-bottom: 32px;
  }
  span {
    // to offset letter-spacing at the rightmost
    margin-left: 2.5px;
  }
}
.explan {
  background-color: #04295e;
  color: #fff;
  padding: 20px;
  @include media-breakpoint-up(md) {
    order: 1;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
  }
  @include media-breakpoint-up(xl) {
    padding-left: 60px;
  }
}
a {
  text-decoration: underline;
}
</style>
