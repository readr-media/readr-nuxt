<template>
  <figure class="figure">
    <img :src="require(`~/assets/about/${name}.png`)" alt="" />
    <figcaption v-text="title" />
  </figure>
</template>

<script>
export default {
  name: 'RdAboutTeamMembersPortrait',

  props: {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.figure {
  background-color: transparent;
  width: 100px;
  position: relative;

  img {
    width: 100%;
    position: relative;
    bottom: 20px;
  }

  figcaption {
    text-align: center;
    background-color: #69cad3;
    height: 50px;
    line-height: 50px;
    position: absolute;
    bottom: 0;
    width: 100%;
  }
}
</style>
