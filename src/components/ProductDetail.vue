<script setup>
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { computed } from 'vue';
import { onBeforeMount } from 'vue';
import { ref } from 'vue';
import axios from 'axios';
import { reactive } from 'vue';
import router from '@/router';

const route = useRoute();
const productStore = useStore('productStore');

// get products in case the state is re-initialized
productStore.dispatch('fetchProducts');

const selectedProduct = computed(() => {
    return productStore.state.products.find(item => item.id === Number(route.params.id))
});

const addToCart = () => {
    productStore.dispatch('addToCart', selectedProduct.value);
}

onMounted(() => {
    console.log('Mounted!!!!!----------------')
});
</script>

<template>
    <h1>Single Product</h1>
    <!-- <h1>{{ selectedProduct }}</h1> -->
    <button @click="router.push({ name: 'Home' })">Home</button>
    <div class="product">
        <div class="product-image">
            <img :src="selectedProduct.thumbnail">
        </div>
        <div class="product-details">
            <p>Brand: {{ selectedProduct.brand }}</p>
            <p>Description: {{ selectedProduct.description }}</p>
            <h2>Price: ${{ selectedProduct.price }}</h2>
            <button @click="addToCart">Add to Cart</button>
        </div>
    </div>
</template>

<style scoped>
.product {
    display: flex;
    margin-top: 50px;
}

.product-image {
    margin-right: 25px;
}
</style>
