<template>
  <section style="background-color: black;">
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

        <Dashboard v-for="index in 1" :key="index" style="margin-top: 10px;" />
      </main>
    </ClientOnly>
  </section>
</template>

<script>
import * as storeData from './store/data'

import Colors from './components/Colors.vue'
import Sorts from './components/Sorts.vue'
import Filters from './components/Filters.vue'
import Button from './components/Button.vue'
import Legends from './components/Legends.vue'
import Dashboard from './components/Dashboard.vue'

export default {
  components: {
    Colors,
    Sorts,
    Filters,
    Button,
    Legends,
    Dashboard,
  },
  data() {
    return {
      isAsideToggled: false,
    }
  },
  created() {
    this.$store.registerModule('data', {
      namespaced: true,
      state: storeData.state,
      mutations: storeData.mutations,
      actions: storeData.actions,
      getters: storeData.getters,
    })
  },
  destroyed() {
    this.$store.unregisterModule('data')
  },
  methods: {
    handleAsideToggle() {
      this.isAsideToggled = !this.isAsideToggled
    },
  },
  head() {
    return {
      script: [
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/d3/6.7.0/d3.min.js',
        },
        {
          src: 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js',
        },
      ],
    }
  },
}
</script>
