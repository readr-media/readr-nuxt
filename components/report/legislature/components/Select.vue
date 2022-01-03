<template>
  <div v-click-outside="handleCloseOptions" class="select-wrapper">
    <button class="select-wrapper__button button" @click="handleButtonClick">
      {{ optionActive ? getOptionRenderedText(optionActive) : defaultText }}
    </button>
    <div
      v-show="isOptionsToggled"
      class="select-wrapper__options-wrapper options-wrapper"
    >
      <button
        v-for="option in options"
        :key="option.text"
        class="options-wrapper__option option"
        @click="handleOptionClick(option)"
      >
        {{ getOptionRenderedText(option) }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    defaultText: {
      type: String,
      default: 'default',
    },
    options: {
      type: Array,
      default: () => [
        {
          text: 'option1',
          isActive: false,
        },
        {
          text: 'option2',
          isActive: false,
        },
      ],
    },
  },
  data() {
    return {
      isOptionsToggled: false,
    }
  },
  computed: {
    optionActive() {
      return this.options.find(function getIsActive(value) {
        return !!value.isActive
      })
    },
  },
  methods: {
    getOptionRenderedText(option) {
      return `${option.emoji} ${option.text}`
    },
    handleButtonClick() {
      this.isOptionsToggled = !this.isOptionsToggled
    },
    handleCloseOptions() {
      this.isOptionsToggled = false
    },
    handleOptionClick(option) {
      this.$emit('clickOption', option)
      this.handleCloseOptions()
    },
  },
}
</script>

<style lang="scss" scoped>
.select-wrapper {
  position: relative;
  min-width: max-content;
  &__options-wrapper {
    position: absolute;
    top: 28px;
    left: 0px;
  }
}

.button {
  padding: 3px;
  font-size: 12px;
  font-weight: 900;
  background-color: #555555;
  color: white;
  height: 20px;
  display: flex;
  align-items: center;
}

.options-wrapper {
  width: max-content;
  padding: 5px;
  display: flex;
  flex-direction: column;
  background-color: #555555;
  color: white;
}

.option {
  text-align: left;
  padding: 3px 0;
  font-size: 12px;
  font-weight: 900;
  &:hover {
    color: #cb3838;
  }
}
</style>
