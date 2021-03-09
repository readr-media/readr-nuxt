<template>
  <a :href="href" target="_blank" @click="$emit('sendGaEvent')">
    <div class="hero-block">
      <div class="img-wrapper">
        <img
          v-lazy="{
            src: heroImg,
            error: require('~/assets/default/collaboration.svg'),
          }"
          alt=""
        />
      </div>

      <div v-if="canCollaborate" class="require-time">
        只要 {{ item.requireTime }} 分鐘
      </div>
      <button type="button" :class="{ 'in-production': inProduction }">
        {{ actionBtnText }}
      </button>
    </div>

    <div class="content-block">
      <h1>{{ item.title }}</h1>
      <p class="description">{{ item.description }}</p>
      <div class="progress">
        <div class="progress__bar">
          <div :style="{ width: progress }" />
        </div>
        <div class="progress__num">{{ progress }}</div>
      </div>
      <div class="date">{{ remainingDays }}</div>
    </div>
  </a>
</template>

<script>
export default {
  name: 'RdCollaborativeListItem',
  props: {
    item: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      now: this.$dayjs(),
    }
  },
  computed: {
    href() {
      return this.item.achvLink || this.item.collabLink
    },
    heroImg() {
      return this.item.heroImage?.urlMobileSized
    },
    progress() {
      return `${this.item.progress || 0}%`
    },
    remainingDays() {
      const days = this.$dayjs(this.item.endTime).diff(this.now, 'day')
      if (days < 0) {
        return '已結束'
      }

      return `還剩 ${days} 天`
    },
    beyondEndTime() {
      return this.remainingDays === '已結束'
    },
    hasAchvLink() {
      return this.item.achvLink !== null
    },
    canCollaborate() {
      return !this.hasAchvLink && !this.beyondEndTime
    },
    inProduction() {
      return !this.hasAchvLink && this.beyondEndTime
    },
    actionBtnText() {
      if (this.canCollaborate) {
        return '我要協作'
      } else if (this.inProduction) {
        return '專題製作中'
      } else {
        return '前往專題'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
a {
  display: block;
  letter-spacing: 2.5px;
  &:hover img {
    transform: scale(1.1);
  }
  &:active button {
    border-width: 2px;
  }
}

.hero-block {
  position: relative;
}

.img-wrapper {
  padding-top: 100%;
  position: relative;
  overflow: hidden;
  @include media-breakpoint-up(md) {
    padding-top: 50%;
  }
}

img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.require-time {
  position: absolute;
  top: 8px;
  left: 7px;
  background-color: #ebf02c;
  border-radius: 22px;
  font-size: 13px;
  color: #04295e;
  line-height: 2;
  padding: 2px 12px;
  font-weight: 600;
  @include media-breakpoint-up(md) {
    top: 6px;
    left: 6px;
  }
}
button {
  position: absolute;
  bottom: 7px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #04295e;
  font-size: 15px;
  letter-spacing: 2.5px;
  color: #fff;
  padding-top: 10px;
  padding-bottom: 10px;
  width: calc(100% - 14px);
  font-weight: 700;
  border-radius: 2px;
  border: 1px solid #fff;
  outline: none;
  &.in-production {
    background-color: #979797;
  }
  @include media-breakpoint-up(md) {
    max-width: 160px;
    bottom: 6px;
    left: 6px;
    transform: none;
  }
}

.content-block {
  padding: 9px 7px 14px 7px;
  @include media-breakpoint-up(md) {
    padding-top: 11px;
    padding-left: 6px;
    padding-right: 6px;
  }
}
.description {
  font-size: 13px;
  color: rgba(#000, 0.66);
  letter-spacing: 1px;
  margin-bottom: 9px;
  // 13 * 1.5 * 2
  min-height: 39px;

  word-wrap: break-word;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  @include media-breakpoint-up(md) {
    font-size: 15px;
    letter-spacing: 1.5px;
    -webkit-line-clamp: 1;
    // 15 * 1.5 * 1
    min-height: 22.5px;
    margin-bottom: 6px;
  }
}

h1 {
  font-size: 15px;
  font-weight: 700;
  word-wrap: break-word;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  // 15 * 1.5 * 2
  min-height: 45px;
  margin-bottom: 6px;
  @include media-breakpoint-up(md) {
    margin-bottom: 11px;
    font-size: 18px;
    // 18 * 1.5 * 2
    min-height: 54px;
  }
}
.progress {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3px;
  @include media-breakpoint-up(md) {
    margin-bottom: 2px;
  }
  &__bar {
    background-color: rgba(216, 216, 216, 0.5);
    height: 8px;
    flex: 0 1 68.18%;
    overflow: hidden;
    @include media-breakpoint-up(md) {
      height: 10px;
      flex-basis: 81.82%;
    }
    div {
      background-color: #ebf02c;
      height: 100%;
    }
  }
  &__num {
    font-size: 15px;
    font-weight: 700;
    text-align: right;
    flex: 0 0 auto;
    margin-left: 12px;
    @include media-breakpoint-up(md) {
      font-size: 18px;
    }
  }
}
.date {
  font-size: 13px;
  line-height: 1.4;
  color: rgba(#000, 0.66);
}
</style>
