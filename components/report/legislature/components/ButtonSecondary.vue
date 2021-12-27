<template>
  <button><slot /></button>
</template>

<style lang="scss" scoped>
button {
  background-color: white;
  color: black;
  border: 1px solid black;
  padding: 0 5px;
  font-size: 12px;
  font-weight: 900;
  height: 20px;
  &:hover {
    background-color: #c9c9c9;
  }
  &[active] {
    background-color: #c9c9c9;
  }
}
</style>
