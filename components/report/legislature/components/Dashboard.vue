<template>
  <section class="dashboard" style="background-color: black;">
    <ClientOnly>
      <aside
        v-show="isAsideToggled"
        style="
          display: flex;
          flex-direction: column;
          top: 0;
          left: 0;
          width: 75%;
          height: 100vh;
          z-index: 50;
          background-color: white;
          overflow-y: scroll;
          padding: 20px;
        "
      >
        <button @click="isAsideToggled = false">close</button>
        <Colors />
        ------------
        <Sorts />
        ------------
        <Filters />
      </aside>
      <main class="main">
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
        <Legends />

        <DashboardGridChart
          v-for="index in 1"
          :key="index"
          style="margin-top: 10px;"
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
import Search from './Search.vue'
import Colors from './Colors.vue'
import Sorts from './Sorts.vue'
import Filters from './Filters.vue'
import ButtonPrimary from './ButtonPrimary.vue'
import ButtonSecondary from './ButtonSecondary.vue'
import Legends from './Legends.vue'
import DashboardGridChart from './DashboardGridChart.vue'

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
  },
  data() {
    return {
      isAsideToggled: false,
      lightBoxData: {},
      isLightBoxVisible: false,
    }
  },
  methods: {
    handleAsideToggle() {
      this.isAsideToggled = !this.isAsideToggled
    },
    handleLightBoxShow(bill) {
      this.lightBoxData = bill
      this.isLightBoxVisible = true
    },
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  padding: 20px;
}

.main {
  &__preset-filters-nav {
    margin: 17px 0 0 0;
  }
  &__normal-filters-nav {
    margin-top: 17px;
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
}
.result-count {
  font-size: 12px;
  color: white;
  &__number {
    text-decoration: underline;
    font-weight: bold;
  }
}
.reset-filter-button {
  color: white;
  margin-left: 10px;
  text-decoration: underline;
  color: #b0b0b0;
  font-size: 12px;
  font-weight: 300;
}
</style>
