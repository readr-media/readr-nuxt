<template>
  <form class="feedback-form">
    <input
      v-model="feedback.nickname"
      type="text"
      placeholder="姓名暱稱（非必填）"
    />
    <input
      v-model="feedback.email"
      type="email"
      placeholder="電子信箱（非必填）"
    />
    <textarea
      v-model="feedback.content"
      placeholder="針對這篇報導有什麼想法？"
      required
    />
  </form>
</template>

<script>
export default {
  name: 'RdFeedbackForm',

  data() {
    return {
      feedback: {
        nickname: '',
        email: '',
        content: '',
      },
    }
  },

  watch: {
    feedback: {
      deep: true,
      handler(values) {
        this.$emit('userGiveFeedback', values)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.feedback-form {
  font-size: 13px;
  line-height: 1.8;
  @include media-breakpoint-up(md) {
    font-size: 15px;
  }
}

input,
textarea {
  background-color: rgba(245, 235, 255, 0.5);
  border-radius: 2px;
  padding-left: 8px;
  padding-right: 8px;
  width: 100%;
  font-weight: 500;
  letter-spacing: 1.5px;
  display: block;
  border: 2px solid #f5ebff;
  @include media-breakpoint-up(md) {
    padding-left: 10px;
    padding-right: 10px;
    letter-spacing: 2.5px;
  }
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: rgba(#000, 0.66);
  }
}
input {
  padding-top: 8px;
  padding-bottom: 8px;
  margin-bottom: 10px;
  @include media-breakpoint-up(md) {
    padding-top: 6px;
    padding-bottom: 6px;
  }
}
textarea {
  padding-top: 6px;
  padding-bottom: 6px;
  min-height: 100px;
}
</style>
