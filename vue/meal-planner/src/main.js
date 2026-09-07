
import './assets/main.css' // se importa en la raiz de la app, vite construye el bundle siguiendo la cadena de imports desde esta raiz.

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App) // componente raiz

app.use(createPinia()) // .use() instala "plugins" globales
app.use(router)

app.mount('#app') // engancha la app al <div id="app"> que hay en index.html.
