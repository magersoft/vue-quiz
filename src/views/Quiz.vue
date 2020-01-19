<template>
    <div class="quiz">
        <loader v-if="loading" />
        <div v-else>
          <h1>{{ quiz.name }}</h1>
          <finish-quiz
            v-if="isFinished"
            :results="results"
            :quiz="quiz"
          />
          <active-quiz
            v-else
            :answers="quiz.items[activeQuestion].answers"
            :question="quiz.items[activeQuestion].question"
            :quiz-length="quiz.items.length"
            :answer-number="activeQuestion + 1"
            :state="answerState"
            @click="clickHandler"
          />
        </div>
    </div>
</template>

<script>
import Loader from '../components/UI/Loader';
import ActiveQuiz from '../components/Quiz/ActiveQuiz';
import FinishQuiz from '../components/Quiz/FinishQuiz';
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    loading: false
  }),
  components: {
    Loader, ActiveQuiz, FinishQuiz
  },
  computed: {
    ...mapGetters([
      'quiz',
      'activeQuestion',
      'answerState',
      'isFinished',
      'results'
    ])
  },
  async created() {
    this.loading = true;
    try {
      await this.$store.dispatch('fetchQuizById', this.$route.params.id);
    } catch (e) {
      console.error(e)
    }
    this.loading = false
  },
  methods: {
    clickHandler(id) {
      this.$store.dispatch('quizAnswerClick', id);
    }
  }
}
</script>

<style>
.quiz {
  display: flex;
  justify-content: center;
  padding-top: 100px;
  flex-grow: 1;
  width: 100%;
}
</style>
