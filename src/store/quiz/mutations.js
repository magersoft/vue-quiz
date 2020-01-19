export default {
  setQuiezes(state, payload) {
    state.quizes = payload;
  },
  setQuiz(state, payload) {
    state.quiz = payload;
  },
  quizSetState(state, { answerState, results }) {
    state.answerState = answerState;
    state.results = results;
  },
  finishQuiz(state) {
    state.isFinished = true;
  },
  quizNextQuestion(state, number) {
    state.activeQuestion = number;
    state.answerState = null;
  },
  quizReset(state) {
    state.activeQuestion = 0;
    state.results = {};
    state.isFinished = false;
    state.answerState = null;
  }
}
