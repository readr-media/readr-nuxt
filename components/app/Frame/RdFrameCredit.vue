<template>
  <div v-intersect="gaEventObserver" class="report-credit">
    <div class="credit-list">
      <ul>
        <li v-for="item in formatedList" :key="item.key">
          <div v-if="!item.special" class="normal-item">
            <div class="title">{{ item.key }}：</div>
            <span v-for="(person, i) in item.data" :key="i">
              {{ i === 0 ? '' : '、' }}{{ person.name }}
            </span>
          </div>
          <!-- workaround: 特殊頁面需要客製化 credit 清單，在 cms Post 作者（其他）欄位中以星號開頭來啟用，以全形的'／'來產生換行效果 -->
          <div v-else>
            <div class="title">{{ item.key }}：</div>
            <div v-for="(person, i) in item.data" :key="i">
              {{ person.name }}
            </div>
          </div>
        </li>
      </ul>
    </div>

    <p v-if="publishedAt" class="published-at">{{ publishedAt }}</p>
  </div>
</template>

<script>
import { intersect } from '~/helpers/vue/directives/index.js'

import {
  setupIntersectionObserver,
  cleanupIntersectionObserver,
} from '~/helpers/index.js'
const CONTACT_MAPPING = {
  writers: '記者',
  photographers: '攝影',
  cameraOperators: '影音',
  designers: '設計',
  engineers: '工程',
  dataAnalysts: '資料分析',
  otherByline: '共同製作',
}
export default {
  name: 'RdReportCredit',

  directives: {
    intersect,
  },

  props: {
    authors: {
      type: Array,
      required: true,
      default: () => [],
    },
    credits: {
      type: Array,
      required: true,
      default: () => [],
    },
    publishedAt: {
      type: String,
      default: undefined,
    },
    canSendGaEvent: {
      type: Boolean,
      required: true,
      default: true,
    },
  },

  data() {
    return {
      gaEventObserver: undefined,
    }
  },
  computed: {
    formatedList() {
      return this.credits?.map((item) => ({
        key: CONTACT_MAPPING[item.key],
        data: item.data,
        special: item.special,
      }))
    },
  },
  mounted() {
    this.setupGaEventObserver()
  },

  beforeDestroy() {
    this.cleanupGaEventObserver()
  },

  methods: {
    formatAuthor(author) {
      return `${author.role}：${author.names.join('、')}`
    },
    formatCreditList(credit) {
      return `${credit.key}: ${credit.data[0].name}`
    },
    async setupGaEventObserver() {
      this.gaEventObserver = await setupIntersectionObserver((entries) => {
        entries.forEach(({ intersectionRatio }) => {
          if (intersectionRatio > 0) {
            this.$ga.event('projects', 'scroll', 'scroll to credit')
            this.cleanupGaEventObserver()
          }
        })
      })
    },
    cleanupGaEventObserver() {
      cleanupIntersectionObserver(this, 'gaEventObserver')
    },
  },
}
</script>

<style lang="scss" scoped>
.report-credit {
  padding: 48px 20px;
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.2px;
  color: #2b2b2b;
  text-align: center;
  @include media-breakpoint-up(md) {
    padding: 48px 32px;
  }
}

.published-at {
  margin-top: 16px;
}

.credit-list {
  width: 100%;
  max-width: 568px;
  margin: 0 auto;
  @include media-breakpoint-up(xl) {
    width: 600px;
    max-width: 600px;
  }
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    li {
      width: fit-content;
      font-size: 14px;
      line-height: 1.5;
      display: flex;
      margin: 0 10px;
      flex-wrap: wrap;
      justify-content: center;
      @include media-breakpoint-up(md) {
        font-size: 16px;
      }
      .normal-item {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
      }
      .title {
        color: rgba(0, 9, 40, 0.66);
      }
    }
  }
}
</style>
