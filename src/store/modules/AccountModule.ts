import { Module } from 'vuex';

interface AccountState {
  account: {
    app: string | null;
    email: string | null;
    apikey: string | null;
    licenses: [];
  };
}

const accountModule: Module<AccountState, any> = {
  namespaced: true,
  state: {
    account: {
      app: null,
      email: null,
      apikey: null,
      licenses: []
    },
  },
  mutations: {
    SET_ACCOUNT(state, account) {
      state.account = account;
    },
    CLEAR_ACCOUNT_STATE(state) {
      state.account = {
        app: null,
        email: null,
        apikey: null,
        licenses: []
      };
    }
  },
  actions: {
    setAccount({ commit }, account) {
      commit('SET_ACCOUNT', account);
    },
    clearAccount({ commit }) {
      commit('CLEAR_ACCOUNT_STATE');
    }
  },
  getters: {
    getAccount(state) {
      return state.account;
    },
  },
};

export default accountModule;