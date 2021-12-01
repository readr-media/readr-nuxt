<template>
  <div class="news-letter">
    <a
      href="http://eepurl.com/gk-FF1"
      target="_blank"
      rel="noopener noreferrer"
    >
      訂閱電子報
    </a>
  </div>
</template>

<script>
export default {
  name: 'RdNewsLetterBtn',
}
</script>

<style lang="scss" scoped>
.news-letter {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #04295e;
  padding: 48px 20px;
  a {
    width: 100%;
    max-width: 568px;
    display: block;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.5;
    letter-spacing: 2.5px;
    text-align: center;
    border: 1px solid #fff;
    color: white;
    border-radius: 2px;
    padding: 12px 24px;
    &:hover,
    &:active,
    &:focus {
      cursor: pointer;
      outline: none;
      background-color: #000928;
    }
  }
}
</style>
