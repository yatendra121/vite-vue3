import { createApp, defineAsyncComponent } from "vue";

import App from "./App.vue";
import "./index.css";
import axios from "./plugins/axios";
import router from "./router";
import store from "./store";
console.log(import.meta.env);

const app = createApp(App);
app.use(axios);
app.use(store);
app.use(router);

app.mount("#app");
