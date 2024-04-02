// const HOST = 'https://dev.apps.black'
// const HOST = 'http://localhost:2401'
const HOST = import.meta.env.VITE_API_URL_APPS_BLACK

const URL = {
    GET_OTP_CODE: HOST + '/login',
    CONFIRM_LOGIN: HOST + '/login/confirm',
    USER_INFO: HOST + '/info',
    LOGOUT_ALL_DEVICES: HOST + '/logout/all',
    GENRES: HOST + '/content/genres',
    CONTENT_POPULAR: HOST + '/content/popular',
    CONTENT_LIST: HOST + '/content',
    CONTENT_DETAIL: HOST + '/content/detail',
    CHAPTER_DETAIL: HOST + '/chapter/detail',
    FAVORITES: HOST + '/favorites',
    CONTENT_SEARCH: HOST + '/content/search',
    LICENSE_SUBMIT: HOST + '/license/submit',
    APPS_BLACK: 'https://apps.black/',
    CONTACT_SUPPORT: 'mailto:hello@apps.black?subject=[Manga_Support]',
    TWITTER: 'https://twitter.com/GetAppsBlack'
}

const app = "manga"

export { URL, app }