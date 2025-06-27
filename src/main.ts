
// src/main.ts
import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router' // <- Aquí se importa


const app = createApp(App)

app.use(createPinia())
app.use(router) // <- Aquí se usa

app.mount('#app')
