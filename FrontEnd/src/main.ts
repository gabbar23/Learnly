import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./assets/main.css";
import { plugin, defaultConfig } from '@formkit/vue'
import '@formkit/themes/genesis'
const app = createApp(App);
app.use(router);
app.use(plugin, defaultConfig); 
app.mount("#app");