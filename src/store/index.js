import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth';
import quiz from './quiz';
import create from './create'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    quiz,
    create
  }
})
