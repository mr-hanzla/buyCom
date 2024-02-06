<script setup>
import axios from 'axios';
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const data = reactive({
    info: null,
    temp: 'GooGooGaGa',
    loaded: false
})

async function getUser() {
    try {
        const credentials = { username: "atuny0", password: "9uQFF1Lh" }
        // const credentials = { username: "kminchelle", password: "0lelplR" }
        const response = await axios.post('https://dummyjson.com/auth/login', credentials)
        const userData = response.data;
        data.loaded = true;
        return userData;
    } catch (error) {
        data.loaded = false;
        return error;
    }
}

function toLoginView() {
    console.log('Going to the login view!');
    router.push('/login');
}

async function getProducts() {

}

onMounted(async () => {
    data.info = await getUser();
    console.log(JSON.stringify(data.info));
    console.log(data.info);
});
</script>

<template>
    <h1 @click="toLoginView">Hello Mello</h1>
    <h1>{{ data.info }}</h1>
    <h1 v-if="data.loaded && data.info !== null && data.info.token !== undefined">{{ data.info.token }}</h1>
</template>
