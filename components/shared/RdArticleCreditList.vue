<template>
  <div class="credit-list">
    <ul>
      <li v-for="item in formatedList" :key="item.key">
        <div
          class="title"
          :class="{ extra: item.key === '數據分析' || item.key === '共同製作' }"
        >
          {{ item.key }}
        </div>
        <div class="names">
          <span v-for="(person, i) in item.data" :key="i">
            {{ person.name }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
const CONTACT_MAPPING = {
  writers: '記者',
  photographers: '攝影',
  cameraOperators: '影音',
  designers: '設計',
  engineers: '工程',
  dataAnalysts: '數據分析',
  otherByline: '共同製作',
}

export default {
  name: 'RdArticleCreditList',

  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    formatedList() {
      return this.list?.map((item) => ({
        key: CONTACT_MAPPING[item.key],
        data: item.data,
      }))
    },
  },
}
</script>

<style lang="scss" scoped>
.credit-list {
  ul {
    li {
      font-size: 14px;
      line-height: 1.5;
      display: flex;
      @include media-breakpoint-up(md) {
        font-size: 16px;
      }
      .title {
        width: 32px;
        min-width: 32px;
        display: block;
        color: rgba(0, 9, 40, 0.66);
        &.extra {
          width: 64px;
          min-width: 64px;
        }
      }
      .names {
        position: relative;
        display: block;
        color: #000928;
        padding: 0 0 0 28px;
        span {
          position: relative;
        }
        span + span {
          padding: 0 0 0 20px;
          &::after {
            content: '';
            position: absolute;
            top: 9px;
            left: 7px;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: rgba(0, 9, 40, 0.2);
            @include media-breakpoint-up(md) {
              top: 11px;
            }
          }
        }
        &::before {
          content: '';
          position: absolute;
          top: 10px;
          left: 3px;
          width: 20px;
          height: 1px;
          background-color: rgba(0, 9, 40, 0.66);
          @include media-breakpoint-up(md) {
            top: 12px;
            left: 4px;
          }
        }
      }
    }
    li + li {
      margin: 4px 0 0;
    }
  }
}
</style>
