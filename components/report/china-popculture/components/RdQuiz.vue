<template>
  <section class="quiz">
    <RdQuizInfo
      v-show="shouldShowQuizInfo"
      :title="cmsData.contentApiData.quizInfo.title"
      :description="cmsData.contentApiData.quizInfo.description"
      :textSubmit="cmsData.contentApiData.quizInfo.textSubmit"
      @close="hideQuizInfoAndMemoize"
    />
    <RdQuizHeader class="quiz__header" />
  </section>
</template>

<script>
import RdQuizInfo from '../components/RdQuizInfo.vue'
import RdQuizHeader from '../components/RdQuizHeader'

export default {
  name: 'RdQuiz',
  components: {
    RdQuizHeader,
    RdQuizInfo,
  },
  props: {
    cmsData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      shouldShowQuizInfo: false,
      quizInfoCookieName: 'chinaPopcultureReadQuizInfo',
    }
  },
  beforeMount() {
    if (!getCookie(this.quizInfoCookieName)) {
      this.showQuizInfo()
    }
  },
  methods: {
    showQuizInfo() {
      this.shouldShowQuizInfo = true
    },
    hideQuizInfo() {
      this.shouldShowQuizInfo = false
    },
    hideQuizInfoAndMemoize() {
      this.hideQuizInfo()
      document.cookie = `${this.quizInfoCookieName}=true`
    },
  },
}

function getCookie(cname) {
  const name = cname + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    // eslint-disable-next-line eqeqeq
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    // eslint-disable-next-line eqeqeq
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}
</script>
