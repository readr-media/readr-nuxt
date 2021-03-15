<template>
  <div></div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.report-extras {
  background-color: white !important;
}

.report-credit {
  color: #111111 !important;
  background-color: #ebebeb !important;
}

a.sc-readr-donate-button {
  &::before {
    background-color: #111111;
  }

  div.sc-readr-donate-button {
    background-color: #ff3f3f;
    color: white;
    border-color: white;

    &:hover {
      background-color: #111111;
      color: white;
    }

    &:active {
      color: white;
    }
  }
}

.default__footer {
  background-color: #ebebeb !important;
  position: relative;
  &:before {
    display: none;
    @include media-breakpoint-up(xl) {
      z-index: -1;
      position: absolute;
      left: calc((100vw - 1096px) / 2 * -1);
      display: block;
      content: '';
      width: 100vw;
      height: 100%;
      background-color: #ebebeb !important;
    }
  }
}
</style>

<style lang="scss" scoped></style>
