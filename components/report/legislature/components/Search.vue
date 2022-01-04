<template>
  <div v-click-outside="handleClickOutside" class="search-wrapper">
    <Select
      class="select"
      :defaultText="'法案名稱 ▼'"
      :options="selectOptions"
      :shouldAlwaysShowToggleIcon="true"
      @clickOption="handleSelectOptionChange"
    />
    <div class="wrapper">
      <div class="wrapper__input-wrapper input-wrapper">
        <input
          v-model="input"
          class="input-wrapper__input input"
          type="text"
          :placeholder="placeholder"
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
  </div>
</template>

<script>
/* global Fuse */
import Select from './Select.vue'

export default {
  components: {
    Select,
  },
  data() {
    return {
      input: '',
      shouldShowSuggestions: false,

      selectOptions: [
        {
          text: '法案名稱',
          isActive: true,
        },
        {
          text: '提案人名稱',
          isActive: false,
        },
      ],
    }
  },
  computed: {
    currentActiveSelectOption() {
      return this.selectOptions.find(function getIsActive(value) {
        return value.isActive
      })?.text
    },
    resultsBill() {
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
    people() {
      return this.$store.state.data.dataOriginal
        .map(function getProposals(value) {
          return value['每版本首位提案人'].split('、')
        })
        .flat()
        .filter(function onlyUnique(value, index, self) {
          return self.indexOf(value) === index
        })
        .map(function mapToObject(value) {
          return {
            名稱: value,
          }
        })
    },
    resultsPeople() {
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

      const fuse = new Fuse(this.people, options)

      // Change the pattern
      const pattern = this.input

      return fuse.search(pattern, { limit: 10 })
    },
    results() {
      switch (this.currentActiveSelectOption) {
        case '提案人名稱': {
          return this.resultsPeople
        }
        default:
        case '法案名稱': {
          return this.resultsBill
        }
      }
    },
    placeholder() {
      switch (this.currentActiveSelectOption) {
        case '提案人名稱': {
          return '搜尋提案人名稱'
        }
        default:
        case '法案名稱': {
          return '搜尋法案名稱'
        }
      }
    },
  },
  methods: {
    handleSuggestionClick(suggestion) {
      switch (this.currentActiveSelectOption) {
        case '提案人名稱': {
          this.$emit('clickPeople', suggestion.item)
          this.shouldShowSuggestions = false
          break
        }
        default:
        case '法案名稱': {
          this.$emit('clickBill', suggestion.item)
        }
      }
    },
    handleClickOutside() {
      this.shouldShowSuggestions = false
    },
    handleSelectOptionChange(option) {
      const newOptions = this.selectOptions.map(function activateTheOption(
        value
      ) {
        return {
          ...value,
          isActive: value.text === option.text,
        }
      })
      this.selectOptions = newOptions

      this.input = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.search-wrapper {
  display: flex;
}

.select {
  ::v-deep .button {
    background-color: #eeeeee;
    color: #1b1b1b;
    font-weight: 500;
  }
  ::v-deep .options-wrapper {
    background-color: #eeeeee;
    color: #1b1b1b;
  }
}

.wrapper {
  position: relative;
  flex: 1 1 auto;
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
  font-size: 14px;
  border-radius: 0;
  &::placeholder {
    font-size: 14px;
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
  font-size: 14px;
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
