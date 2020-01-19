<template>
  <div>
    <div class="active-quiz">
      <p class="question">
        <span>
          <strong>{{ answerNumber }}.</strong>
          {{ question }}
        </span>
        <small>
          {{ answerNumber }} из {{ quizLength }}
        </small>
      </p>

      <answer-list
        :state="state"
        :answers="answers"
        @click="clickHandler"
      />
    </div>
  </div>
</template>

<script>
import AnswerList from './AnswerList';

export default {
  props: {
    state: Object,
    question: String,
    answers: Array,
    answerNumber: Number,
    quizLength: Number
  },
  components: {
    AnswerList
  },
  methods: {
    clickHandler(id) {
      this.$emit('click', id);
    }
  }
}
</script>

<style lang="scss">
.active-quiz {
  padding: 20px;
  color: white;
  border: 2px solid white;
  border-radius: 5px;
  margin: 0 10px;
  box-sizing: border-box;
  background: rgba(0,0,0,.5);
  width: 600px;
}


.question {
  display: flex;
  justify-content: space-between;
}

</style>
