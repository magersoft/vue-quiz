import axios from 'axios';

export default {
  async auth({ commit }, { payload, isLogin = false }) {
    console.log(isLogin);

    const url = isLogin ?
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDUb3kV8_6SVzHANPtz1qTMmeP4-kFMH0Y' :
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDUb3kV8_6SVzHANPtz1qTMmeP4-kFMH0Y';

    try {
      const { data } = await axios.post(url, {...payload, returnSecureToken: true});
      console.log(data);
      commit('setToken', null)
    } catch (e) {
      console.error(e);
    }
  }
}
