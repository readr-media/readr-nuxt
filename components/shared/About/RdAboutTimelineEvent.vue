<template>
  <figure :class="['figure', `figure--${order}`]">
    <img :src="require(`~/assets/about/d${order}.svg`)" alt="" />

    <figcaption class="figure__figcaption figcaption">
      <div class="figcaption__wrapper">
        <h1 v-text="timelineEvents[order - 1].date" />
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="timelineEvents[order - 1].descrption" />
      </div>
    </figcaption>
  </figure>
</template>

<script>
export default {
  name: 'RdAboutTimelineEvent',

  props: {
    order: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      timelineEvents: [
        {
          date: '201709',
          descrption: `
            <p>數位專題實驗開始</p>
           `,
        },
        {
          date: '201804',
          descrption: `
            <p>READr 誕生，每月推出數位專題報導，以及客座總編選新聞實驗</p>
           `,
        },
        {
          date: '201709',
          descrption: `
            <p>封測結束，</p>
            <p>正式上線</p>
           `,
        },
        {
          date: '201709',
          descrption: `
            <p>全球華文永續報導獎</p>
            <p>融媒體組優等</p>
            <a href="https://www.mirrormedia.mg/projects/mining/" target="_blank">天下沒有白挖的水泥</a>
           `,
        },
        {
          date: '201811',
          descrption: `
            <p>亞洲卓越新聞獎 <span class="small-quote">(SOPA Awards)</span></p>
            <p>榮譽解釋性報導獎</p>
            <a href="https://www.mirrormedia.mg/projects/20170801aboriginal/" target="_blank">一起回家：<br>原住民傳統領域在吵什麼？</a> 
           `,
        },
        {
          date: '201811',
          descrption: `
            <p>曾虛白先生新聞獎</p>
            <p>公共服務報導獎入圍</p>
            <a href="https://www.readr.tw/project/newtype" target="_blank">新二代的難題：<br>誰是鴨子？誰在打雷？</a> 
           `,
        },
        {
          date: '201904',
          descrption: `
            <p>結束階段性客座總編實驗，</p>
            <p>進行改版</p>
           `,
        },
        {
          date: '201904',
          descrption: `
            <p>亞洲卓越新聞獎 <span class="small-quote">(SOPA Awards)</span></p>
            <p>卓越專題特寫獎入圍</p>
            <a href="https://www.readr.tw/project/newtype" target="_blank">新二代的難題：<br>誰是鴨子？誰在打雷？</a> 
           `,
        },
        {
          date: '201904',
          descrption: `
            <p>資料新聞獎</p>
            <p><span class="small-quote">(Data Journalism Awards)</span></p>
            <p>最佳即時新聞獎入圍</p>
            <a href="https://www.readr.tw/project/puyuma" target="_blank">普悠瑪事故：<br>關鍵 43 分鐘</a> 
           `,
        },
        {
          date: '201906',
          descrption: `
            <p>READr 轉型為</p>
            <p>「專題報導」平台</p>
           `,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.figure {
  width: 500px;
  background-color: transparent;
  position: relative;

  img {
    width: 100%;
  }

  &--1 {
    width: 400px;

    .figcaption__wrapper {
      transform: translate(-10px, -30px);
    }
  }

  &--2 {
    width: 600px;

    .figcaption__wrapper {
      transform: translate(-65px, -20px);
    }
  }

  &--3 {
    width: 250px;

    .figcaption__wrapper {
      transform: translate(0px, 10px);
    }
  }

  &--4 {
    width: 450px;

    .figcaption__wrapper {
      transform: translate(-10px, -80px);
    }
  }

  &--5 {
    width: 600px;

    .figcaption__wrapper {
      width: 60% !important;
      transform: translate(50px, 0px);
    }
  }

  &--6 {
    width: 300px;

    .figcaption__wrapper {
      width: 80% !important;
      transform: translate(10px, 20px);
    }
  }

  &--7 {
    width: 400px;

    .figcaption__wrapper {
      transform: translate(70px, -30px);
    }
  }

  &--8 {
    width: 500px;

    .figcaption__wrapper {
      width: 80% !important;
      transform: translate(80px, 0px);
    }
  }

  &--9 {
    width: 400px;

    .figcaption__wrapper {
      width: 80% !important;
      transform: translate(70px, -40px);
    }
  }

  &--10 {
    width: 300px;

    .figcaption__wrapper {
      width: 60% !important;
      transform: translate(-30px, -20px);
    }
  }
}

.figcaption {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__wrapper {
    width: 45%;
    text-align: center;
    line-height: 1.35;

    &::v-deep {
      h1 {
        font-size: 32px;
        font-weight: 700;
      }

      p {
        font-size: 22px;
      }

      a {
        font-size: 22px;
        font-weight: 700;
      }

      .small-quote {
        font-size: 16px;
      }
    }
  }
}
</style>
