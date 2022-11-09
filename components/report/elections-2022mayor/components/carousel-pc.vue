<template>
  <div class="CarouselWrapper">
    <div class="slide" :class="{ isActive: slideIndex === 0 }">
      <div class="indicator">
        <button class="button" @click="handleClicked">
          &#9664; 台南市/高雄市
        </button>
        <p class="title">六都市長開票進度</p>
        <button class="button" @click="handleClicked">
          桃園市/台中市111 &#9654;
        </button>
      </div>
      <div class="city">
        <div class="title">{{ polling[0].city }}</div>
        <div class="candidates">
          <div class="candidate">
            <div>01 蔣萬安</div>
            <div>票數bar</div>
          </div>
          <div class="candidate">
            <div>02 陳時中</div>
            <div>票數bar</div>
          </div>
          <div class="candidate">
            <div>03 黃珊珊</div>
            <div>票數bar</div>
          </div>
        </div>
      </div>
    </div>
    <div class="slide" :class="{ isActive: slideIndex === 1 }">
      <div class="indicator">
        <button class="button">&#9664; 台北市/新北市</button>
        <p class="title">六都市長開票進度</p>
        <button class="button">台南市/高雄市 &#9654;</button>
      </div>
      <div class="city">
        <div class="title">{{ polling[2].city }}</div>
        <div class="candidates">
          <div class="candidate">
            <div>01 鄭運鵬</div>
            <div>票數bar</div>
          </div>
          <div class="candidate">
            <div>02 張善政</div>
            <div>票數bar</div>
          </div>
          <div class="candidate">
            <div>03 鄭寶清</div>
            <div>票數bar</div>
          </div>
        </div>
      </div>
    </div>
    <div class="slide" :class="{ isActive: slideIndex === 2 }">
      <div class="indicator">
        <button class="button">&#9664; 桃園市/台中市</button>
        <p class="title">六都市長開票進度</p>
        <button class="button">台北市/新北市 &#9654;</button>
      </div>
      <div class="city">
        <div class="title">{{ polling[4].city }}</div>
        <div class="candidates">
          <div class="candidate">
            <div>01 黃偉哲</div>
            <div>票數bar</div>
          </div>
          <div class="candidate">
            <div>02 肉圓</div>
            <div>票數bar</div>
          </div>
          <div class="candidate">
            <div>03 珍奶</div>
            <div>票數bar</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarouselPc',

  props: {
    polling: {
      type: Array,
      default: () => {
        return []
      },
    },
  },

  data() {
    return { slideIndex: 0 }
  },

  mounted() {
    // setInterval(() => {
    //   this.slideIndex++
    //   if (this.slideIndex >= 3) this.slideIndex = 0
    // }, 3000)
  },

  methods: {
    handleClicked(value) {
      // this.slideIndex = value
      console.log(value)
    },
  },
}
</script>

<style lang="scss" scoped>
.CarouselWrapper {
  position: relative;
  height: 241px;
  width: 922px;
  display: flex;
  font-size: 16px;

  @include media-breakpoint-up(xl) {
  }
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;

  &.isActive {
    opacity: 1;
  }
}

.indicator {
  width: 922px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: #04295e;
}

.button {
  font-weight: 600;
  font-size: 14px;
  color: #f34b4b;
}

.city {
  display: flex;
  flex-direction: column;
}
.candidates {
  display: flex;
  justify-content: space-between;
}
</style>
