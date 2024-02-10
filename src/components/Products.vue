<script setup>
import getDiscountedPrice from '../utils/productUtils';
import axios from 'axios';
import { ref, reactive, onMounted, onBeforeMount, inject } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const productStore = useStore('productStore');
const store = useStore('store');

function gotoProductDetailPage(id) {
    router.push({ name: 'ProductDetail', params: { id } })
}

async function selectCategory(e) {
    console.log(e.target.innerText.toLowerCase());
    // await getProductsByCategory(e.target.innerText.toLowerCase());
    window.scrollTo(0, 0);
}

onMounted(async () => {
    await productStore.dispatch('fetchProducts');
    await productStore.dispatch('fetchCategories');
    store.dispatch('tempFunction');
})

onBeforeMount(async () => {
    const category = route.query.category;
    // category ? await getProductsByCategory(category) : await getProducts();
});
</script>

<template>
    <div class="product-list">
        <div class="product" v-for="product in productStore.state.products" :key="product.id"
            @click="gotoProductDetailPage(product.id)">
            <img :src="product.thumbnail">
            <h2>Brand: {{ product.brand }}</h2>
            <p>Description: {{ product.description }}</p>
            <p v-if="product.discountPercentage">Discounted Price: ${{ getDiscountedPrice(product.price,
                product.discountPercentage) }} &lt;|&gtcc; ${{ product.price }}</p>
        </div>
    </div>
</template>

<style>
.product-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-left: 15%;
}

.product {
    flex-basis: 30%;
    margin: 8px;
    padding: 16px;
    box-shadow: 0px 0px 14px 1px gray;
    cursor: pointer;
}

.product img {
    width: 70%;
}
</style>
