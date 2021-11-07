import { createApp, defineAsyncComponent } from "vue";
import { Quasar } from 'quasar'
import vqQuasar from 'vq-quasar'
console.log(vqQuasar)

// Import icon libraries
import '@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'

// Import Quasar css
import 'quasar/src/css/index.sass'


import App from "./App.vue";
import "./index.css";
import axios from "./plugins/axios";
import router from "./router";
import store from "./store";
console.log(import.meta.env);

const app = createApp(App);
app.use(axios);
app.use(vqQuasar);
app.use(Quasar)
app.use(store);
app.use(router);

app.mount("#app");
