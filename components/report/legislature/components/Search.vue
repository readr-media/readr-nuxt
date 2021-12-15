<template>
  <div>
    <input v-model="input" type="text" />
    <div
      style="max-height: 300px; overflow-y: scroll; background-color: white;"
    >
      <div v-for="result in results" :key="result.refIndex">
        {{ result.item['名稱'] }}
        <br />
        ------
      </div>
    </div>
  </div>
</template>

<script>
/* global Fuse */

export default {
  data() {
    return {
      input: '',
    }
  },
  computed: {
    results() {
      const options = {
        // isCaseSensitive: false,
        // includeScore: false,
        // shouldSort: true,
        // includeMatches: false,
        // findAllMatches: false,
        // minMatchCharLength: 1,
        // location: 0,
        // threshold: 0.6,
        // distance: 100,
        // useExtendedSearch: false,
        // ignoreLocation: false,
        // ignoreFieldNorm: false,
        keys: ['名稱'],
      }

      const fuse = new Fuse(this.$store.state.data.dataOriginal, options)

      // Change the pattern
      const pattern = this.input

      return fuse.search(pattern, { limit: 10 })
    },
  },
}
</script>
