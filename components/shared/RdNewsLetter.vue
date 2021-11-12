<template>
  <div class="news-letter">
    <div class="news-letter__wrapper">
      <input
        v-model="emailInput"
        type="email"
        :placeholder="placeholder"
        :disabled="haveSubmitted"
        class="news-letter__wrapper-input"
      />
      <button
        type="button"
        class="news-letter__wrapper-btn"
        :class="[shouldShowSubmitBtn ? 'active-btn' : 'disabled-btn']"
        @click="handleSubmit"
      >
        {{ emailText }}
      </button>
    </div>
  </div>
</template>

<script>
import { post as axiosPost } from 'axios'
import dayjs from 'dayjs'

export default {
  name: 'RdNewsLetter',

  data() {
    return {
      emailInput: '',
      emailText: '訂閱電子報',
      placeholder: 'yourmail@gmail.com',
      haveSubmitted: false,
    }
  },
  computed: {
    isEmailValid() {
      const regex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return regex.test(this.emailInput)
    },
    shouldShowSubmitBtn() {
      return this.emailInput && this.isEmailValid && !this.haveSubmitted
    },
  },
  methods: {
    handleSubmit() {
      this.sendEmailToGoogleSheet()
      this.haveSubmitted = true
      this.placeholder = this.emailInput
      this.emailInput = ''
      this.emailText = '已成功訂閱'
    },
    sendEmailToGoogleSheet() {
      axiosPost('/api/google-sheets/append', {
        spreadsheetId: '1-7YTT5Y-VINVAYy8Aem0kGnerQfTEoBASQxI_J1YR8c',
        range: 'Email!A2:D',
        valueInputOption: 'RAW',
        resource: {
          values: [
            [
              this.emailInput,
              dayjs().format('YYYYMMDDHHmm'),
              'readr3.0-post-page',
              this.$route.path,
            ],
          ],
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.news-letter {
  width: 100%;
  background-color: #04295e;
  padding: 48px 20px;
  &__wrapper {
    width: 100%;
    display: block;
    max-width: 568px;
    margin: 0 auto;
    @include media-breakpoint-up(md) {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    @include media-breakpoint-up(xl) {
      width: 600px;
      max-width: 600px;
    }
    &-input {
      width: 100%;
      display: block;
      font-size: 18px;
      line-height: 2;
      letter-spacing: 0.01em;
      color: rgba(0, 9, 40, 0.87);
      background-color: #fff;
      border-radius: 2px;
      padding: 8px 16px;
      margin: 0 0 16px;
      @include media-breakpoint-up(md) {
        width: 402px;
        margin: 0;
      }
      @include media-breakpoint-up(xl) {
        width: 434px;
      }
      &:focus {
        outline: none;
      }
    }
    &-btn {
      width: 100%;
      display: block;
      font-size: 16px;
      font-weight: 700;
      line-height: 1.5;
      letter-spacing: 2.5px;
      text-align: center;
      border: 1px solid #fff;
      border-radius: 2px;
      padding: 12px 24px;
      @include media-breakpoint-up(md) {
        width: 154px;
      }
      &.active-btn {
        color: #fff;
        background-color: #04295e;
        cursor: pointer;
        &:hover,
        &:active,
        &:focus {
          outline: none;
          background-color: #000928;
        }
      }
      &.disabled-btn {
        color: rgba(0, 9, 40, 0.2);
        background-color: #f6f6fb;
        pointer-events: none;
        &:focus {
          outline: none;
        }
      }
    }
  }
}
</style>
