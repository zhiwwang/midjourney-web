import { createApp } from 'vue'
import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/zh-CN'
import '@quasar/extras/material-icons/material-icons.css'
import './style.css'
import 'quasar/dist/quasar.css'
import App from './App.vue'

createApp(App).use(Quasar, {lang: quasarLang}).mount('#app')
