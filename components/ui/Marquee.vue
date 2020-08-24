<template>
  <div class="marquee">
    <p>
      READr
      相信當公民擁有充足資訊時，民主將更加成熟。如何獲得充足資訊，我們需要你的加入。
    </p>
  </div>
</template>

<script>
export default {
  name: 'Marquee',
}
</script>

<style lang="scss" scoped>
.marquee {
  overflow: hidden;
}

p {
  font-size: 15px;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 2.5px;
  color: rgba(#000, 0.87);
  white-space: nowrap;
  position: relative;
  animation: marquee 9s linear infinite;
}

@keyframes marquee {
  0% {
    left: 100%;
  }
  100% {
    left: -748px;
  }
}
</style>
