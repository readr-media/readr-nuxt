<template>
  <section class="timeline">
    <h1>大事記</h1>

    <ol class="timeline__events-list events-list">
      <li>
        <div class="events-list__title">
          大事記
        </div>
      </li>

      <li v-for="i in 10" :key="i">
        <TimelineEvent :order="i" />
      </li>
    </ol>

    <footer />
  </section>
</template>

<script>
import TimelineEvent from './TimelineEvent.vue'

export default {
  components: {
    TimelineEvent,
  },
}
</script>

<style lang="scss" scoped>
.timeline {
  position: relative;
  overflow: hidden;

  h1 {
    padding: 0 0 0 10px;
    @include media-breakpoint-up(md) {
      display: none;
    }
  }

  &__events-list {
    margin: 20px auto 0 auto !important;
  }

  footer {
    height: 200px;
    background-color: #363c5c;
  }
}

.events-list {
  max-width: 320px;
  height: 3500px;
  list-style: none;
  margin: 0 auto;
  padding: 0;
  @include media-breakpoint-up(md) {
    max-width: 1000px;
    height: 2590px;
  }

  &__title {
    display: none;
    @include media-breakpoint-up(md) {
      width: 180px;
      height: 180px;
      border-radius: 100%;
      background-color: #363c5c;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 32px;
      font-weight: 700;
      color: #fff;
    }
  }

  li {
    width: max-content;
    position: relative;

    &:nth-child(1) {
      display: none;
      @include media-breakpoint-up(md) {
        display: block;
        top: 50px;
        left: 200px;
        z-index: 2;
      }
    }

    &:nth-child(2) {
      top: 0px;
      left: -50px;
      @include media-breakpoint-up(md) {
        top: -30px;
      }
    }

    &:nth-child(3) {
      top: -50px;
      left: -50px;
      @include media-breakpoint-up(md) {
        top: -140px;
        left: 200px;
      }
    }

    &:nth-child(4) {
      top: -100px;
      @include media-breakpoint-up(md) {
        top: -300px;
      }
    }

    &:nth-child(5) {
      top: -100px;
      left: -50px;
      @include media-breakpoint-up(md) {
        top: -500px;
        left: 200px;
      }
    }

    &:nth-child(6) {
      top: -200px;
      left: -180px;
      @include media-breakpoint-up(md) {
        top: -700px;
        left: 400px;
      }
    }

    &:nth-child(7) {
      top: -300px;
      left: 40px;
      @include media-breakpoint-up(md) {
        top: -900px;
        left: 300px;
      }
    }

    &:nth-child(8) {
      top: -300px;
      left: -70px;
      @include media-breakpoint-up(md) {
        top: -900px;
        left: 0px;
      }
    }

    &:nth-child(9) {
      top: -300px;
      left: -170px;
      @include media-breakpoint-up(md) {
        top: -1000px;
        left: 200px;
      }
    }

    &:nth-child(10) {
      top: -300px;
      left: -150px;
      @include media-breakpoint-up(md) {
        top: -1200px;
        left: 600px;
      }
    }

    &:nth-child(11) {
      top: -400px;
      left: 100px;
      @include media-breakpoint-up(md) {
        top: -1300px;
        left: 500px;
      }
    }
  }
}
</style>
