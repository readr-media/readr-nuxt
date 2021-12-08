<template>
  <div class="referendum-item">
    <div class="referendum-item__name">
      <div class="referendum-item__name_number">第 {{ number }} 案</div>
      <div>{{ name }}</div>
    </div>
    <div class="referendum-item__bar">
      <Bar
        :tickets="numberWithCommas(data.agreeTks)"
        :rate="data.agreeRate"
        :isAgree="true"
      />
      <Bar
        :tickets="numberWithCommas(data.disagreeTks)"
        :rate="data.disagreeRate"
        :isAgree="false"
      />
      <div class="referendum-item__bar_status">
        <span v-if="status === 'cat'"
          >通過門檻：{{ numberWithCommas(threhold) }}</span
        >
        <span v-if="status === 'agree'" class="status__agree">同意</span>
        <span v-if="status === 'disagree'" class="status__disagree">同意</span>
      </div>
    </div>
  </div>
</template>

<script>
import Bar from './Bar.vue'
export default {
  components: {
    Bar,
  },
  props: {
    number: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    data: {
      type: Object,
      default: () => {},
    },
    threhold: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    status() {
      switch (Math.max(this.agree, this.disagree, this.threhold)) {
        case this.agree: {
          return 'agree'
        }
        case this.disagree: {
          return 'disagree'
        }
        default: {
          return 'cat'
        }
      }
    },
  },
  methods: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    },
  },
}
</script>

<style lang="scss" scoped>
$agree-color: #009045;
$disagree-color: #e51731;

.referendum-item {
  margin-top: 12px;
  display: flex;
  width: 100%;
  &:nth-child(2n) {
    @include media-breakpoint-up(md) {
      margin-left: 24px;
    }
    @include media-breakpoint-up(xl) {
      margin-left: 80px;
    }
  }
  @include media-breakpoint-up(md) {
    max-width: 316px;
  }
  @include media-breakpoint-up(xl) {
    max-width: 421px;
  }
  &__name {
    width: 80px;
    font-size: 13px;
    line-height: 18px;
    color: #4a4a4a;
    @include media-breakpoint-up(md) {
      font-size: 16px;
      line-height: 22px;
      width: 96px;
    }
    @include media-breakpoint-up(xl) {
      width: 104px;
    }
    &_number {
      margin-bottom: 2px;
      color: #9b9b9b;
    }
  }
  &__bar {
    flex: 1;
    &_status {
      font-size: 13px;
      line-height: 18px;
      color: #9b9b9b;

      .status__agree {
        color: $agree-color;
      }
      .status__agree {
        color: $disagree-color;
      }
    }
  }
}
</style>
