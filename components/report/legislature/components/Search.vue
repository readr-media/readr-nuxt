<template>
  <div v-click-outside="handleClickOutside" class="wrapper">
    <div class="wrapper__input-wrapper input-wrapper">
      <input
        v-model="input"
        class="input-wrapper__input input"
        type="text"
        placeholder="搜尋法案名稱"
        @focus="shouldShowSuggestions = true"
      />
      <img
        class="input-wrapper__icon"
        src="~/assets/imgs/report/legislature/search.svg"
        alt="search"
      />
    </div>
    <ol
      v-show="shouldShowSuggestions && results.length"
      class="wrapper__suggestion-list suggestion-list"
    >
      <li
        v-for="result in results"
        :key="result.refIndex"
        class="suggestion-list__suggestion suggestion"
        @click="handleSuggestionClick(result)"
      >
        {{ result.item['名稱'] }}
      </li>
    </ol>
  </div>
</template>

<script>
/* global Fuse */

export default {
  data() {
    return {
      input: '',
      shouldShowSuggestions: false,
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
  methods: {
    handleSuggestionClick(suggestion) {
      this.$emit('clickBill', suggestion.item)
    },
    handleClickOutside() {
      this.shouldShowSuggestions = false
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  &__suggestion-list {
    position: absolute;
  }
}

.input-wrapper {
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__icon {
    height: 100%;
    background-color: white;
    padding: 3px 6px;
  }
}
.input {
  width: 100%;
  height: 100%;
  padding: 3px 6px;
  font-size: 12px;
  &::placeholder {
    font-weight: 300;
    color: #c7c7c7;
  }
}

.suggestion-list {
  background-color: #f1f1f1;
  max-height: 300px;
  overflow-y: scroll;
  padding: 13px 0;
  width: 100%;
}
.suggestion {
  padding: 3px 6px;
  font-size: 12px;
  font-weight: 300;
  color: #969696;
  cursor: pointer;
  &:hover {
    background-color: #dddddd;
  }
  &:active {
    background-color: transparent;
    font-weight: bold;
  }
}
</style>
