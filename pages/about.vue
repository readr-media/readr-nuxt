<template>
  <div class="about">
    <RdHeader @sendGaEvent="$sendGaEventForHeaderClick('logo')" />

    <RdAboutIntro />
    <RdAboutCoreValues />
    <RdAboutTeamMembers class="about__team-members" />
    <RdAboutTimeline class="about__timeline" />
  </div>
</template>

<script>
import RdHeader from '~/components/shared/Header/RdHeader.vue'
import RdAboutIntro from '~/components/shared/About/RdAboutIntro.vue'
import RdAboutCoreValues from '~/components/shared/About/RdAboutCoreValues.vue'
import RdAboutTeamMembers from '~/components/shared/About/RdAboutTeamMembers.vue'
import RdAboutTimeline from '~/components/shared/About/RdAboutTimeline.vue'

import { SITE_TITLE } from '~/constants/metadata.js'

export default {
  name: 'About',

  components: {
    RdHeader,
    RdAboutIntro,
    RdAboutCoreValues,
    RdAboutTeamMembers,
    RdAboutTimeline,
  },

  head() {
    const metaTitle = `關於我們 - ${SITE_TITLE}`

    return {
      title: metaTitle,
      meta: [{ hid: 'og:title', property: 'og:title', content: metaTitle }],
    }
  },
}
</script>

<style lang="scss" scoped>
.about {
  background-color: #fff;

  &__team-members {
    margin: 50px 0 0 0;
  }

  &__timeline {
    margin: 50px 0 0 0;
    @include media-breakpoint-up(md) {
      margin: 0;
    }
  }
}
</style>
