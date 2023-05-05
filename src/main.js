import { createApp } from 'vue'
import './css/app.scss'

import App from './App.vue'
import router from './router/routes'

import axios from 'axios'
import VueAxios from 'vue-axios'

import { createPinia } from 'pinia'


/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret, faBell, faUser, faShoppingCart, faBarcode, faArrowLeft, faCancel } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret, faBell, faUser, faShoppingCart, faBarcode, faArrowLeft, faCancel)

createApp(App)
.use(createPinia())
.use(VueAxios, axios)
.use(router)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
