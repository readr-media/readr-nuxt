<template>
  <div class="about">
    <UiHeader @sendGaEvt="$sendGaEvtForHeaderClick('logo')" />

    <Intro />
    <CoreValues />
    <TeamMembers class="about__team-members" />
    <Timeline class="about__timeline" />
  </div>
</template>

<script>
import UiHeader from '~/components/ui/Header.vue'
import Intro from '~/components/about/Intro.vue'
import CoreValues from '~/components/about/CoreValues.vue'
import TeamMembers from '~/components/about/TeamMembers.vue'
import Timeline from '~/components/about/Timeline.vue'

import { SITE_TITLE } from '~/constants/metadata.js'

export default {
  name: 'About',

  components: {
    UiHeader,
    Intro,
    CoreValues,
    TeamMembers,
    Timeline,
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
