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
      <main>
        <Search @clickBill="handleLightBoxShow" />
        <nav>
          <Button
            @click.native="$store.commit('data/SET_PRESET_FILTER', 'mine')"
          >
            地雷區
          </Button>
          <Button
            @click.native="$store.commit('data/SET_PRESET_FILTER', 'argue')"
          >
            戰火區
          </Button>
          <Button
            @click.native="
              $store.commit(
                'data/SET_PRESET_FILTER',
                'executiveYuanPrioritizePass'
              )
            "
          >
            政府主推哪些優先法案通過？
          </Button>
          <Button
            @click.native="
              $store.commit(
                'data/SET_PRESET_FILTER',
                'executiveYuanPrioritizeFail'
              )
            "
          >
            完全執政都無法通過的法案？
          </Button>
          <Button
            @click.native="
              $store.commit('data/SET_PRESET_FILTER', 'KMTDPPPrefer')
            "
          >
            國民兩黨主力法案
          </Button>
          <Button
            @click.native="
              $store.commit(
                'data/SET_PRESET_FILTER',
                'smallPartyPreferButNotPopular'
              )
            "
          >
            小黨難突破的法案
          </Button>
        </nav>
        <nav style="display: flex; flex-direction: row; margin-top: 10px;">
          <Button @click.native="handleAsideToggle"> 篩選與排序 </Button>
          <p style="color: white; margin-left: 10px;">
            你的篩選結果 共 {{ $store.state.data.data.length }} 筆
          </p>
          <button
            style="color: white; margin-left: 10px; text-decoration: underline;"
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
import Button from './Button.vue'
import Legends from './Legends.vue'
import DashboardGridChart from './DashboardGridChart.vue'

export default {
  components: {
    Search,
    Colors,
    Sorts,
    Filters,
    Button,
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
</style>
