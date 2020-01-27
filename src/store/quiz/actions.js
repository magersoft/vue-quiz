import axios from '../../utils/axios-db';

export default {
  async fetchQuizes({ commit }) {
    try {
      const quizes = [];
      const { data } = await axios.get('/quizes.json');
      Object.keys(data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `${index + 1}. ${data[key].name}`,
          author: data[key].author
        })
      });
      commit('setQuiezes', quizes);
    } catch (e) {
      console.error(e);
    }
  },
  async fetchQuizById({ commit }, id) {
    try {
      const { data } = await axios.get(`/quizes/${id}.json`);
      commit('setQuiz', data);
    } catch (e) {
      console.error(e);
    }
  },
  async removeQuiz({ commit }, id) {
    try {
      await axios.delete(`/quizes/${id}.json`);
      commit('removeQuiz', id);
    } catch (e) {
      console.error(e);
    }
  },
  quizAnswerClick({ commit, state }, id) {
    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === 'success') {
        return;
      }
    }

    const question = state.quiz.items[state.activeQuestion];
    const results = state.results;

    if (question.rightAnswerId === id) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }

      commit('quizSetState', {
        answerState: { [id]: 'success' },
        results
      });

      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          commit('finishQuiz')
        } else {
          commit('quizNextQuestion', state.activeQuestion + 1)
        }
        window.clearTimeout(timeout);
      }, 1000)
    } else {
      results[question.id] = 'error';
      commit('quizSetState', {
        answerState: { [id]: 'error' },
        results
      })
    }
  },
  quizResetState({ commit }) {
    commit('quizReset')
  }
}

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.items.length;
}
