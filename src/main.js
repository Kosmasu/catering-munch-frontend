import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import MunchService from './MunchService'
import { useAuthStore } from './stores/Auth/AuthStore'

library.add(faSpinner)

const app = createApp(App)

axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')

// https://axios-http.com/docs/interceptors
MunchService.http.interceptors.request.use(async response => {
  // console.log('response request interceptor:',response);
  if (response.method != "get") {
    const authStore = useAuthStore()
    await authStore.sanctum()
  }
  return response;
}, error => {
  // console.log('error request interceptor:',error);
  return Promise.reject(error);
});

MunchService.http.interceptors.response.use(async response => {
  // console.log('response response interceptor:',response);
  return response;
}, error => {
  // console.log('error response interceptor:',error);
  if (error.response.status == 401 || error.response.status == 419) {
    const authStore = useAuthStore()
    authStore.removeUserFromLocalStorage()
    router.push({ name: 'login' })
  }
  return Promise.reject(error);
});