import { createApp } from 'vue'
import App from './App.vue'

import axios from "axios";

const app = createApp(App);

const instance = axios.create({
	baseURL: 'https://63e772d0ac3920ad5bde168c.mockapi.io/todo-nep/v1/task/',
});

app.config.globalProperties.axios=instance

app.mount('#app');