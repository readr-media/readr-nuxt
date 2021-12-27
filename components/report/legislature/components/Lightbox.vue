<template>
  <div
    style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 50;
      display: flex;
      justify-content: center;
      align-items: center;
    "
    @click="handleCloseLightbox"
  >
    <section
      style="
        position: relative;
        width: 90%;
        height: 90%;
        background-color: white;
        overflow-y: scroll;
      "
      @click.stop
    >
      <p
        style="position: absolute; top: 5px; right: 5px;"
        @click="handleCloseLightbox"
      >
        close
      </p>
      <slot />
    </section>
  </div>
</template>

<script>
export default {
  methods: {
    handleCloseLightbox() {
      this.$emit('close')
    },
  },
}
</script>
