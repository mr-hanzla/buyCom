<script setup>
// import ApiTesting from './components/ApiTesting.vue';
import { ref, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const route = useRoute()

const store = useStore();
const productStore = useStore('productStore');

const categories = ref('');
const selectedCategory = ref('');

async function getCategories() {
    selectedCategory.value = route.query.category;
    console.log(selectedCategory.value);
    try {
        const response = await axios.get('https://dummyjson.com/products/categories')
        categories.value = response.data;
    } catch (error) {
        console.log('Error getting categories!' + error)
        return error;
    }
}

async function selectCategory(e) {
    console.log(e.target.innerText.toLowerCase());
    await productStore.dispatch('fetchProductsByCategory', e.target.innerText.toLowerCase());
    window.scrollTo(0, 0);
}

function logout() {
    store.dispatch('logout');
    router.push('/login');
}

onBeforeMount(async () => {
    await getCategories();
});
</script>

<template>
    <header>
        <ul class="navbar">
            <li><router-link to="/">BuyCom</router-link></li>
            <li v-if="store.state.user" style="float:right"><a @click="logout" href="">Logout</a></li>
            <li style="float:right">
                <router-link v-if="store.state.user" class="active" to="/login">
                    Welcome, {{ store.state.user.firstName }}
                </router-link>
                <router-link v-else="" class="active" to="/login">
                    Login
                </router-link>
            </li>
            <li @click="router.push({ name: 'CartView' })" style="float:right">
                <a> &#128722; 🛒 {{ productStore.state.cart.length }}</a>
            </li>
        </ul>

    </header>

    <div class="w3-sidebar w3-bar-block w3-border-right">
        <router-link v-for="category in categories" @click="selectCategory"
            :to="{ name: 'Home', query: { category: category } }" class="btn btn-sm"> <i class="w3-bar-item w3-button">{{
                category.toUpperCase() }}</i></router-link>
    </div>

    <div style="margin-left:0%; margin-top: 5%;">
        <!-- shows the component/view linked with the current route -->
        <router-view></router-view>
    </div>
</template>

<style scoped>
/* category list */
.w3-sidebar.w3-bar-block.w3-border-right {
    padding-left: 30px;
    /* text-align: center; */
    width: 15%;
    margin-top: 5%;
}

.cart-items {
    text-align: end;
    padding: 16px;
    font-weight: bold;
    font-size: 24px;
    cursor: pointer;
}

.navbar {
    overflow: hidden;
    background-color: #333;
    position: fixed;
    top: 0;
    width: 100%;
}

.main-app {
    /* padding: 350px; */
    border: 4px solid green;
    display: grid;
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
}

li {
    float: left;
}

li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
}

li a:hover {
    background-color: #111;
}
</style>
