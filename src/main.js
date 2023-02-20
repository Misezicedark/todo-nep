import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import axios from "axios";
import routes from './routes'

import './assets/css/main.scss'

const app = createApp(App);

const router = createRouter({
	// 4. Provide the history implementation to use. We are using the hash history for simplicity here.
	history: createWebHashHistory(),
	routes, // short for `routes: routes`
})
app.use(router);

// Define axios plugin
const api = axios.create({
	baseURL: 'https://63e772d0ac3920ad5bde168c.mockapi.io/todo-nep/v1/task/',
});
app.config.globalProperties.axios=api

// Configure the store and bind the axios instance to it
const pinia = createPinia();
app.use(pinia);
app.provide('axios', api);
pinia.use(() => ({ api }));


app.mount('#app');