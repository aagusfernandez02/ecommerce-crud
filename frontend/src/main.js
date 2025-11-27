import { createApp } from 'vue';
import App from './App.vue';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';
import { VFileUpload } from 'vuetify/labs/VFileUpload'

// Router
import router from './router/router';

// Toastify
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

// Pinia
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// Sweetalert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App)
const vuetify = createVuetify({
  components: {
    ...components,
    VFileUpload
  },
  directives,
})
const pinia = createPinia().use(piniaPluginPersistedstate);

app.use(vuetify)
app.use(router)
app.use(Vue3Toastify, {autoClose: 3000})
app.use(pinia)
app.use(VueSweetalert2);

app.mount('#app')

