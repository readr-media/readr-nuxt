<template>
  <div class="social-list">
    <ul>
      <li v-for="item in socialList" :key="item.name">
        <a
          :href="`${item.href}${shareUrl}`"
          class="share"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>
            <img :src="item.icon" :alt="`分享至${item.name}`" loading="lazy" />
          </span>
        </a>
      </li>
      <li>
        <button type="button" class="share" @click.prevent="copyLink">
          <span>
            <img
              src="~/assets/imgs/copy-link.svg"
              alt="複製連結"
              loading="lazy"
            />
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RdArticleSocialList',

  props: {
    url: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      isMounted: false,
      socialList: [
        {
          name: 'facebook',
          icon: require('~/assets/imgs/fb.svg'),
          href: `https://www.facebook.com/share.php?u=`,
        },
        {
          name: 'twitter',
          icon: require('~/assets/imgs/twitter.svg'),
          href: `https://twitter.com/intent/tweet?url=`,
        },
        {
          name: 'line',
          icon: require('~/assets/imgs/line.svg'),
          href: `https://social-plugins.line.me/lineit/share?url=`,
        },
      ],
    }
  },
  computed: {
    shareUrl() {
      return encodeURIComponent(this.url || (this.isMounted && location.href))
    },
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    copyLink() {
      /*
       * Since element.focus({preventScroll: boolean})
       * not work in safari, we memory the depth when user clicked
       * doc: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
       */
      if (window) {
        const depth = window.pageYOffset
        const inputc = document.body.appendChild(
          document.createElement('input')
        )
        inputc.value = this.shareUrl
        // inputc.focus({ preventScroll: true })
        inputc.select()
        document.execCommand('copy')
        inputc.parentNode.removeChild(inputc)
        window.alert('連結已複製')
        window.scrollTo(0, depth)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.social-list {
  ul {
    display: flex;
    align-items: center;
    li {
      .share {
        display: inline-block;
        width: 36px;
        height: 36px;
        span {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          &::after {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            border-radius: 50%;
            background-color: #f6f6fb;
            z-index: -1;
          }
          &:hover,
          &:active {
            &::after {
              background-color: #9b9b9b;
              opacity: 0.05;
            }
          }
        }
        img {
          display: block;
          width: 50%;
          height: 50%;
        }
      }
    }
    li + li {
      margin: 0 0 0 16px;
    }
  }
}
</style>
