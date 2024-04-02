import { Module } from 'vuex';
import Content from '@/models/Content';

interface FavoriteState {
    favorites: Content[];
}

const favoriteModule: Module<FavoriteState, any> = {
    namespaced: true,
    state: {
        favorites: [],
    },
    mutations: {
        SET_FAVORITES(state, favorites) {
            state.favorites = favorites;
        },
        CLEAR_FAVORITES_STATE(state) {
            state.favorites = [];
        }
    },
    actions: {
        setFavorites({ commit }, favorites) {
            commit('SET_FAVORITES', favorites);
        },
        clearFavorites({ commit }) {
            commit('CLEAR_FAVORITES_STATE');
        }
    },
    getters: {
        getFavorites(state) {
            return state.favorites.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        },
        getFavorite: (state) => (title: string, url: string, thumbnail: string) => {
            return state.favorites.find(item => item.title === title && item.url === url && item.thumbnail === thumbnail)
        }
    },
};

export default favoriteModule;