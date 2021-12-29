<template>
  <div v-observe-visibility="handleDashboardVisibilityChange" class="container">
    <div id="start-of-the-dashboard-story"></div>
    <div id="animation" ref="animation" v-intersect="animationEventObserver">
      <div id="b55dd62a-e932-436f-8447-2e85856f137c"></div>
    </div>
    <button
      v-show="shouldShowScroller"
      class="scroller-button"
      @click="handleScrollerButtonClick"
    >
      <img
        src="~/assets/imgs/report/legislature/arrow-dashboard-scroller.svg"
        alt="scroller-icon"
        :style="{
          transition: 'transform 0.25s ease-out',
          transform: `rotate(${
            scrollerIconDirection === 'down' ? '180deg' : '0'
          })`,
        }"
      />
    </button>
    <div
      v-observe-visibility="handleSearchVisibilityChange"
      id="bottom-of-the-dashboard-story"
    ></div>
  </div>
</template>

<script>
import scrollIntoView from 'scroll-into-view'
import { mapGetters } from 'vuex'
import { intersect } from '~/helpers/vue/directives/index.js'

import {
  setupIntersectionObserver,
  cleanupIntersectionObserver,
} from '~/helpers/index.js'

export default {
  layout: 'empty',
  directives: {
    intersect,
  },
  data() {
    return {
      startLoaded: false,
      animationEventObserver: undefined,
      gaEventObserver: undefined,
      isLoaded: false,
      shouldShowAnimation: false,
      hasSendGa: false,
      prevScroll: 0,
      isScrollDown: false,
      scrollerIconDirection: 'down',
      shouldShowScroller: false,
    }
  },

  computed: {
    ...mapGetters('viewport', ['viewportHeight']),
  },

  mounted() {
    this.setupAnimationEventObserver()
    this.setupGaEventObserver()
    window.addEventListener('scroll', this.handleScroll)
  },

  beforeDestroy() {
    this.cleanupObserver()
  },

  methods: {
    handleSearchVisibilityChange(isVisible) {
      if (isVisible) {
        this.scrollerIconDirection = 'up'
      } else {
        this.scrollerIconDirection = 'down'
      }
    },
    handleDashboardVisibilityChange(isVisible) {
      this.shouldShowScroller = isVisible
    },
    async setupAnimationEventObserver() {
      this.animationEventObserver = await setupIntersectionObserver(
        (entries) => {
          entries.forEach(({ intersectionRatio }) => {
            if (intersectionRatio >= 0.2) {
              this.shouldShowAnimation = true
            }
            if (intersectionRatio && !this.startLoaded) {
              const script = document.createElement('script')
              script.src =
                'https://unpkg.com/@twreporter/scrollable-video@1.0.0-rc.3/dist/main.142ef5f0d6d2dfdb8b8d.bundle.js'
              document.body.appendChild(script)
              this.startLoaded = true
            }
          })
        },
        { threshold: [0, 0.2, 1] }
      )
    },
    async setupGaEventObserver() {
      this.gaEventObserver = await setupIntersectionObserver((entries) => {
        entries.forEach(({ intersectionRatio }) => {
          if (
            intersectionRatio &&
            this.isLoaded &&
            !this.hasSendGa &&
            this.isScrollDown
          ) {
            this.$ga.event('projects', 'scroll', '滑到動畫結束')
            this.hasSendGa = true
          }
        })
      })
    },
    cleanupObserver() {
      cleanupIntersectionObserver(this, 'animationEventObserver')
      cleanupIntersectionObserver(this, 'gaEventObserver')
    },
    handleScroll() {
      this.isScrollDown = window.scrollY > this.prevScroll
      this.prevScroll = window.scrollY
      if (this.isLoaded) return
      const elHeight = this.$el.getBoundingClientRect().height
      this.isLoaded = elHeight > 2000
      window.scroll(0, this.prevScroll)
    },
    handleScrollerButtonClick() {
      console.log('click')
      const element = this.scrollerIconDirection === 'down' ? 'bottom' : 'start'
      console.log(element)
      scrollIntoView(
        document.querySelector(`#${element}-of-the-dashboard-story`)
      )
    },
  },

  head() {
    return {
      script: [
        {
          hid: 'animation1',
          async: true,
          innerHTML: `
            (function() {
              var namespace = '__twreporterEmbeddedData';
              var pkg = 'scrollable-video';
              if (typeof window != 'undefined') {
                if (!window.hasOwnProperty(namespace)) {
                  window[namespace] = {};
                }
                if (window[namespace] && !window[namespace].hasOwnProperty(pkg)) {
                  window[namespace][pkg] = [];
                }
                if (Array.isArray(window[namespace][pkg])) {
                  var data = {"video":{"sources":[{"type":"video\u002Fmp4","src":"https:\u002F\u002Fstorage.googleapis.com\u002Fdata-journalism-public\u002F2021-pigs\u002Fpigs_1280.mp4","width":1280,"height":720},{"type":"video\u002Fmp4","src":"https:\u002F\u002Fstorage.googleapis.com\u002Fdata-journalism-public\u002F2021-pigs\u002Fpigs_1440.mp4","width":1440,"height":810},{"type":"video\u002Fmp4","src":"https:\u002F\u002Fstorage.googleapis.com\u002Fdata-journalism-public\u002F2021-pigs\u002Fpigs_1920.mp4","width":1920,"height":1080},{"type":"video\u002Fmp4","src":"https:\u002F\u002Fstorage.googleapis.com\u002Fdata-journalism-public\u002F2021-pigs\u002Fpigs720.mp4","width":720,"height":1080},{"type":"video\u002Fmp4","src":"https:\u002F\u002Fstorage.googleapis.com\u002Fdata-journalism-public\u002F2021-pigs\u002Fpigs960.mp4","width":960,"height":1440}]},"captions":[{"text":"非洲豬瘟延燒 3 年，今年 8 月臺灣正式被攻破，敲響警鐘。全臺約 6400 間養豬場嚴陣以待，擔心重演 24 年前口蹄疫重創產業的惡夢。","time":0,"textAlign":"justify"},{"text":"回顧這 3 年，政府、海關、海巡、豬農是如何守備，讓臺灣成為亞洲少數未被攻破的國家；防線又是如何在今年出現破口，讓非洲豬瘟入侵？","time":1.5,"textAlign":"justify"},{"text":"回到第零天，中國出現非洲豬瘟感染，為亞洲國家首例。而作為跟中國往來密切的臺灣，被視為高感染風險的國家。","time":6,"textAlign":"justify"},{"text":"2018 年中國爆發非洲豬瘟感染，為亞洲國家首例。疫情蔓延迄今仍未解除，中國學者初估損失約 4.4 兆台幣。","time":9,"textAlign":"justify"},{"text":"時隔六個月，疫情傳播至越南，該國更成為亞洲地區感染最嚴重國家之一，累計案件數高達 8990 件。","time":13,"textAlign":"justify"},{"text":"東南亞各國開始出現零星案例。","time":15,"textAlign":"justify"},{"text":"菲律賓因非洲豬瘟感染損失至少 500 億臺幣，政府宣布進入國家級災害狀態。","time":23,"textAlign":"justify"},{"text":"南韓曾被視為防疫模範生，但自從被病毒攻破後，疫情便迅速擴張。","time":25,"textAlign":"justify"},{"text":"印尼也在 2019 年底跟著淪陷。","time":29,"textAlign":"justify"},{"text":"非洲豬瘟順著往來的足跡、貨物，攻佔鄰近國家，亞洲國家幾乎全境淪陷，臺灣也深陷風暴之中。","time":38,"textAlign":"justify"},{"text":"隨著國外疫情升溫，臺灣也開始出現來源不明的海漂豬、以及被任意棄置的豬屍，3 年來超過 200 件。而每次豬屍現蹤，都讓國內防疫人員繃緊神經，從確認豬屍是否感染非洲豬瘟、到擴大檢查周圍養豬場是否無染疫，不敢大意。","time":40,"textAlign":"justify"},{"text":"2018 年 12 月 31 日，首次在金門海邊的不明豬屍驗出非洲豬瘟陽性。","time":43,"textAlign":"justify"},{"text":"2021 年 4 月 4 日，新北市萬里岸邊再度出現陽性海漂豬案例，非洲豬瘟已兵臨城下。","time":46,"textAlign":"justify"},{"text":"除了海漂豬，觸動防線的還有每年透過走私來臺的肉品，也成為國內疫情隱憂。根據關務署統計，2018 年第一季查獲走私肉品高達 1933 件。","time":49,"textAlign":"justify"},{"text":"農委會進一步統計，從旅客身上查獲的違規肉品中，產地為中國者高達 60%，其次是約佔10% 的越南，這兩國正是非洲豬瘟疫情重災區。","time":52,"textAlign":"justify"},{"text":"2018 年 10 月 31 日，金門首度截獲非洲豬瘟陽性產品，而這並非唯一案例。<br>農委會採樣 3000 多件走私肉品中，有 9% 呈陽性；而呈陽性產品中，來自中國的高達 78%，越南也有 22%。","time":55,"textAlign":"justify"},{"text":"面對國際疫情升溫，加上遭非洲豬瘟感染的肉製品頻繁叩關，農委會祭出一連串措施，盡力保全國內養豬產業。","time":58,"textAlign":"justify"},{"text":"但即便全力圍堵，病毒卻仍從幽微縫隙竄出。","time":59,"textAlign":"justify"},{"text":"2021 年 8 月 22 日， 國內爆發走私非洲豬瘟肉品案，由空運輸入新北，此案凸顯過去 100% X 光檢驗政策失效，造成防疫漏洞，關務署坦言：「有檢討空間。」","time":61},{"text":"8 月 19 日新北市查獲 71 公斤走私的越南製肉品，為國內首起非洲豬瘟陽性案例，政府緊急清查全臺可能流向的超過 5000 處上下游通路。","time":63,"textAlign":"justify"},{"text":"9 月 1 日新竹市查獲越南雜貨店中盤商私自販售越南製火腿，擴大搜查後找出 322 公斤走私肉品，為國內目前最大宗走私肉品案。","time":65,"textAlign":"justify"},{"text":"自首例爆發後，各縣市皆積極搜查可疑店鋪（如越南雜貨店），彰化縣便查獲透過空運違法輸入的香腸、月餅等。","time":67,"textAlign":"justify"},{"text":"養豬大縣雲林，共檢驗出 4 件非洲豬瘟陽性案例，恐增加國內豬場感染風險。","time":69,"textAlign":"justify"},{"text":"8 月 25 日臺南市擴大搜查可疑店家及外籍配偶住處，並在民宅查獲越南製月餅，該產品來自國內越南雜貨店。","time":71,"textAlign":"justify"},{"text":"8 月 23 日高雄市查獲越南製荷葉包肉，檢調一路從高雄雜貨店追向嘉義、新北等地，確認源頭為新北市蘆洲雜貨店，違規在化妝品貨物中夾帶肉品進口，為國內首例找到走私肉品源頭。","time":73,"textAlign":"justify"},{"text":"儘管臺灣努力嚴守防線，1000 天後，非洲豬瘟仍正式入侵臺灣本土。","time":77,"textAlign":"justify"}],"appProps":{"captionsSetting":{"xBoxAlign":"right","xPosition":"8.7%","yBoxAlign":"bottom","yPosition":"20px"},"captionSetting":{"textAlign":"right"},"secondsPer100vh":1.5,"skipLoadLocationRegExp":"editor","forcedPreloadVideo":true,"gsapVersion":"3.5.1","scrollTriggerVersion":"3.5.1","pollingTimeout":700,"preloadCacheType":"force-cache"},"theme":{"mq":{"mobileMaxWidth":"767px"},"captions":{"color":"#fff","link":{"color":"#a67a44","underlineColor":"#a67a44"},"lineHieght":"1.7","mobileLineHeight":"1.7","fontStyle":"normal","fontWeight":"bold","fontSize":"24px","mobile":{"fontSize":"22px"},"fontFamily":"ff-tisa-web-pro, source-han-sans-traditional, Noto Sans TC, PingFang TC, Apple LiGothic Medium, Roboto, Microsoft JhengHei, Lucida Grande, Lucida Sans Unicode, sans-serif","box":{"background":"#404040","width":"450px","mobileWidth":"77%","spanPadding":"6px 15px","mobilePadding":"12px 12px 14px 18px"}}},"uuid":"b55dd62a-e932-436f-8447-2e85856f137c"};
                  window[namespace][pkg].push(data);
                }
              }
            })()
          `,
        },
      ],
      __dangerouslyDisableSanitizersByTagID: {
        animation1: ['innerHTML'],
      },
    }
  },
}
</script>

<style lang="scss" scoped>
#animation {
  background-color: rgb(0 0 0 / 18%);
  z-index: 3000;
  position: relative;
  #b55dd62a-e932-436f-8447-2e85856f137c {
    z-index: 3000;
  }
}

.scroller-button {
  position: fixed;
  z-index: 4000;
  bottom: 20px;
  right: 20px;
}
</style>
