<template>
  <section class="dashboard" style="background-color: black;">
    <ClientOnly>
      <aside v-show="isAsideToggled" class="dashboard__aside aside">
        <ButtonClose
          style="position: sticky; top: 4px; right: 4px; align-self: flex-end;"
          @click.native="handleCloseAside"
        />
        <div>
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
            @click="$store.commit('data/RESET_DATA')"
          >
            清除選取
          </button>
          <nav class="aside__aside-preset-filters-nav preset-filters-nav">
            <TagPreset
              v-for="tag in tags"
              :key="tag.text"
              class="aside-preset-filters-nav__filter"
              :emoji="tag.emoji"
              :text="tag.text"
              :textColor="tag.textColor"
              @click.native="handleClickAsidePresetFilter(tag.text)"
            />
          </nav>
          <Colors />
          ------------
          <Sorts />
          ------------
          <Filters />
        </div>
      </aside>
      <main class="dashboard__main main">
        <Search @clickBill="handleLightBoxShow" />
        <nav class="main__preset-filters-nav preset-filters-nav">
          <ButtonPrimary
            v-for="[filterName, filterValue] in Object.entries(
              $store.state.data.presetFilters
            )"
            :key="filterName"
            class="preset-filters-nav__preset-filter-button"
            :active="filterValue"
            @click.native="$store.commit('data/SET_PRESET_FILTER', filterName)"
          >
            {{ filterName }}
          </ButtonPrimary>
        </nav>
        <nav class="main__normal-filters-nav normal-filters-nav">
          <ButtonSecondary
            class="normal-filters-nav__aside-toggle aside-toggle"
            @click.native="handleAsideToggle"
          >
            篩選與排序
          </ButtonSecondary>
          <p class="normal-filters-nav__result-count result-count">
            你的篩選結果 共
            <span class="result-count__number">
              {{ $store.state.data.data.length }}
            </span>
            筆
          </p>
          <button
            class="normal-filters-nav__reset-filter-button reset-filter-button"
            @click="$store.commit('data/RESET_DATA')"
          >
            清除篩選
          </button>
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
    </ClientOnly>
  </section>
</template>

<script>
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
  },
  data() {
    return {
      isAsideToggled: false,
      lightBoxData: {},
      isLightBoxVisible: false,
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
  },
  methods: {
    handleAsideToggle() {
      this.isAsideToggled = !this.isAsideToggled
    },
    handleCloseAside() {
      this.isAsideToggled = false
    },
    handleLightBoxShow(bill) {
      this.lightBoxData = bill
      this.isLightBoxVisible = true
    },
    handleClickAsidePresetFilter(filterName) {
      this.$store.commit('data/SET_PRESET_FILTER', filterName)
      this.handleCloseAside()
    },
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  padding: 20px;
  &__aside {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
  }
}

.aside {
  display: flex;
  flex-direction: column;
  width: 75%;
  height: 100vh;
  background-color: white;
  overflow-y: scroll;
  padding: 20px;
}

.aside-preset-filters-nav {
  margin: -2px -3px;
  &__filter {
    border-radius: 0 !important;
    margin: 2px 3px;
  }
}

.main {
  &__preset-filters-nav {
    margin: 17px 0 0 0;
  }
  &__normal-filters-nav {
    margin-top: 17px;
  }
  &__legends {
    margin: 17px 0 0 0;
  }
  &__grid-chart {
    margin: 17px 0 0 -2px;
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
  &__result-count {
    margin: 0 0 0 10px;
  }
  &__reset-filter-button {
    margin-left: 10px;
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
}
</style>
