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
import DonateForm from '../../donate/Form.vue'
import DonateResult from '../../donate/Result.vue'

export default {
  components: {
    DonateForm,
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
