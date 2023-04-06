import { createApp } from "vue";
import { createPinia } from "pinia";

import "./style.css";
import App from "./App.vue";
import Routes from "./routes";

const app = createApp(App);

app.use(createPinia());
app.use(Routes);

app.mount("#app");
