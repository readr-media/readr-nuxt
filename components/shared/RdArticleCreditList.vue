<template>
  <div class="credit-list">
    <ul>
      <li v-for="item in formatedList" :key="item.key">
        <span class="title">{{ item.key }}</span>
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
  otherByline: '協同製作',
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
      return this.list?.map((item) => {
        return item.key === 'otherByline'
          ? {
              key: CONTACT_MAPPING[item.key],
              data: [item.data],
            }
          : {
              key: CONTACT_MAPPING[item.key],
              data: item.data,
            }
      })
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
      @include media-breakpoint-up(md) {
        font-size: 16px;
      }
      .title {
        position: relative;
        color: rgba(0, 9, 40, 0.66);
        padding: 0 28px 0 0;
        &::after {
          content: '';
          position: absolute;
          top: 11px;
          right: 3px;
          width: 20px;
          height: 1px;
          background-color: rgba(0, 9, 40, 0.66);
        }
      }
      .names {
        display: inline-flex;
        align-items: center;
        color: #000928;
        span {
          position: relative;
        }
        span + span {
          padding: 0 0 0 20px;
          &::after {
            content: '';
            position: absolute;
            top: 8px;
            left: 9px;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: rgba(0, 9, 40, 0.2);
            @include media-breakpoint-up(md) {
              top: 11px;
            }
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
