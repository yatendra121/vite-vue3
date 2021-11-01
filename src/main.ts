import { createApp, defineAsyncComponent } from "vue";

import App from "./App.vue";
import "./index.css";
import axios from "./plugins/axios";
import router from "./router";
import store from "./store";
//@ts-ignore
import vuetify from "./plugins/vuetify";
//@ts-ignore
import { loadFonts } from "./plugins/webfontloader";

loadFonts();

//@ts-ignore
//import { alertMessage } from "vq-core-test";
console.log(import.meta.env);

//alertMessage("Hello world! this is testing message..");

//alertMessage("Okay ok ok...");

//alertMessage("Nooooooo");

const app = createApp(App);
app.use(axios);
app.use(store);
app.use(router);
app.use(vuetify);

app.mount("#app");

//app.config.globalProperties.$axios = axios;
