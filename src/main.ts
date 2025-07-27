import { createApp } from 'vue'
import '@/style.css'
import App from './App.vue'
import router from '@/router'
import 'amfe-flexible';
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persistedstate'   // pinia 持久化插件


const pinia = createPinia()
pinia.use(piniaPluginPersist)

const app = createApp(App);
app.use(router)
app.use(pinia)

app.mount('#app');
