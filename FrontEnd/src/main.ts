import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./assets/main.css";
import { plugin, defaultConfig } from "@formkit/vue";
import "@formkit/themes/genesis";
import Notifications from '@kyvg/vue3-notification'


// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";


const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);
app.use(router);
app.use(plugin, defaultConfig);
app.use(vuetify);
app.use(Notifications);
app.mount("#app");
