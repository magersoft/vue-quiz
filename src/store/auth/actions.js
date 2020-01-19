import axios from 'axios';
import Message from '../../utils/Message';
import { errors, info } from '../../language/ru_RU';

export default {
  async auth({ commit }, { payload, isLogin = false }) {

    const url = isLogin ?
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDUb3kV8_6SVzHANPtz1qTMmeP4-kFMH0Y' :
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDUb3kV8_6SVzHANPtz1qTMmeP4-kFMH0Y';

    try {
      const { data } = await axios.post(url, {...payload, returnSecureToken: true});
      const token = data.idToken;
      const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);
      localStorage.setItem('token', token);
      localStorage.setItem('userId', data.localId);
      localStorage.setItem('expirationDate', expirationDate);
      commit('setToken', token);
    } catch (e) {
      const { message } = e.response.data.error;
      const m = new Message(errors[message] || message, 'danger');
      m.call();
      console.error(e);
    }
  },
  async getUserData({ commit }) {
    const idToken = localStorage.getItem('token');
    if (idToken) {
      try {
        const { data } = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDUb3kV8_6SVzHANPtz1qTMmeP4-kFMH0Y', { idToken });
        const login = data.users[0].email;
        commit('setLogin', login);
      } catch (e) {
        console.error(e);
      }
    }
  },
  autoLogin({ commit, dispatch }) {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch('logout');
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch('logout');
      } else {
        commit('setToken', token);
      }
    }
  },
  logout({ commit }) {
    const m = new Message(info.SUCCESS_LOGOUT);
    m.call();
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    commit('removeToken');
  }
}
