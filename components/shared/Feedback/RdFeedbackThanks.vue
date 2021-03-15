<template>
  <div class="feedback-thanks">
    感謝你的回饋，<br />READr 會繼續努力提供更好的內容給你
  </div>
</template>

<script>
export default {
  name: 'RdFeedbackThanks',
}
</script>

<style lang="scss" scoped>
.feedback-thanks {
  font-size: 15px;
  letter-spacing: 0.6px;
  line-height: 1.5;
  padding: 30px;
  text-align: center;
  color: rgba(#000, 0.87);
  @include media-breakpoint-up(md) {
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 2.5px;
    line-height: 1.8;
    padding: 48px 50px;
  }
}
</style>
