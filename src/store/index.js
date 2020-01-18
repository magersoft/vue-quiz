import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../utils/axios-db';
import auth from './auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    quizes: [],
    quiz: null
  },
  getters: {
    quizes: state => state.quizes,
    quiz: state => state.quiz
  },
  mutations: {
    setQuiezes(state, payload) {
      state.quizes = payload;
    },
    setQuiz(state, payload) {
      state.quiz = payload;
    }
  },
  actions: {
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
    }
  },
  modules: {
    auth
  }
})
