import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Products from './components/Products.vue'
import ProductDetail from './components/ProductDetail.vue';
import ProductDetails from './components/ProductDetails.vue'
import Cart from './components/Cart.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Products
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/product/:id',
        name: 'ProductDetail',
        component: ProductDetail
    },
    {
        path: '/cart',
        name: 'CartView',
        component: Cart
    },
    {
        path: '/product-details',
        name: 'ProductDetails',
        component: ProductDetails,
        props: true
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
