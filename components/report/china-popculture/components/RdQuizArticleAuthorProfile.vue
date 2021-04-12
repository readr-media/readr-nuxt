<template>
  <div class="author-profile">
    <div class="author-profile__thumbnail thumbnail" v-text="thumbnailText" />
    <div class="author-profile__info info">
      <p class="info__name name" v-text="authorName" />
      <p class="info__id id" v-text="authorId" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    authorId: {
      type: String,
      default: '',
    },
    authorName: {
      type: String,
      default: '',
    },
    thumbnailText: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.author-profile {
  display: flex;
  align-items: center;
  &__info {
    margin: 0 0 0 12px;
  }
}

.thumbnail {
  width: 40px;
  height: 40px;
  background-color: #6a6a6a;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 22px;
  font-weight: 500;
}

.name {
  font-size: 16px;
  color: #161616;
}

.id {
  font-size: 13px;
  color: #6a6a6a;
}
</style>
