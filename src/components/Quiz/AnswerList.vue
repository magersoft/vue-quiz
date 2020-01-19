<template>
  <ul class="answer-list">
    <answer-item
      v-for="(answer, index) of answers"
      :key="index"
      :answer="answer"
      :state="state ? state[answer.id] : null"
      @click="$emit('click', answer.id)"
    />
  </ul>
</template>

<script>
import AnswerItem from './AnswerItem';
export default {
  props: {
    answers: Array,
    state: Object
  },
  components: {
    AnswerItem
  }
}
</script>

<style lang="scss" scoped>
.answer-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
