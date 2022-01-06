<template>
  <section
    v-observe-visibility="handleDashboardVisibilityChange"
    class="dashboard"
  >
    <ClientOnly>
      <aside
        v-show="isAsideToggled"
        class="dashboard__aside-wrapper aside-wrapper"
        @click="handleCloseAside"
      >
        <section class="aside-wrapper__aside aside" @click.stop>
          <ButtonClose
            style="
              position: sticky;
              top: 4px;
              right: 4px;
              align-self: flex-end;
            "
            @click.native="handleCloseAside"
          />
          <div class="result-count result-count--black result-count--bold">
            <p>你的篩選結果</p>
            <p>
              共
              <span class="result-count__number">
                {{ $store.state.data.data.length }}
              </span>
              筆
            </p>
          </div>
          <button
            class="aside__reset-filter-button reset-filter-button"
            style="color: #979797; margin-top: 12px;"
            @click="handleReset"
          >
            <span>
              清除篩選
            </span>
            <img
              v-show="isResetLoading"
              src="~/assets/imgs/report/legislature/loading.gif"
              alt="reset-loading-icon"
            />
          </button>
          <nav
            class="aside__aside-preset-filters-nav preset-filters-nav"
            style="margin-top: 12px;"
          >
            <TagPreset
              v-for="tag in tags"
              :key="tag.text"
              class="aside-preset-filters-nav__filter"
              style="cursor: pointer;"
              :emoji="tag.emoji"
              :text="tag.text"
              :textColor="tag.textColor"
              @click.native="handleClickAsidePresetFilter(tag.text)"
            />
          </nav>
          <Sorts style="margin: 9px 0 0 0;" />
          <div class="divider" />
          <Colors />
          <div class="divider" />
          <Filters />
        </section>
      </aside>
      <main class="dashboard__main main">
        <div id="top-of-the-dashboard" />
        <Lightbox
          v-show="isPresetFilterLightboxVisible"
          class="main__lightbox"
          @close="handleClosePresetFilterLightbox"
        >
          <div style="background-color: #555555;">
            <PresetFilterInfo />
          </div>
        </Lightbox>
        <Search
          id="search-of-the-dashboard"
          v-observe-visibility="handleSearchVisibilityChange"
          class="main__search-mobile"
          @clickBill="handleLightBoxShow"
          @clickPeople="handleSearchPeople"
        />
        <nav class="main__preset-filters-nav preset-filters-nav">
          <ButtonPrimary
            v-for="[filterName, filterValue] in Object.entries(
              $store.state.data.presetFilters
            )"
            :key="filterName"
            class="preset-filters-nav__preset-filter-button"
            :active="filterValue"
            @click.native="handleOpenPresetFilterLightbox(filterName)"
          >
            {{ filterName }}
          </ButtonPrimary>
        </nav>
        <nav class="main__normal-filters-nav normal-filters-nav">
          <ButtonSecondary
            class="normal-filters-nav__aside-toggle aside-toggle"
            @click.native="handleAsideToggle"
          >
            展開所有篩選器
          </ButtonSecondary>
          <Select
            class="normal-filters-nav__select-preset-filters"
            :defaultText="'綜合指標 ▼'"
            :options="optionsPresetFilters"
            @clickOption="handleSelectPresetFilterOptionClick"
          />
          <Search
            v-observe-visibility="handleSearchVisibilityChange"
            class="main__search-desktop"
            @clickBill="handleLightBoxShow"
            @clickPeople="handleSearchPeople"
          />
          <p class="normal-filters-nav__result-count result-count">
            你的篩選結果 共
            <span class="result-count__number">
              {{ $store.state.data.data.length }}
            </span>
            筆
          </p>
          <button
            class="normal-filters-nav__reset-filter-button reset-filter-button"
            @click="handleReset"
          >
            <span>
              清除篩選
            </span>
            <img
              v-show="isResetLoading"
              src="~/assets/imgs/report/legislature/loading.gif"
              alt="reset-loading-icon"
            />
          </button>
          <SelectSorts class="normal-filters-nav__select-sorts" />
        </nav>
        <Legends class="main__legends" />
        <DashboardGridChart
          class="main__grid-chart"
          :tooltip="lightBoxData"
          :isTooltipVisible="isLightBoxVisible"
          @clickGridItem="handleLightBoxShow"
          @closeLightbox="isLightBoxVisible = false"
        />
      </main>
      <button
        v-show="shouldShowScroller"
        class="scroller-button"
        @click="handleScrollerButtonClick"
      >
        <img
          src="~/assets/imgs/report/legislature/arrow-dashboard-scroller.svg"
          alt="scroller-icon"
          :style="{
            transition: 'transform 0.25s ease-out',
            transform: `rotate(${
              scrollerIconDirection === 'down' ? '180deg' : '0'
            })`,
          }"
        />
      </button>
      <div
        id="bottom-of-the-dashboard"
        v-observe-visibility="handleBottomOfTheDashboardVisibilityChanged"
      />
    </ClientOnly>
  </section>
