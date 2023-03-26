import { createStore } from "vuex";

const store = createStore({
  // store configuration goes here
  state: {
    currentRoute: null,
    sessionId: null,
  },
  mutations: {
    setCurrentRoute(state, route) {
      state.currentRoute = route;
    },
    setSessionId(state, sessionId) {
      state.sessionId = sessionId;
    },
  },
  getters: {
    getCurrentRoute(state) {
      return state.currentRoute;
    },
    getSessionId(state) {
      return state.sessionId;
    },
  },
});

export default store;
