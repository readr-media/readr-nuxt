const scrollDirection = {
  data() {
    return {
      $_scrollDirection_direction: undefined,
      $_scrollDirection_beforeScrollY: 0,
    }
  },

  computed: {
    isScrollingDown() {
      return this.$data.$_scrollDirection_direction === 'down'
    },
  },

  mounted() {
    this.$data.$_scrollDirection_beforeScrollY = window.pageYOffset
    window.addEventListener(
      'scroll',
      this.$_scrollDirection_detectScrollDirection
    )
  },

  beforeDestroy() {
    window.removeEventListener(
      'scroll',
      this.$_scrollDirection_detectScrollDirection
    )
  },

  methods: {
    $_scrollDirection_detectScrollDirection() {
      const currentScrollY = window.pageYOffset

      if (currentScrollY > this.$data.$_scrollDirection_beforeScrollY) {
        this.$data.$_scrollDirection_direction = 'down'
      } else {
        this.$data.$_scrollDirection_direction = 'up'
      }

      this.$data.$_scrollDirection_beforeScrollY = currentScrollY
    },
  },
}

export default scrollDirection
