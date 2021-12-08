<template>
  <div class="referendum">
    <div class="referendum__title">
      <div class="referendum__title_main">
        <div class="referendum__title_main_title">公投開票進度</div>
        <div class="referendum__title_main_note">
          <span class="agree">同意</span>
          <span class="disagree">不同意</span>
        </div>
      </div>
      <div class="referendum__title_info">
        <div>開票進度：29%｜最後更新時間：2021/12/18 14:29</div>
      </div>
    </div>
    <div class="referendum__info">
      <ReferendumItem
        number="17"
        name="重啟核四"
        :data="data.F1"
        :threhold="4980000"
      />
      <ReferendumItem
        number="18"
        name="反萊豬進口"
        :data="data.F2"
        :threhold="4980000"
      />
      <ReferendumItem
        number="19"
        name="公投綁大選"
        :data="data.F3"
        :threhold="4980000"
      />
      <ReferendumItem
        number="20"
        name="珍愛藻礁"
        :data="data.F4"
        :threhold="4980000"
      />
    </div>
    <div class="referendum__title_info rwd">
      <div>開票進度：29%<br />最後更新時間：2021/12/18 14:29</div>
    </div>
  </div>
</template>

<script>
import ReferendumItem from '../components/report/referendum/components/ReferendumItem.vue'
export default {
  layout: 'empty',
  components: {
    ReferendumItem,
  },
  data() {
    return {
      data: {
        ST: '1020161637',
        F1: {
          agreeTks: 5673987,
          agreeRate: 58.61,
          disagreeTks: 4007113,
          disagreeRate: 41.39,
          prgRate: 100.0,
        },
        F2: {
          agreeTks: 4940437,
          agreeRate: 49.99,
          disagreeTks: 4942123,
          disagreeRate: 50.01,
          prgRate: 100.0,
        },
        F3: {
          agreeTks: 6904163,
          agreeRate: 68.52,
          disagreeTks: 3171974,
          disagreeRate: 31.48,
          prgRate: 100.0,
        },
        F4: {
          agreeTks: 3285155,
          agreeRate: 34.64,
          disagreeTks: 6198238,
          disagreeRate: 65.36,
          prgRate: 100.0,
        },
      },
    }
  },
}
</script>

<style lang="scss" scoped>
$agree-color: #009045;
$disagree-color: #e51731;

.referendum {
  padding: 16px 24px;
  background: #f3f5f7;
  max-width: 704px;
  @include media-breakpoint-up(xl) {
    max-width: 970px;
  }

  &__title {
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    &_main {
      display: flex;
      justify-content: space-between;
      width: 100%;
      @include media-breakpoint-up(md) {
        justify-content: flex-start;
        width: fit-content;
      }
      &_title {
        font-weight: 600;
        font-size: 16px;
        line-height: 22px;
        color: #4a4a4a;
        margin-right: 24px;
        @include media-breakpoint-up(md) {
          font-size: 18px;
          line-height: 25px;
        }
      }
      &_note {
        font-size: 13px;
        line-height: 18px;
        color: #4a4a4a;
        @include media-breakpoint-up(md) {
          font-size: 16px;
          line-height: 22px;
        }
        span:before {
          content: '';
          display: inline-block;
          width: 8px;
          height: 8px;
          margin-right: 4px;
          @include media-breakpoint-up(md) {
            width: 12px;
            height: 12px;
          }
        }
        .agree:before {
          background: $agree-color;
        }
        .disagree:before {
          background: $disagree-color;
        }
        span + span {
          margin-left: 12px;
        }
      }
    }
    &_info {
      display: none;
      @include media-breakpoint-up(md) {
        display: block;
        font-size: 13px;
        line-height: 18px;
        color: #9b9b9b;
      }
    }
  }

  &__info {
    display: flex;
    flex-wrap: wrap;
  }

  .rwd {
    display: block;
    font-size: 13px;
    line-height: 18px;
    color: #9b9b9b;
    margin-top: 12px;
    @include media-breakpoint-up(md) {
      display: none;
    }
  }
}
</style>
