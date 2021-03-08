<template>
  <section class="app-donate">
    <RdDonateForm
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
import DonateResult from '../../donate/Result.vue'
import RdDonateForm from './RdDonateForm.vue'

export default {
  components: {
    RdDonateForm,
    DonateResult,
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
