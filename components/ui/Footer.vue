<template>
  <footer>
    <div class="media-links">
      <a
        v-for="medium in socialMediaLinks"
        :key="medium.href"
        :href="medium.href"
        target="_blank"
        rel="noopener noreferrer"
        v-html="medium.svgIcon"
      >
      </a>
    </div>

    <div class="us-links">
      <a
        href="https://www.readr.tw/about"
        target="_blank"
        rel="noopener noreferrer"
      >
        關於我們
      </a>
      <a href="mailto:readr@readr.tw">聯絡我們</a>
      <a
        href="https://forms.gle/C6B5MGYXLzXrmfSe6"
        target="_blank"
        rel="noopener noreferrer"
      >
        意見回饋
      </a>
    </div>

    <div class="copyright">© 2020 READr All Rights Reserved</div>
  </footer>
</template>

<script>
import { SOCIAL_MEDIA_LINKS } from '~/constants/links.js'

export default {
  name: 'Footer',
  data() {
    return {
      socialMediaLinks: SOCIAL_MEDIA_LINKS,
    }
  },
}
</script>

<style lang="scss" scoped>
footer {
  padding-top: 32px;
  padding-bottom: 16px;
  font-size: 15px;
  text-align: center;
  @include media-breakpoint-up(lg) {
    display: flex;
    align-items: center;
    padding-top: 28px;
    padding-bottom: 28px;
  }
}
.media-links {
  display: flex;
  justify-content: center;
  color: rgba(#000, 0.88);
  margin-bottom: 30px;
  line-height: 1.4;
  @include media-breakpoint-up(lg) {
    order: 3;
    margin-left: 28px;
    margin-bottom: 0;
  }
  a + a {
    margin-left: 16px;
  }
}
.us-links {
  display: flex;
  justify-content: center;
  line-height: 1.7;
  margin-bottom: 8px;
  @include media-breakpoint-up(lg) {
    order: 1;
    margin-bottom: 0;
  }
  a + a {
    margin-left: 42px;
    @include media-breakpoint-up(lg) {
      margin-left: 66px;
    }
  }
}
.copyright {
  color: #4a4a4a;
  @include media-breakpoint-up(lg) {
    order: 2;
    margin-left: auto;
  }
}
a {
  display: block;
}
</style>
