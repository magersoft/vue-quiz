export default {
  setToken(state, payload) {
    state.token = payload
  },
  removeToken(state) {
    state.token = null;
  },
  setLogin(state, payload) {
    state.login = payload;
  }
}
