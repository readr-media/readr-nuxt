<template>
  <section class="app-donate">
    <DonateForm
      v-if="!showResult"
      @submitForm="onFormSubmit"
      @showResultSuccess="onShowResultSuccess"
      @showResultFail="onShowResultFail"
    />
    <DonateResult
      v-else
      :isResultSuccess="isResultSuccess"
      :formData="formData"
      @backToForm="showResult = false"
      @closeSidebar="$emit('closeSidebar')"
    />
  </section>
</template>

<script>
import { SITE_NAME } from 'src/constants'
import DonateForm from 'src/components/donate/DonateForm.vue'
import DonateResult from 'src/components/donate/DonateResult.vue'

export default {
  name: 'AppDonate',
  components: {
    DonateForm,
    DonateResult,
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
  data() {
    return {
      showResult: false,
      isResultSuccess: false,
      formData: {
        donateAmount: 0,
        carrierTypeSelected: '',
        carrierInputs: '',
        date: '',
      },
    }
  },
  methods: {
    onFormSubmit(formData) {
      this.$set(this, 'formData', formData)
    },
    onShowResultSuccess() {
      this.showResult = true
      this.isResultSuccess = true
    },
    onShowResultFail() {
      this.showResult = true
      this.isResultSuccess = false
    },
  },
}
</script>

<style lang="scss" scoped>
.app-donate {
  padding: 0;
}
</style>
