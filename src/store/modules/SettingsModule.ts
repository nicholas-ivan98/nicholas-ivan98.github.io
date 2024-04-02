import { Module } from 'vuex';

interface SettingsState {
    setting: {
        darkMode: boolean | true;
        orderChapters: string | "asc";
    };
}

const settingsModule: Module<SettingsState, any> = {
    namespaced: true,
    state: {
        setting: {
            darkMode: true,
            orderChapters: "asc"
        },
    },
    mutations: {
        SET_DARK_MODE(state, isDarkMode) {
            state.setting.darkMode = isDarkMode;
        },
        SET_ORDER_CHAPTERS(state, order) {
            state.setting.orderChapters = order
        },
        CLEAR_SETTINGS_STATE(state) {
            state.setting = {
                darkMode: true,
                orderChapters: "asc"
            };
        }
    },
    actions: {
        setDarkMode({ commit }, darkMode) {
            commit('SET_DARK_MODE', darkMode);
        },
        setOrderChapters({ commit }, order) {
            commit('SET_ORDER_CHAPTERS', order);
        },
        clearAccount({ commit }) {
            commit('CLEAR_SETTINGS_STATE');
        }
    },
    getters: {
        isDarkMode(state) {
            return state.setting.darkMode;
        },
        getOrderChapters(state) {
            return state.setting.orderChapters;
        }
    },
};

export default settingsModule;