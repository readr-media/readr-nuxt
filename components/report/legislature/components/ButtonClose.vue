<template>
  <button></button>
</template>

<style lang="scss" scoped>
button {
  width: 17px;
  height: 17px;
  background-color: white;
  position: relative;

  &:after {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    display: inline-block;
    width: 17px;
    height: 17px;
    border: 1px solid black;
    background: linear-gradient(
        to top left,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0) calc(50% - 0.8px),
        rgba(0, 0, 0, 1) 50%,
        rgba(0, 0, 0, 0) calc(50% + 0.8px),
        rgba(0, 0, 0, 0) 100%
      ),
      linear-gradient(
        to top right,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0) calc(50% - 0.8px),
        rgba(0, 0, 0, 1) 50%,
        rgba(0, 0, 0, 0) calc(50% + 0.8px),
        rgba(0, 0, 0, 0) 100%
      );
  }
}
</style>
