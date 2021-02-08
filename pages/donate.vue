<template>
  <div>
    <Container />
  </div>
</template>

<script>
import { SITE_NAME } from 'src/constants'
import Container from '~/components/donate/Container.vue'

export default {
  name: 'AppDonate',
  components: {
    Container,
  },
  metaInfo: {
    title: '贊助 READr',
    meta: [
      {
        vmid: 'og:title',
        property: 'og:title',
        content: `贊助 READr - ${SITE_NAME}`,
      },
    ],
  },
}
</script>
