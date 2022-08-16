<template>
  <div class="slider-container">
    <div class="left-slides">
      <div style="background-color: #353b48;">
        <h3>Moon</h3>
        <p>making the nights brighter.</p>
      </div>

      <div style="background-color: #be2edd;">
        <h3>Volcanic</h3>
        <p>eruptions without lightning.</p>
      </div>

      <div style="background-color: #4bcffa;">
        <h3>Blue Kingfisher</h3>
        <p>flies like the beast.</p>
      </div>

      <div style="background-color: #218c74;">
        <h3>Intense</h3>
        <p>Misty shroud over a forest.</p>
      </div>

      <div style="background-color: #ff7f50;">
        <h3>Beautiful</h3>
        <p>Sunset at Clingmans Dome.</p>
      </div>
    </div>

    <div class="right-slides">
      <div
        style="
          background-image: url('https://images.unsplash.com/photo-1500534623283-312aade485b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80');
        "
      ></div>

      <div
        style="
          background-image: url('https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
        "
      ></div>

      <div
        style="
          background-image: url('https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80');
        "
      ></div>

      <div
        style="
          background-image: url('https://images.unsplash.com/photo-1516537219851-920e2670c6e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80');
        "
      ></div>

      <div
        style="
          background-image: url('https://images.unsplash.com/photo-1511553677255-ba939e5537e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=628&q=80');
        "
      ></div>
    </div>

    <div class="buttons">
      <button class="left-btn">
        <i class="fas fa-arrow-down"></i>
      </button>
      <button class="right-btn">
        <i class="fas fa-arrow-up"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MsLandingSwiper',
  data() {
    return {
      currentSlide: 0,
    }
  },
  mounted() {
    // Script Goes Here...
    const leftSlide = document.querySelector('.left-slides')
    const rightSlide = document.querySelector('.right-slides')
    const leftBtn = document.querySelector('.left-btn')
    const rightBtn = document.querySelector('.right-btn')
    const slidesLength = leftSlide.querySelectorAll('div').length

    rightSlide.style.transform = `translateY(-${(slidesLength - 1) * 100}%)`

    leftBtn.addEventListener('click', () => changeSlide('left'))
    rightBtn.addEventListener('click', () => changeSlide('right'))

    function changeSlide(btn) {
      if (btn === 'right') {
        this.currentSlide++

        if (this.currentSlide > slidesLength - 1) {
          this.currentSlide = 0
        }
      } else if (btn === 'left') {
        this.currentSlide--

        if (this.currentSlide < 0) {
          this.currentSlide = slidesLength - 1
        }
      }

      rightSlide.style.transform = `translateY(-${
        (slidesLength - 1 - this.currentSlide) * 100
      }%)`
      leftSlide.style.transform = `translateY(-${this.currentSlide * 100}%)`
    }

    // setInterval(autoChangeSlide, 3000)
  },
  methods: {
    // autoChangeSlide() {
    //   this.currentSlide++
    //   if (this.currentSlide > slidesLength - 1) {
    //     this.currentSlide = 0
    //   }
    //   rightSlide.style.transform = `translateY(-${
    //     (this.slidesLength - 1 - this.currentSlide) * 100
    //   }%)`
    //   leftSlide.style.transform = `translateY(-${this.currentSlide * 100}%)`
    // },
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Muli&display=swap');

* {
  margin: 0;
  padding: 0;
}

:root {
  --primary-color: #1dd1a1;
  --active-color: #2ecc71;
}

body {
  background-color: #f5f5f5;
  font-family: 'Muli', poppins;
  height: 100vh;
}

.slider-container {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
  color: #fff;
}

.left-slides {
  position: absolute;
  left: 0;
  top: 0;
  width: 35%;
  height: 100%;
  transition: transform 0.5s ease-in-out;
}
.right-slides {
  position: absolute;
  left: 35%;
  top: 0;
  width: 65%;
  height: 100%;
  transition: transform 0.5s ease-in-out;
}

.left-slides > div {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.left-slides h3 {
  font-size: 3rem;
  margin-bottom: 10px;
}

.left-slides p {
  font-size: 1.5rem;
}

.right-slides > div {
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

button {
}

.slider-container button {
  position: absolute;
  left: 35%;
  top: 50%;
  font-size: 1.5rem;
  padding: 12px;
  border: none;
  cursor: pointer;
  color: #fff;
  background-color: #444;
}

button:hover {
  opacity: 0.9;
}

button:focus {
  outline: none;
}

.slider-container .left-btn {
  transform: translateX(-100%);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.slider-container .right-btn {
  transform: translateY(-100%);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
