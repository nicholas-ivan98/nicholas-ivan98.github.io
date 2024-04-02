import { computed } from 'vue';
import store from '@/store';

const isDarkMode = computed(() => store.getters['settings/isDarkMode']);

const ThemeHelper = {
    initializeTheme: () => {
        // const isDarkMode = localStorage.getItem('darkMode') === 'true' || true
        ThemeHelper.toggleDarkTheme(isDarkMode.value);
    },
    toggleDarkTheme: (shouldAdd: boolean) => {
        // localStorage.setItem('darkMode', JSON.stringify(shouldAdd));
        store.dispatch('settings/setDarkMode', shouldAdd);
        document.body.classList.toggle('dark', shouldAdd);
    },
    isEnableDarkMode: () => {
        // return localStorage.getItem('darkMode') === 'true' || true
        return isDarkMode
    },
    setLightModeInInstallPage: () => {
        document.body.classList.toggle('dark', false);
    }
}

export default ThemeHelper