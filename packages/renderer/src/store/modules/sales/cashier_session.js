import cashierService from '../../../services/sales/CashierService';

const state = {
  cashier_sessions: null,
  current_session: null,
};

// getters
const getters = {
  cashierSessions: (state) =>
    state.cashier_sessions ? JSON.parse(state.cashier_sessions) : [],
  currentSession: (state) =>
    state.current_session ? JSON.parse(state.current_session) : null,
};

// privileges
const actions = {
  openSession({ commit }, cashierSession) {
    return cashierService
      .openSession(cashierSession)
      .then(({ data }) => {
        commit('SET_CASHIER_SESSION', data);
        return data;
      })
      .catch((err) => {
        if (err.response) return Promise.reject(err.response.data);
        else return Promise.reject(err);
      });
  },
  closeSession({ commit, getters }, cashierSessionId = null) {
    return cashierService
      .closeSession(cashierSessionId ?? getters.currentSession.id)
      .then(({ data }) => {
        commit('SET_CASHIER_SESSION', null);
        return data;
      })
      .catch((err) => {
        if (err.response) return Promise.reject(err.response.data);
        else return Promise.reject(err);
      });
  },
};

// mutations
const mutations = {
  SET_CASHIER_SESSION(state, data) {
    state.current_session = data ? JSON.stringify(data) : null;
    setTimeout(() => {
      if (window?.ipcRenderer)
        window?.ipcRenderer?.send('reload', 'User open cashier session');
      else location.reload();
    }, 500);
  },
  ADD_CASHIER_SESSION(state, cashier_session) {
    let cashier_sessions = JSON.parse(state.cashier_sessions);
    cashier_sessions.push(cashier_session);
    state.cashier_sessions = JSON.stringify(cashier_sessions);
  },
  UPDATE_CASHIER_SESSION(state, cashier_session) {
    let cashier_sessions = JSON.parse(state.cashier_sessions);
    const index = cashier_sessions.findIndex(
      (p) => p.id === cashier_session.id
    );
    if (index !== -1) {
      cashier_sessions.splice(index, 1, cashier_session);
      state.cashier_sessions = JSON.stringify(cashier_sessions);
    }
  },
  DELETE_CASHIER_SESSION(state, cashier_session_id) {
    state.cashier_sessions = JSON.stringify(
      JSON.parse(state.cashier_sessions).filter(
        (p) => p.id !== cashier_session_id
      )
    );
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
