import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import "./index.css";
import "./composables/core/useTestRepository";
import axios from "./plugins/axios";
import router from "./router";
//@ts-ignore
//import { alertMessage } from "vq-core-test";
console.log(import.meta.env);

//alertMessage("Hello world! this is testing message..");

//alertMessage("Okay ok ok...");

//alertMessage("Nooooooo");

const app = createApp(App);
app.use(axios);
app.use(router);

app.mount("#app");

//app.config.globalProperties.$axios = axios;
