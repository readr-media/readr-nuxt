<template>
  <div class="horizontal-list">
    <article v-for="project in projects" :key="project.id">
      <a :href="project.link" target="_blank">
        <picture>
          <img :src="project.heroImage" alt="" />
          <button type="button">我要協作</button>
        </picture>
        <h1>{{ project.title }}</h1>
        <div class="progress">
          <div class="progress__bar">
            <div :style="{ width: progress(project.progress) }" />
          </div>
          <div class="progress__num">{{ progress(project.progress) }}</div>
        </div>
        <div class="date">
          {{ remainingDays(project.endTime) }}
        </div>
      </a>
    </article>
  </div>
</template>

<script>
export default {
  name: 'DumbHorizontalList',
  props: {
    projects: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  data() {
    return {
      now: this.$dayjs(),
    }
  },
  methods: {
    progress(progress = 0) {
      return `${progress}%`
    },
    remainingDays(endTime) {
      if (!endTime) {
        return
      }

      const days = this.$dayjs(endTime).diff(this.now, 'day')
      return `還剩 ${days} 天`
    },
    // hasTitle(title) {
    //   return Boolean(title)
    // },
  },
}
</script>

<style lang="scss" scoped>
.horizontal-list {
  color: rgba(#000, 0.87);
  font-size: 15px;
  line-height: 1.5;
  display: flex;
  overflow-y: auto;
  @include media-breakpoint-up(md) {
    font-size: 18px;
  }
}
article {
  flex: 0 0 63.33%;
  max-width: 342px;
  + article {
    margin-left: 14px;
    @include media-breakpoint-up(md) {
      margin-left: 22px;
    }
  }
  &:last-child {
    padding-right: 14px;
    box-sizing: content-box;
    @media (min-width: 1096px) {
      // (100vw - 1096px) / 2 + 20px
      padding-right: calc(50vw - 528px);
    }
    @media (min-width: 1136px) {
      // (100vw - 1096px) / 2
      padding-right: calc(50vw - 548px);
    }
  }
}
a {
  display: block;
  user-select: none;
  cursor: pointer;
}
picture {
  padding-top: 50%;
  position: relative;
  display: block;
  margin-bottom: 8px;
  @include media-breakpoint-up(md) {
    margin-bottom: 11px;
  }
}
img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f5ebff;
  letter-spacing: 2.5px;
  color: #000928;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 110px;
  font-weight: 700;
  border-radius: 2px;
  border: 1px solid #fff;
  @include media-breakpoint-up(md) {
    width: 160px;
  }
}
h1 {
  letter-spacing: 2.5px;
  font-weight: 700;
  word-wrap: break-word;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  // 45 = 15 * 1.5 * 2
  min-height: 45px;
  margin-bottom: 6px;
  @include media-breakpoint-up(md) {
    margin-bottom: 4px;
  }
}
.progress {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  @include media-breakpoint-up(md) {
    margin-bottom: 4px;
  }
  &__bar {
    background-color: rgba(216, 216, 216, 0.5);
    height: 8px;
    flex: 0 0 76.84%;
    overflow: hidden;
    @include media-breakpoint-up(md) {
      height: 10px;
      flex-basis: 81.29%;
    }
    & div {
      background-color: #ebf02c;
      height: 100%;
    }
  }
  &__num {
    letter-spacing: 2.5px;
    font-weight: 700;
  }
}
.date {
  font-size: 13px;
  line-height: 1.4;
  color: rgba(#000, 0.66);
  margin-bottom: 8px;
  @include media-breakpoint-up(md) {
    margin-bottom: 12px;
  }
}
</style>
