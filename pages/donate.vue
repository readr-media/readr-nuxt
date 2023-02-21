<!-- 
  考量未來會在網站上實作捐款頁的需求，維持使用該檔案，目前先將設定轉址到外部頁面，
  未來要實作捐款頁時，直接在該檔案中進行修改即可。
-->

<template>
  <p>Donation Page</p>
</template>

<script>
import { DONATION_PAGE_URL } from '~/configs/config'

export default {
  middleware: ({ redirect }) => {
    redirect(DONATION_PAGE_URL)
  },
}
</script>
