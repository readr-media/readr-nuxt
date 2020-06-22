<template>
  <div>
    <DumbHeader />

    <DumbCarousel
      v-if="shouldOpenEditorsChoice"
      :posts="editorsChoicePosts"
      class="home__carousel"
    >
      <template #heading>
        <DumbSectionHeading title="編輯精選" />
      </template>
    </DumbCarousel>

    <section class="container">
      <DumbSectionHeading
        title="最新文章"
        fill="#ebf02c"
        class="home__section-heading"
      />
      <DumbLatestList
        v-if="shouldOpenLatestList"
        :postMain="latestPostMain"
        :postsSub="latestPostsSub"
      />
    </section>

    <DumbDonateButton class="home__donate-btn" />

    <section class="horizontal-container">
      <DumbSectionHeading
        title="協作專區"
        color="#f5ebff"
        fill="#04295e"
        class="home__section-heading"
      />
      <DumbHorizontalList :projects="collaborativeProjects" />
    </section>
  </div>
</template>

<script>
const mockCollaborativeProjects = [
  {
    id: 1,
    title: '為了武漢肺炎防疫的需要，你可以接受你的權益被限制嗎？',
    heroImage:
      'https://www.readr.tw/assets/images/6324f78e5ddc9774c5e14cb6f2dbc34f/6324f78e5ddc9774c5e14cb6f2dbc34f.jpeg',
    endTime: 'Tue, 09 Jun 2020 10:00:00 GMT',
    progress: 37,
    link: 'https://www.readr.tw/series/Wuhan-pneumonia',
  },
  {
    id: 2,
    title: '港版國安法將成「一國一制」？字詞分析網友怎麼看',
    heroImage:
      'https://www.readr.tw/assets/images/830962f5f7f9b90372a60067f0545aea/830962f5f7f9b90372a60067f0545aea.jpg',
    // endTime: 'Mon, 22 Jun 2020 10:00:00 GMT',
    progress: 87,
    link: 'https://www.readr.tw/series/2020president',
  },
  {
    id: 3,
    title: '不一樣的彩虹：全台小學晨光時間大解密',
    heroImage:
      'https://www.readr.tw/assets/images/5e2ba0d484f8369089f185afcf8b3be4/5e2ba0d484f8369089f185afcf8b3be4.png',
    endTime: 'Tue, 09 Jun 2020 10:00:00 GMT',
    // progress: 56,
    link: 'https://www.readr.tw/series/overseastaiwanese',
  },
  {
    id: 4,
    // title: '不一樣的彩虹：全台小學晨光時間大解密',
    heroImage:
      'https://www.readr.tw/assets/images/5e2ba0d484f8369089f185afcf8b3be4/5e2ba0d484f8369089f185afcf8b3be4.png',
    endTime: 'Tue, 09 Jun 2020 10:00:00 GMT',
    progress: 56,
    link: 'https://www.readr.tw/series/food-delivery',
  },
]
const mockEditorsChoicePosts = [
  {
    id: 1,
    title: '記者來當外送員：開箱美食外送秘辛！',
    link: 'https://www.readr.tw/series/Wuhan-pneumonia',
    image:
      'https://www.readr.tw/assets/images/5e2ba0d484f8369089f185afcf8b3be4/5e2ba0d484f8369089f185afcf8b3be4.png',
  },
  {
    id: 2,
    title: '不一樣的彩虹：全台小學晨光時間大解密',
    link: 'https://www.readr.tw/series/food-delivery',
    image:
      'https://www.readr.tw/assets/images/830962f5f7f9b90372a60067f0545aea/830962f5f7f9b90372a60067f0545aea.jpg',
  },
  {
    id: 3,
    title: '港版國安法將成「一國一制」？字詞分析網友怎麼看',
    link: 'https://www.readr.tw/series/2020president',
    image:
      'https://www.readr.tw/assets/images/6324f78e5ddc9774c5e14cb6f2dbc34f/6324f78e5ddc9774c5e14cb6f2dbc34f.jpeg',
  },
]

export default {
  name: 'Home',
  async fetch() {
    // await this.fetchEditorsChoice()
    await this.fetchLatestPosts()
  },
  data() {
    return {
      editorsChoicePosts: mockEditorsChoicePosts,
      latestPosts: [],
      collaborativeProjects: mockCollaborativeProjects,
    }
  },
  computed: {
    shouldOpenEditorsChoice() {
      return this.editorsChoicePosts.length > 0
    },
    shouldOpenLatestList() {
      return this.latestPosts.length > 0
    },
    latestPostMain() {
      return this.latestPosts[0]
    },
    latestPostsSub() {
      return this.latestPosts.slice(1)
    },
  },
  methods: {
    async fetchEditorsChoice() {
      const response = await this.$fetchPromotions({
        maxResult: 3,
      })
      this.editorsChoicePosts = response?.items ?? []
    },
    async fetchLatestPosts() {
      const response = await this.$fetchPosts({
        publishStatus: '{"$in":[2]}',
        type: '{"$in":[1,4]}',
        // type: '{"$in":[4]}',
        maxResult: 5,
        page: 1,
        sort: '-published_at',
        showAuthor: false,
        showUpdater: false,
        showTag: false,
        showComment: false,
        showProject: false,
      })
      this.latestPosts = response?.items ?? []
    },
  },
}
</script>

<style lang="scss" scoped>
.home {
  &__carousel {
    margin-bottom: 40px;
    @include media-breakpoint-up(md) {
      margin-bottom: 60px;
    }
  }
  &__section-heading {
    margin-bottom: 20px;
    max-width: 1096px;
    @include media-breakpoint-up(md) {
      margin-bottom: 30px;
    }
  }
  &__donate-btn {
    margin-left: 20px;
    margin-right: 20px;
    max-width: 396px;
    margin-bottom: 40px;
    @media (min-width: 436px) {
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 110px;
    }
  }
}
.container {
  max-width: 1096px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
  padding-left: 20px;
  padding-right: 20px;
  @media (min-width: 1136px) {
    padding-left: 0;
    padding-right: 0;
    margin-bottom: 60px;
  }
}
.horizontal-container {
  padding-left: 20px;
  margin-bottom: 40px;
  @include media-breakpoint-up(md) {
    margin-bottom: 60px;
  }
  @media (min-width: 1096px) {
    // (100vw - 1096px) / 2 + 20px
    padding-left: calc(50vw - 528px);
  }
  @media (min-width: 1136px) {
    // (100vw - 1096px) / 2
    padding-left: calc(50vw - 548px);
  }
}
</style>
