// import './assets/main.css'

import { createApp, inject } from 'vue';
import App from './App.vue';
import router from './router';
import store from './plugins/store'
import productStore from './plugins/productStore'
import vuetify from './plugins/vuetify';

const app = createApp(App);

app.use(router);

app.use(vuetify);

// app.provide('store', store); // this workes with 'inject'
app.use(store);
app.provide('productStore', productStore);

app.mount('#app');
