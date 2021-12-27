<template>
  <span class="tag-preset">
    <span>{{ emoji }}</span>
    <span class="text">{{ text }}</span>
  </span>
</template>

<script>
export default {
  props: {
    emoji: {
      type: String,
      default: '🔥',
    },
    text: {
      type: String,
      default: 'text',
    },
  },
}
</script>

<style lang="scss" scoped>
.tag-preset {
  background-color: black;
  border-radius: 5px;
  padding: 4px;
  font-size: 12px;
}

.text {
  color: white;
  font-weight: 900;
}
</style>