</template>

<script>
import scrollIntoView from 'scroll-into-view'
import billPresets from '../constants/billPresets.json'
import Search from './Search.vue'
import Colors from './Colors.vue'
import Sorts from './Sorts.vue'
import Filters from './Filters.vue'
import ButtonPrimary from './ButtonPrimary.vue'
import ButtonSecondary from './ButtonSecondary.vue'
import Legends from './Legends.vue'
import DashboardGridChart from './DashboardGridChart.vue'
import TagPreset from './TagPreset.vue'
import ButtonClose from './ButtonClose.vue'
import Select from './Select.vue'
import SelectSorts from './SelectSorts.vue'
import Lightbox from './Lightbox.vue'
import PresetFilterInfo from './PresetFilterInfo.vue'

export default {
  components: {
    Search,
    Colors,
    Sorts,
    Filters,
    ButtonPrimary,
    ButtonSecondary,
    Legends,
    DashboardGridChart,
    TagPreset,
    ButtonClose,
    Select,
    SelectSorts,
    Lightbox,
    PresetFilterInfo,
  },
  data() {
    return {
      isAsideToggled: false,
      lightBoxData: {},
      isLightBoxVisible: false,
      shouldShowScroller: false,
      scrollerIconDirection: 'down',

      isPresetFilterLightboxVisible: false,

      isScrollToBottomOfTheDashboardAlready: false,

      isResetLoading: false,
    }
  },
  computed: {
    tags() {
      return Object.entries(this.$store.state.data.presetFilters).map(
        function mapToPresetTag([key, value]) {
          return {
            emoji: billPresets[key]?.emoji,
            text: key,
            textColor: value ? '#cb3838' : 'white',
          }
        }
      )
    },
    optionsPresetFilters() {
      return this.tags.map((value) => {
        return {
          emoji: value.emoji,
          text: value.text,
          isActive: !!this.$store.state.data.presetFilters[value.text],
        }
      })
    },
  },
  methods: {
    handleAsideToggle() {
      this.isAsideToggled = !this.isAsideToggled
      this.$ga.event('project', 'click', 'Dashboard展開所有篩選器')
    },
    handleCloseAside() {
      this.isAsideToggled = false
    },
    handleLightBoxShow(bill) {
      this.lightBoxData = bill
      this.isLightBoxVisible = true
      this.$ga.event('project', 'click', `Dashboard方塊點擊 ${bill['名稱']}`)
    },
    handleClickAsidePresetFilter(filterName) {
      this.handleOpenPresetFilterLightbox(filterName)
      this.handleCloseAside()
      this.$ga.event('project', 'click', `Dashboard綜合指標 ${filterName}`)
    },
    handleSearchVisibilityChange(isVisible) {
      if (isVisible) {
        this.scrollerIconDirection = 'down'
      } else {
        this.scrollerIconDirection = 'up'
      }
    },
    handleDashboardVisibilityChange(isVisible) {
      this.shouldShowScroller = isVisible
    },
    handleScrollerButtonClick() {
      const element = this.scrollerIconDirection === 'down' ? 'bottom' : 'top'
      scrollIntoView(document.querySelector(`#${element}-of-the-dashboard`))
      this.$ga.event('project', 'click', `Dashboard 捲動箭頭 to ${element}`)
    },
    handleSelectPresetFilterOptionClick(option) {
      this.isPresetFilterLightboxVisible = true
      this.isLightBoxVisible = false
      this.$store.commit('data/SET_PRESET_FILTER', option.text)
      this.$ga.event('project', 'click', `Dashboard綜合指標 ${option.text}`)
    },

    handleOpenPresetFilterLightbox(filterName) {
      this.isPresetFilterLightboxVisible = true
      this.isLightBoxVisible = false
      this.$store.commit('data/SET_PRESET_FILTER', filterName)
    },
    handleClosePresetFilterLightbox() {
      this.isPresetFilterLightboxVisible = false
    },

    handleSearchPeople(people) {
      this.$store.commit('data/FILTER_BY_PEOPLE', people['名稱'])
      if (this.$store.state.viewport.width < 1200) {
        scrollIntoView(document.querySelector('.main__legends'))
      }
    },

    handleBottomOfTheDashboardVisibilityChanged(isVisible) {
      if (
        isVisible &&
        this.$store.state.data.data.length &&
        !this.isScrollToBottomOfTheDashboardAlready
      ) {
        this.$ga.event('project', 'scroll', 'Dashboard文末')
        this.isScrollToBottomOfTheDashboardAlready = true
      }
    },

    handleReset() {
      this.isResetLoading = true
      setTimeout(() => {
        this.$store.commit('data/RESET_DATA')
        this.isResetLoading = false
      }, 100)
    },
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  padding: 20px;
  background-color: #1b1b1b;
  &__aside-wrapper {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
  }
}

.aside-wrapper {
  height: 100vh;
}
.aside {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 75%;
  height: 100%;
  background-color: white;
  overflow-y: scroll;
  padding: 16px 28px;
  @include media-breakpoint-up(xl) {
    width: 35%;
  }
}

.aside-preset-filters-nav {
  margin: -2px -3px;
  &__filter {
    border-radius: 0 !important;
    margin: 2px 3px;
  }
}

.main {
  &__search-mobile {
    @include media-breakpoint-up(xl) {
      display: none !important;
    }
  }
  &__search-desktop {
    display: none !important;
    @include media-breakpoint-up(xl) {
      display: flex !important;
      margin: 0 0 0 8px;
    }
  }
  &__preset-filters-nav {
    margin: 17px 0 0 0;
    @include media-breakpoint-up(xl) {
      display: none !important;
    }
  }
  &__normal-filters-nav {
    margin-top: 17px;
    @include media-breakpoint-up(xl) {
      margin-top: 0;
    }
  }
  &__legends {
    margin: 17px 0 0 0;
  }
  &__grid-chart {
    margin: 17px 0 0 -2px;
  }
  &__lightbox {
    @include media-breakpoint-up(xl) {
      ::v-deep > section {
        width: 50% !important;
      }
    }
  }
}

.preset-filters-nav {
  display: flex;
  flex-wrap: wrap;
  margin-left: -2px;
  &__preset-filter-button {
    margin: 1px 2px;
  }
}

.normal-filters-nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  &__select-preset-filters {
    display: none;
    @include media-breakpoint-up(xl) {
      display: initial;
      margin: 0 0 0 8px;
    }
  }
  &__result-count {
    margin: 0 0 0 10px;
  }
  &__reset-filter-button {
    margin-left: 10px;
  }
  &__select-sorts {
    display: none;
    @include media-breakpoint-up(xl) {
      display: initial;
      margin-left: auto;
      margin-right: 350px;
    }
  }
}
.result-count {
  font-size: 12px;
  color: white;
  &--black {
    color: black;
  }
  &--bold {
    font-weight: 900;
  }
  &__number {
    text-decoration: underline;
    font-weight: bold;
  }
}
.reset-filter-button {
  color: white;
  text-decoration: underline;
  color: #b0b0b0;
  font-size: 12px;
  font-weight: 300;
  display: flex;
  align-items: center;
  img {
    height: 16px;
  }
}

.divider {
  width: 100%;
  min-height: 1px;
  background-color: black;
  margin: 13px 0;
}

.scroller-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.mobile {
  display: initial;
  @include media-breakpoint-up(xl) {
    display: none;
  }
}
.desktop {
  display: none;
  @include media-breakpoint-up(xl) {
    display: initial;
  }
}
</style>
