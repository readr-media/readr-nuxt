<template>
  <section>
    <TagPreset :emoji="tag.emoji" :text="tag.text" />
    <template v-if="currentActiveFilterName === '地雷區'">
      <div>
        <p>
          從 2008 年至今，已歷經四屆立法委員更迭，在這過程中，持續有立委針對這
          11 項法案提案，希望修改法案內容，卻遲遲未進入實質審查階段，排審次數為
          0
          ，讓法案難以往前推進。其中包括，「優生保健法」第九條，挑戰社會傳統價值，婦女是否有人工流產的完全決定權，以及涉及原住民土地正義的「原住民族土地及海域法草案」，即便總統蔡英文承諾修法，卻也難讓法案有實質進展。
        </p>
        <img
          src="~/assets/imgs/report/legislature/preset-filter/01.png"
          alt="preset-filter-static-chart"
        />
      </div>
    </template>
    <template v-else-if="currentActiveFilterName === '戰火區'">
      <div>
        <p>
          在近四屆立法院裡，有 52
          筆法案，連續四屆有立委提案、排審，卻遲遲無法三讀通過，代表該議題具有一定重要性，卻爭議過大，至今仍沒有共識，其中《中華民國憲法增修條文》第十條條文修正草案，就排審高達
          10 次。
        </p>
        <img
          src="~/assets/imgs/report/legislature/preset-filter/02.png"
          alt="preset-filter-static-chart"
        />
      </div>
    </template>
    <template
      v-else-if="currentActiveFilterName === '政府主推哪些優先法案通過？'"
    >
      <div>
        <p>
          行政院每會期皆會定調優先法案，希望立法院優先審議該項法案，統計 07-09
          屆優先法案，包含馬政府及蔡政府時代，從數據可見被列為行政院優先法案的法案，三讀通過機率高達
          69%。
        </p>
        <p>
          而從法案類別來看，國民黨和民進黨皆著重司法、經濟相關法案，前者力推全民健康保險法、臺灣地區與大陸地區人民關係條例等；後者則關注都市更新條例、臺灣地區與大陸地區人民關係條例等。
        </p>
        <p>
          被列為行政院優先法案且最後三讀通過的法案，除了顯現出該議題的重要性，也暗示著完全執政下，立法院多數黨跟政府配合默契，即便容易推進法案往前，卻也可能成為雙面刃，以執政黨人數優勢強行通過表決，成為多數暴力，讓法案強行過關。
        </p>
        <img
          src="~/assets/imgs/report/legislature/preset-filter/03.png"
          alt="preset-filter-static-chart"
        />
      </div>
    </template>
    <template
      v-else-if="currentActiveFilterName === '完全執政都無法通過的法案？'"
    >
      <div>
        <p>
          行政院每會期皆會定調優先法案，希望立法院優先審議該項法案，統計 07-09
          屆優先法案，包含馬政府及蔡政府時代，從數據可見被列為行政院優先法案的法案，不通過機率為
          31%。
        </p>
        <p>
          既然執政黨有立法院人數優勢，為什麼還有三成優先法案不通過呢？實際上，可能因為法案爭議性太大，牽涉各方利益團體，難以達成共識，或是在議題重要性、急迫性劣於其他法案。民進黨主要為司法、經濟類不通過數量較多，例如礦業法；國民黨則為內政、司法相關法案，例如宗教團體法。
        </p>
        <img
          src="~/assets/imgs/report/legislature/preset-filter/04.png"
          alt="preset-filter-static-chart"
        />
      </div>
    </template>
    <template v-else-if="currentActiveFilterName === '國民兩黨主力法案'">
      <div>
        <p>
          要推進法案往前，「排審」與否成為關鍵，而握有排審權的召集委員，按照各政黨關心議題，將相關法案排入議程，排審次數多寡就顯示出各政黨關心議題。國民黨就針對「食品安全衛生管理法」排審
          15 次；民進黨則針對「刑事訴訟法」排審 17 次。
        </p>
      </div>
    </template>
    <template v-else-if="currentActiveFilterName === '小黨難突破的法案'">
      <div>
        <p>
          立法院國民黨、民進黨握有召委排審權，小黨各自關心的法案，時常出現排不進議案困境，因此出現該法案被提案多次，排審次數卻為零，例如時代力量提案的公職人員選舉罷免法，希望禁止公職人員帶職參選，即便連續兩屆提案，卻都無法順利排審。
        </p>
        <img
          src="~/assets/imgs/report/legislature/preset-filter/05.png"
          alt="preset-filter-static-chart"
        />
      </div>
    </template>
  </section>
</template>

<script>
import billPresets from '../constants/billPresets.json'
import TagPreset from './TagPreset.vue'

export default {
  components: {
    TagPreset,
  },
  computed: {
    currentActiveFilterName() {
      return (
        Object.entries(this.$store.state.data.presetFilters).find(
          function getTruthyFilterValue([filterName, filterValue]) {
            return filterValue === true
          }
        )?.[0] ?? '地雷區'
      )
    },
    tag() {
      return {
        emoji: billPresets[this.currentActiveFilterName]?.emoji,
        text: this.currentActiveFilterName,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
section {
  background-color: #555555;
  color: white;
  padding: 28px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

div {
  & > * {
    margin: 28px 0 0 0;
  }
}

p {
  text-align: justify;
  line-height: 2;
  font-size: 16px;
  font-weight: 300;
}
</style>
