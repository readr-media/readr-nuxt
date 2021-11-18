<template>
  <div
    v-if="shouldToggleFeature"
    id="g_id_onload"
    style="z-index: 99999;"
    data-client_id="983956931553-pjnfhchv9g468dsmn3koajmbp5dcg2pg.apps.googleusercontent.com"
    data-login_uri="/your_login_endpoint"
  />
</template>

<script>
import { ENV } from '~/configs/config'

export default {
  data() {
    return {
      // Remove this option if we are ready to introduce Google Sign In feature
      shouldToggleFeature: ENV !== 'prod',
    }
  },
}
</script>
