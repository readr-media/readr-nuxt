<template>
  <div>
    <UiHeader @sendGaEvt="$sendGaEvtForHeaderClick('logo')" />
    <Container />
  </div>
</template>

<script>
import { SITE_TITLE } from '~/constants/metadata'
import Container from '~/components/donate/Container.vue'

export default {
  name: 'AppDonate',
  components: {
    Container,
  },
  head() {
    const metaTitle = `贊助 READr - ${SITE_TITLE}`

    return {
      title: metaTitle,
      meta: [{ hid: 'og:title', property: 'og:title', content: metaTitle }],
      script: [
        {
          hid: 'tappay',
          src: 'https://js.tappaysdk.com/tpdirect/v3',
          defer: true,
        },
      ],
    }
  },
}
</script>
