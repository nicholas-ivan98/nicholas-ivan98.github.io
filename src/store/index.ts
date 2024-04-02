import { createStore } from 'vuex';
import accountModule from './modules/AccountModule';
import settingsModule from './modules/SettingsModule';
import favoriteModule from './modules/FavoriteModule';
import historyModule from './modules/HistoryModule';
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
  })

const store = createStore({
    modules: {
        account: accountModule,
        settings: settingsModule,
        favorites: favoriteModule,
        histories: historyModule
    },
    plugins: [vuexLocal.plugin]
});

export default store;