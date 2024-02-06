import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import ApiTesting from './components/ApiTesting.vue';
import Products from './components/Products.vue'
import ProductDetails from './components/ProductDetails.vue'

const routes = [
    { path: '/', component: Products },
    { path: '/login', component: Login },
    { path: '/product-details', component: ProductDetails, props: true },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
