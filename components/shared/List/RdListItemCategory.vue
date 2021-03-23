<template>
  <li>
    <a :href="post.href" target="_blank">
      <article>
        <picture>
          <img :src="post.img.src" :alt="post.img.alt" />
        </picture>
        <h1>{{ post.title }}</h1>
        <div class="date">{{ post.date }}</div>
      </article>
    </a>
  </li>
</template>

<script>
export default {
  name: 'RdListItemCategory',

  props: {
    post: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
}
</script>

<style lang="scss" scoped>
li {
  text-align: center;
}

picture {
  position: relative;
  padding-top: 50%;
  margin-bottom: 6px;
}

img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

$letter-spacing--title: 2.5px;

h1 {
  font-weight: 700;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: $letter-spacing--title;
  padding-left: $letter-spacing--title;
  color: #000928;
  margin-bottom: 8px;
  @include media-breakpoint-up(md) {
    font-size: 18px;
    line-height: 27px;
    margin-bottom: 18px;
  }
  @include media-breakpoint-up(lg) {
    margin-bottom: 8px;
  }
}

.date {
  font-size: 13px;
  line-height: 18px;
  color: rgba(#000, 0.66);
  @include media-breakpoint-up(md) {
    font-size: 15px;
    line-height: 21px;
  }
}
</style>
