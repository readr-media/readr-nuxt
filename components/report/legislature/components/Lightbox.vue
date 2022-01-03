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
        max-height: 90%;
        background-color: white;
        overflow-y: scroll;
      "
      @click.stop
    >
      <ButtonClose
        style="position: sticky; top: 8px; right: 8px; float: right;"
        @click.native="handleCloseLightbox"
      />
      <slot />
    </section>
  </div>
</template>

<script>
import ButtonClose from './ButtonClose.vue'
export default {
  components: { ButtonClose },
  methods: {
    handleCloseLightbox() {
      this.$emit('close')
    },
  },
}
</script>
