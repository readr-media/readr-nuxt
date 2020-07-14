<template>
  <a
    href="https://www.readr.tw/donate"
    target="_blank"
    rel="noopener noreferrer"
  >
    贊助 READr 一起媒體實驗改革
  </a>
</template>

<script>
export default {
  name: 'DonateButton',
}
</script>

<style lang="scss" scoped>
a {
  display: block;
  background-color: #ebf02c;
  letter-spacing: 2.5px;
  color: #000928;
  font-size: 15px;
  border: 1px solid #f5ebff;
  font-weight: 700;
  padding-top: 12px;
  padding-bottom: 12px;
  border-radius: 2px;
  text-align: center;
  position: relative;
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: #04295e;
    color: #fff;
  }
  &:active {
    background-color: #000928;
  }
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 4px;
    left: 4px;
    width: 100%;
    height: 100%;
    background-color: #000928;
    border-radius: 2px;
    z-index: -1;
  }
}
</style>
