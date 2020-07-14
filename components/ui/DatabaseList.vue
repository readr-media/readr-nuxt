<template>
  <div class="database-list">
    <p class="intro">
      READr
      致力於產製數據驅動的新聞報導，並將所使用的資料公開，以下為公開的資料，歡迎再加以利用！
    </p>
    <div>
      <div class="list-title-wrapper">
        <span>資料列表</span>
        <span>資料怎麼用</span>
      </div>
      <ul>
        <li v-for="database in databases" :key="database.id">
          <article>
            <a
              class="database-title"
              href="http://"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h1>{{ database.title }}</h1>
            </a>
            <div class="example-wrapper">
              <span>{{ database.prompt }}</span>
              <a
                v-for="example in database.examples"
                :key="example.id"
                href="http://"
                target="_blank"
                rel="noopener noreferrer"
              >
                <picture>
                  <img :src="example.image" alt="" />
                </picture>
              </a>

              <a
                class="add"
                href="http://"
                target="_blank"
                rel="noopener noreferrer"
              >
              </a>
            </div>
          </article>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DatabaseList',
  props: {
    databases: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.database-list {
  font-size: 15px;
  line-height: 1.5;
  color: #000928;
  padding-top: 16px;
  @include media-breakpoint-up(md) {
    font-size: 18px;
    padding-top: 30px;
  }
}
h1,
.intro {
  font-weight: 700;
  letter-spacing: 2.5px;
}
.intro {
  margin-bottom: 18px;
  @include media-breakpoint-up(md) {
    text-align: center;
    margin-bottom: 22px;
  }
}
.list-title-wrapper {
  font-size: 13px;
  line-height: 1.4;
  margin-bottom: 4px;
  @include media-breakpoint-up(md) {
    font-size: 15px;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
  }
  > span:last-child {
    display: none;
    @include media-breakpoint-up(md) {
      display: inline;
    }
  }
}
ul {
  border-top: 1px solid rgba(#000, 0.1);
}
li {
  border-bottom: 1px solid rgba(#000, 0.1);
  padding-top: 10px;
  padding-bottom: 10px;
}
article {
  @include media-breakpoint-up(md) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.database-title {
  display: inline-block;
  margin-bottom: 18px;
  @include media-breakpoint-up(md) {
    margin-bottom: 0;
  }
}
h1 {
  text-decoration: underline;
}
.example-wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @include media-breakpoint-up(md) {
    flex: 0 0 auto;
  }
  span {
    margin-right: 10px;
    font-size: 13px;
    line-height: 1.4;
  }
  a {
    border-radius: 50%;
    width: 36px;
    height: 36px;
    position: relative;
    overflow: hidden;
    @include media-breakpoint-up(md) {
      width: 44px;
      height: 44px;
    }
    + a {
      margin-left: 6.5px;
      @include media-breakpoint-up(md) {
        margin-left: 18px;
      }
    }
  }
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
  }
}
.add {
  background-color: #f5ebff;
  position: relative;
  &::before,
  &::after {
    content: '';
    display: block;
    background-color: #000928;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &::before {
    width: 16px;
    height: 4px;
    @include media-breakpoint-up(md) {
      width: 20px;
    }
  }
  &::after {
    width: 4px;
    height: 16px;
    @include media-breakpoint-up(md) {
      height: 20px;
    }
  }
}
</style>
