import axios from '../../utils/axios-db';
import Message from '../../utils/Message';

export default {
  createQuizQuestion({ commit }, payload) {
    commit('createQuizQuestion', payload)
  },
  async finishCreateQuiz({ commit, state }, { name, author }) {
    try {
      await axios.post('/quizes.json', {
        name, author, items: state.newQuiz
      });
      commit('resetQuizCreation');
      const m = new Message('Тест успешно создан', 'success');
      m.call();
    } catch (e) {
      const m = new Message(e.message, 'danger');
      m.call();
      console.error(e)
    }
  }
}
