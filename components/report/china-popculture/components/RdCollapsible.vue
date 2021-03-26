<template>
  <div class="collapsible">
    <button
      class="collapsible__toggle-button toggle-button"
      @click="handleToggleButtonClick"
    >
      <span
        class="toggle-button__button-text button-text"
        v-text="textButton"
      />
      <img
        :src="buttonIconImg"
        alt="button-icon"
        class="toggle-button__button-icon button-icon"
      />
    </button>
    <transition name="slide-fade">
      <div v-show="isToggled" class="collapsible__content content">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    textButton: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isToggled: false,
    }
  },
  computed: {
    buttonIconImg() {
      return this.isToggled
        ? require('~/assets/report/china-popculture/cp-collaspiable-fold.svg')
        : require('~/assets/report/china-popculture/cp-collaspiable-expand.svg')
    },
  },
  methods: {
    handleToggleButtonClick() {
      this.isToggled = !this.isToggled
    },
  },
}
</script>

<style lang="scss" scoped>
.toggle-button {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #111111;
  font-size: 18px;
  font-weight: 300;
  line-height: 27px;
  letter-spacing: 0.006em;
  color: #111111;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.25s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.25s ease-out;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
