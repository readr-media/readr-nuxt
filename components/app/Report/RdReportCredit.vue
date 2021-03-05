<template>
  <div class="report-credit">
    <div class="container">
      <ul>
        <li v-for="author in authors" :key="author.role">
          {{ formatAuthor(author) }}
        </li>
      </ul>
    </div>

    <p v-if="publishedAt" class="published-at">{{ publishedAt }}</p>
  </div>
</template>

<script>
export default {
  name: 'RdReportCredit',

  props: {
    authors: {
      type: Array,
      required: true,
      default: () => [],
    },
    publishedAt: {
      type: String,
      default: undefined,
    },
  },

  methods: {
    formatAuthor(author) {
      return `${author.role}：${author.names.join('、')}`
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

.container {
  max-width: 1136px;
  margin: 0 auto;
}

ul {
  margin: -4px 0;
  @include media-breakpoint-up(md) {
    margin: -8px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  @include media-breakpoint-up(xl) {
    margin: -8px -12px;
  }
}

li {
  margin: 4px 0;
  @include media-breakpoint-up(md) {
    margin: 8px;
  }
  @include media-breakpoint-up(xl) {
    margin: 8px 12px;
  }
}

.published-at {
  margin-top: 16px;
}
</style>
