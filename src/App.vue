<script setup>
// import ApiTesting from './components/ApiTesting.vue';
import { ref, onBeforeMount, onMounted, normalizeClass } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const currentUser = ref('');
const categories = ref('');

async function getCategories() {
    try {
        const response = await axios.get('https://dummyjson.com/products/categories')
        categories.value = response.data;
    } catch (error) {
        console.log('Error getting categories!' + error)
        return error;
    }
}

function logout() {
    localStorage.removeItem('current-user');
    console.log(currentUser.value);
    router.push('/login');
}

onBeforeMount(async () => {
    await getCategories();
});

onMounted(() => {
    const curUser = localStorage.getItem('current-user');
    if (curUser !== null) {
        currentUser.value = JSON.parse(curUser);
    } else {
        router.push('/login');
    }
})
</script>

<template class="main-app">
    <header>
        <ul class="navbar">
            <li><router-link to="/">BuyCom</router-link></li>
            <!-- <li><a href="#news">News</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#about">About</a></li> -->
            <li v-if="currentUser" style="float:right"><a @click="logout" href="">Logout</a></li>
            <li style="float:right">
                <router-link v-if="currentUser" class="active" to="/login">
                    Welcome, {{ currentUser.firstName }}
                </router-link>
                <router-link v-else="" class="active" to="/login">
                    Login
                </router-link>
            </li>
        </ul>
    </header>

    <div style="margin-left:0%; margin-top: 5%;">
        <!-- shows the component/view linked with the current route -->
        <router-view></router-view>
    </div>
</template>

<style scoped>
.navbar {
    overflow: hidden;
    background-color: #333;
    position: fixed;
    top: 0;
    width: 100%;
}

/* .main-app {
    display: flex;
} */

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
