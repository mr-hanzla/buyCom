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

const currentPage = ref(1);
const limit = ref(10);

function gotoProductDetailPage(id) {
    router.push({ name: 'ProductDetail', params: { id } })
}

async function selectCategory(e) {
    console.log(e.target.innerText.toLowerCase());
    // await getProductsByCategory(e.target.innerText.toLowerCase());
    window.scrollTo(0, 0);
}

async function getProductsOfCurrentPage() {
    const skip = (currentPage.value -1) * limit.value;
    console.log(currentPage.value, skip);
    await productStore.dispatch('fetchProductsWithLimit', {skip: skip, limit: limit.value});
}

onMounted(async () => {
    await productStore.dispatch('fetchProducts');
    await productStore.dispatch('fetchCategories');
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
            <h2><b>Brand:</b> {{ product.brand }}</h2>
            <h3><b><i>{{ product.title }}</i></b></h3>
            <p><b>Description:</b> {{ product.description }}</p>
            <p><b>Price:</b> ${{ product.price }}</p>
            <!-- <p v-if="product.discountPercentage">Discounted Price: ${{ getDiscountedPrice(product.price,
                product.discountPercentage) }} &lt;|&gtcc; ${{ product.price }}</p> -->
        </div>
    </div>

    <vue-awesome-paginate
    style="margin-left: 45%;"
    :total-items="productStore.state.totalProducts"
    :items-per-page="limit"
    :max-pages-shown="3"
    v-model="currentPage"
    :on-click="getProductsOfCurrentPage"
  />
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

/* ========================================= */
/* .pagination-container {
    display: flex;
    column-gap: 10px;
  }
  .paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
  }
  .paginate-buttons:hover {
    background-color: #b32d2d;
  }
  .active-page {
    background-color: #3498db;
    border: 1px solid #3498db;
    color: white;
  }
  .active-page:hover {
    background-color: #2988c8;
  } */
/* ========================================= */
</style>
