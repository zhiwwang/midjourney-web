import {createApp} from 'vue'
import {Notify, Quasar} from 'quasar'
import quasarLang from 'quasar/lang/zh-CN'
import '@quasar/extras/material-icons/material-icons.css'
import './style.css'
import 'quasar/src/css/index.sass'
import App from './App.vue'

createApp(App)
    .use(Quasar, {
        lang: quasarLang,
        plugins: {
            Notify
        },
        config: {
            notify: {}
        }
    })
    .mount('#app')
