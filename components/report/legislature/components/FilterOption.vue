<template>
  <label class="label">
    <span class="checkbox-icon">
      <span v-show="!!checked" class="checkbox-icon__inner-box" />
    </span>
    <span class="label__text">
      <span
        v-if="optionIconColor !== 'transparent'"
        class="category-icon"
        :style="{ backgroundColor: optionIconColor }"
      />
      <span>
        {{ optionName }}
      </span>
    </span>

    <input
      style="display: none;"
      type="checkbox"
      :checked="checked"
      @change="$emit('change', optionName)"
    />
  </label>
</template>

<script>
export default {
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    optionIconColor: {
      type: String,
      default: 'transparent',
    },
    optionName: {
      type: String,
      default: 'option name',
    },
  },
}
</script>

<style lang="scss" scoped>
.label {
  font-size: 12px;
  color: #1b1b1b;
  display: flex;
  align-items: center;
  cursor: pointer;
  &__text {
    margin: 0 0 0 10px;
    display: flex;
    align-items: center;
  }
}
.checkbox-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 12px;
  height: 12px;
  background-color: white;
  border: 1px solid black;
  &__inner-box {
    display: block;
    width: 8px;
    height: 8px;
    background-color: black;
  }
}

.category-icon {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin: 0 10px 0 0;
}
</style>
