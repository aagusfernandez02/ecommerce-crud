import { createApp } from 'vue';
import App from './App.vue';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

// Router
import router from './router/router';

// Toastify
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

// Pinia
import { createPinia } from 'pinia';

const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives,
})
const pinia = createPinia();

app.use(vuetify)
app.use(router)
app.use(Vue3Toastify, {autoClose: 3000})
app.use(pinia)

app.mount('#app')

