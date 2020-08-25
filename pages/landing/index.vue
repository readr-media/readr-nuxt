<template>
  <div>
    <header>
      <nuxt-link to="/" @click.native="$sendGaEvtForLandingClick('logo')">
        <SvgReadrLogoYellow />
      </nuxt-link>
    </header>

    <div class="landing-page">
      <main>
        <div class="taipei-bg" />
        <div class="manifesto">
          <div class="wrapper">
            <h1>群眾參與，啟動媒體小革命</h1>
            <p>
              我們是一群相信群眾力量可以帶來改變的媒體工作者。我們相信當公民有充足的資訊時，民主將更加成熟，特別是在媒體信任度愈來愈低的時代。我們將進行兩大行動，滿足民眾知的權利，透過人們的參與完善、開放資料，並嘗試促成改變：
            </p>
            <p>1. 開發簡單上手的協作平台，完善並開放資料，降低獲取資料的門檻</p>
            <p>2. 根據所搜集的資料，撰寫客觀專業並有解決方案的報導</p>
            <p>
              透過協作以及促進開放資料的文化，我們希望讓人們知道我們有能力讓台灣變得更加美好。
            </p>

            <div class="actions">
              <nuxt-link
                to="/#collaboration"
                @click.native="$sendGaEvtForLandingClick('collaboration')"
              >
                <button type="button">參與協作</button>
              </nuxt-link>
              <nuxt-link
                to="/#latest"
                @click.native="$sendGaEvtForLandingClick('latest articles')"
              >
                <button type="button">閱讀文章</button>
              </nuxt-link>
              <a
                href="/donate"
                target="_blank"
                @click="$sendGaEvtForLandingClick('donate')"
              >
                <button type="button">贊助我們</button>
              </a>
            </div>
          </div>
        </div>
      </main>

      <div class="email">
        <div class="wrapper">
          <template v-if="shouldOpenEmailInput">
            <div class="input-wrapper">
              <input
                v-model="email"
                type="email"
                placeholder="輸入 email 獲取最新資訊"
                @keydown.enter="handleSubmitEmail"
              />
              <button type="button" @click="handleSubmitEmail">送出</button>
            </div>
            <hr />
          </template>
          <div v-else class="response">最新資訊將於第一時間通知您！</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, useContext } from 'nuxt-composition-api'
import { post as axiosPost } from 'axios'

import SvgReadrLogoYellow from '~/assets/readr-logo-yellow.svg?inline'

export default {
  name: 'Landing',
  layout: 'empty',
  components: {
    SvgReadrLogoYellow,
  },
  setup() {
    const shouldOpenEmailInput = ref(true)

    const { route, $dayjs, $sendGaEvtForLandingClick } = useContext()
    const email = ref('')
    const hasEmail = computed(() => email.value !== '')

    function handleSubmitEmail(evt) {
      if (!hasEmail.value || !shouldOpenEmailInput.value || evt.isComposing) {
        return
      }

      sendEmailToGoogleSheet()
      closeEmailInput()
      $sendGaEvtForLandingClick('subscribe')
    }

    function sendEmailToGoogleSheet() {
      axiosPost('/api/google-sheets/append', {
        spreadsheetId: '1-7YTT5Y-VINVAYy8Aem0kGnerQfTEoBASQxI_J1YR8c',
        range: 'Email!A2:D',
        valueInputOption: 'RAW',
        resource: {
          values: [
            [
              email.value,
              $dayjs().format('YYYYMMDDHHmm'),
              'readr3.0-landing-page',
              route.value.path,
            ],
          ],
        },
      })
    }

    function closeEmailInput() {
      shouldOpenEmailInput.value = false
    }

    return {
      shouldOpenEmailInput,
      email,
      handleSubmitEmail,
    }
  },
}
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 499;

  a {
    display: block;
    padding-top: 12px;
    padding-left: 12px;
  }
}

.landing-page {
  background-color: #000;
}

.taipei-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60.38vh;
  background-image: url(~assets/taipei-city.jpg);
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  background-color: #000;
  @include media-breakpoint-up(md) {
    height: 100%;
  }
}

.manifesto {
  z-index: 1;
  position: relative;
  padding: 36.98vh 20px 142px 20px;
  @include media-breakpoint-up(md) {
    background-color: rgba(#000, 0.7);
    padding: 64px 11.11vw 40px 0;
  }

  .wrapper {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    @include media-breakpoint-up(md) {
      text-align: right;
      margin-right: 0;
    }
  }
}

h1 {
  letter-spacing: 0.15em;
  color: #ebf02c;
  text-shadow: 0 0 2px rgba(#000, 0.25);
  font-weight: 900;
  font-size: 36px;
  line-height: 1.47;
  margin-bottom: 18px;
  @include media-breakpoint-up(md) {
    margin-bottom: 36px;
  }
}

p {
  letter-spacing: 2.5px;
  font-size: 16px;
  line-height: 1.5;
  color: #fff;
  text-shadow: 0px 0px 2px rgba(216, 216, 216, 0.15);

  + p {
    margin-top: 1em;
  }
}

.actions {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  font-size: 15px;
  line-height: 1.47;
  color: rgba(#000, 0.87);
  user-select: none;
  @include media-breakpoint-up(md) {
    flex-direction: row;
    max-width: 492px;
    margin-left: auto;
    margin-top: 36px;
  }

  a {
    width: 100%;
    background-color: #ebf02c;
    border: 1px solid #000;
    border-radius: 2px;
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
    transition: background-color 0.3s;

    &:hover {
      background-color: #fcff94;
    }

    &:active {
      background-color: #c9cd2c;
    }

    + a {
      margin-top: 18px;
      @include media-breakpoint-up(md) {
        margin-top: 0;
        margin-left: 18px;
      }
    }
  }

  button {
    letter-spacing: 2.5px;
    margin-left: 2.5px;
    font-weight: 700;
  }
}

.email {
  color: #fff;
  background-color: rgba(#000, 0.8);
  padding: 22px 22px 12px 22px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 1;
  font-size: 15px;
  line-height: 1.47;
  @include media-breakpoint-up(md) {
    padding: 32px 11.11vw 22px 0;
    background-color: rgba(#000, 0.7);
  }

  .wrapper {
    max-width: 490px;
    margin-left: auto;
    margin-right: auto;
    @include media-breakpoint-up(md) {
      margin-right: 0;
    }
  }

  .input-wrapper {
    display: flex;
    margin-bottom: 9px;
  }

  button {
    font-weight: 700;
    margin-left: 22px;
    flex: 0 0 auto;
    letter-spacing: 2.5px;
    user-select: none;
    @include media-breakpoint-up(md) {
      margin-left: 42px;
    }

    &:hover {
      color: #ebf02c;
    }
  }
}

hr {
  width: 100%;
  height: 1px;
  background-color: rgba(#fff, 0.66);
  border-radius: 2px;
  border: none;
}

input {
  background-color: transparent;
  letter-spacing: 2.5px;
  width: 100%;
  flex: 1 1 auto;
  outline: none;

  &::placeholder {
    color: rgba(#fff, 0.87);
  }

  &:focus + button {
    color: #ebf02c;
  }
}

.response {
  padding-bottom: 10px;
  letter-spacing: 2.5px;
  text-align: center;
  padding-left: 2.5px;
  @include media-breakpoint-up(md) {
    text-align: left;
    padding-left: 0;
  }
}
</style>
