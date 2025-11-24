import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

// Router
import router from './router/router'

// Toastify
import { createToastify } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives,
})
const toastify = createToastify({
  position: 'top-right',
  autoClose: 2500,
});

app.use(vuetify)
app.use(router)
app.use(toastify);
app.mount('#app')

