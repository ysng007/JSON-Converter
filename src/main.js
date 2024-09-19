import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/main.css'
import 'virtual:uno.css'
import { JsonViewer } from "vue3-json-viewer";
import { i18n } from './locales/i18n';

createApp(App)
  .use(i18n)
  .use(createPinia())
  .use(JsonViewer)
  .mount('#app')
