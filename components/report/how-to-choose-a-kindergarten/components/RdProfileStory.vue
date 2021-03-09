<template>
  <div class="profile-story">
    <RdMainTitle :text="cmsData.title" class="profile-story__main-title" />

    <section
      v-for="(story, storyIdx) in cmsData.stories"
      :key="story.name"
      class="story"
    >
      <div class="header" @click="toggleBody(storyIdx)">
        <img
          :src="
            require(`~/assets/report/how-to-choose-a-kindergarten/profile${
              storyIdx + 1
            }.png`)
          "
          alt=""
        />
        <div class="intro">
          <div class="intro__title">
            <span>{{ story.name }}</span>
            <span class="keyword">{{ story.keyword }}</span>
          </div>
          <p>{{ story.description }}</p>
        </div>

        <SvgArrow :class="{ open: shouldOpenBodies[storyIdx] }" />
      </div>

      <div v-if="shouldOpenBodies[storyIdx]" class="body">
        <h3 class="htcak-h2">{{ story.title }}</h3>

        <div class="cares">
          <h4 class="htcak-small">獨家挑選心法</h4>
          <div class="wrapper">
            <div
              v-for="(care, idx) in story.cares.slice(0, 3)"
              :key="care"
              class="care"
            >
              <img
                :src="
                  require(`~/assets/report/how-to-choose-a-kindergarten/num${
                    idx + 1
                  }.png`)
                "
                alt=""
              />
              <span class="htcak-h3">{{ care }}</span>
            </div>
          </div>
          <div class="care-less">
            {{ `> ${story.cares.slice(3).join(' > ')}` }}
          </div>
        </div>

        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="htcak-body" v-html="content(story)"></div>
      </div>
    </section>
  </div>
</template>

<script>
import RdMainTitle from './RdMainTitle.vue'

import SvgArrow from '~/assets/report/how-to-choose-a-kindergarten/arrow.svg?inline'

export default {
  name: 'RdProfileStory',

  components: {
    RdMainTitle,
    SvgArrow,
  },

  props: {
    cmsData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },

  data() {
    return {
      shouldOpenBodies: [],
      wereGaEventsSent: [],
    }
  },

  beforeMount() {
    const { length } = this.cmsData.stories
    this.shouldOpenBodies = Array(length).fill(false)
    this.wereGaEventsSent = Array(length).fill(false)
  },

  methods: {
    toggleBody(idx) {
      this.$set(this.shouldOpenBodies, idx, !this.shouldOpenBodies[idx])
      if (!this.wereGaEventsSent[idx]) {
        this.$emit('sendGaEvent', { action: 'click', label: `家長${idx + 1}` })
        this.$set(this.wereGaEventsSent, idx, true)
      }
    },
    content(story) {
      return story.content.replace(/\n/g, '<br />')
    },
  },
}
</script>

<style lang="scss" scoped>
.profile-story {
  padding: 48px 8px;
  max-width: 640px;
  margin: 0 auto;
  box-sizing: content-box;
  @include media-breakpoint-up(xl) {
    padding: 60px 8px;
  }

  &__main-title {
    margin-bottom: 24px;
    @include media-breakpoint-up(md) {
      margin-bottom: 36px;
    }
    @include media-breakpoint-up(xl) {
      margin-bottom: 48px;
    }
  }
}

.story {
  background-color: #fff;
  box-shadow: 0px 2px 8px -2px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  padding: 16px;
  @include media-breakpoint-up(md) {
    padding: 24px 32px;
  }

  + .story {
    margin-top: 12px;
    @include media-breakpoint-up(md) {
      margin-top: 16px;
    }
  }
}

.header {
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
  user-select: none;
  @include media-breakpoint-up(md) {
    font-size: 18px;
    line-height: 27px;
  }

  img {
    width: 50px;
    @include media-breakpoint-up(md) {
      width: 70px;
    }
  }

  svg {
    margin-left: auto;
    transition: transform 0.45s;

    &.open {
      transform: rotate(-180deg);
    }
  }
}

.intro {
  letter-spacing: 0.0012em;
  margin-left: 12px;
  font-weight: 300;
  @include media-breakpoint-up(md) {
    letter-spacing: 0.006em;
  }

  &__title {
    display: flex;
    align-items: center;
    font-weight: 500;
  }
}

.keyword {
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.2px;
  color: #161616;
  padding: 0 4px;
  background-color: var(--primary-color);
  margin-left: 4px;
  @include media-breakpoint-up(md) {
    margin-left: 8px;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0;
    padding: 0 8px;
  }
}

svg {
  @include media-breakpoint-up(md) {
    width: 28px;
    height: auto;
  }
}

.body {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  padding: 24px 0 8px 0;
  overflow-anchor: none;
  @include media-breakpoint-up(md) {
    padding: 24px 0;
  }
}

.cares {
  margin-bottom: 24px;
  @include media-breakpoint-up(md) {
    margin-bottom: 32px;
  }
}

.wrapper {
  margin-bottom: 8px;
  @include media-breakpoint-up(md) {
    display: flex;
    align-items: center;
  }
}

.care {
  display: flex;
  align-items: center;

  + .care {
    margin: 4px 0 0 0;
    @include media-breakpoint-up(md) {
      margin: 0 0 0 20px;
    }
  }

  img {
    width: 24px;
    margin-right: 8px;
  }
}

.care-less {
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
}

h3 {
  margin-bottom: 16px;
  @include media-breakpoint-up(md) {
    margin-bottom: 20px;
  }
}

h4 {
  margin-bottom: 8px;
}
</style>
