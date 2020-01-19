export default {
  createQuizQuestion(state, payload) {
    state.newQuiz = [...state.newQuiz, payload]
  },
  resetQuizCreation(state) {
    state.newQuiz = [];
  }
}
