import { Module } from 'vuex';
import Content from '@/models/Content';

interface HistoryState {
    histories: Content[];
}

const historyModule: Module<HistoryState, any> = {
    namespaced: true,
    state: {
        histories: [],
    },
    mutations: {
        SET_HISTORIES(state, histories) {
            state.histories = histories;
        },
        SET_HISTORY(state, history) {
            const historyVuex = state.histories.find(item => item.url === history.url)
            if(historyVuex) {
                // console.log('ahuhu', historyVuex)
                historyVuex.currentChapter = history.currentChapter
                historyVuex.recentlyRead = new Date()
            } else {
                const data = new Content(history.url, history.title, history.thumbnail, undefined, undefined, history.currentChapter)
                state.histories.push(data);
            }
        },
        REMOVE_HISTORY(state, history) {
            const index = state.histories.findIndex(item => item.url === history.url && item.title === history.title)
            state.histories.splice(index)
        },
        CLEAR_HISTORIES_STATE(state) {
            state.histories = [];
        }
    },
    actions: {
        setHistories({ commit }, histories) {
            commit('SET_HISTORIES', histories);
        },
        setHistory({ commit }, history) {
            commit('SET_HISTORY', history);
        },
        clearHistories({ commit }) {
            commit('CLEAR_HISTORIES_STATE');
        }
    },
    getters: {
        getHistories(state) {
            return state.histories.sort((a, b) => new Date(b.recentlyRead).getTime() - new Date(a.recentlyRead).getTime());
        },
        getHistory: (state) => (url: string) => {
            return state.histories.find(item => item.url === url)
        }
    },
};

export default historyModule;