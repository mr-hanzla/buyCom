<script setup>
import axios from 'axios';
import { ref, reactive, onMounted, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const products = ref('');
const categories = ref('');
const selectedCategory = ref('');

async function getCategories() {
    try {
        const response = await axios.get('https://dummyjson.com/products/categories')
        categories.value = response.data;
    } catch (error) {
        console.log('Error getting categories!' + error)
        return error;
    }
}

const data = reactive({
    info: null,
    temp: 'GooGooGaGa',
    loaded: false,
})

async function getProducts() {
    try {
        const response = await axios.get('https://dummyjson.com/products')
        data.loaded = true;
        products.value = response.data;
    } catch (error) {
        data.loaded = false;
        return error;
    }
}

async function getProductsByCategory(category) {
    try {
        const response = await axios.get(`https://dummyjson.com/products/category/${category}`)
        data.loaded = true;
        products.value = response.data;
        console.log(products.value.products);
    } catch (error) {
        data.loaded = false;
        return error;
    }
}

async function selectCategory(e) {
    console.log(e.target.innerText.toLowerCase());
    await getProductsByCategory(e.target.innerText.toLowerCase());
    window.scrollTo(0, 0);
}

function calPercentageValue(number, percentage) {
    return number * (percentage / 100);
}

function getDiscountedPrice(price, discountPercentage) {
    return (price - calPercentageValue(price, discountPercentage)).toFixed(2);
}

onBeforeMount(async () => {
    await getProducts();
    await getCategories();
});
</script>

<template>
    <h1>Welcome to BuyCom</h1>
    <h1 v-if="data.loaded && data.info !== null && data.info.token !== undefined">{{ data.info.token }}</h1>

    <div class="w3-sidebar w3-bar-block w3-border-right">
        <a v-for="category in categories" @click="selectCategory" class="w3-bar-item w3-button">{{ category.toUpperCase()
        }}</a>
    </div>

    <section class="sec bg-light" style="margin-left: 15%;">
        <div class="container">
            <div class="row">
                <div class="col-md-12 list-slider mt-4">
                    <div class="owl-carousel common_wd  owl-theme" id="recent_post">
                        <!-- product cards -->
                        <div style="border: 3px solid red;" v-for="product in products.products" class="item">
                            <div class="sq_box shadow">
                                <div class="pdis_img">
                                    <span class="wishlist">
                                        <a alt="Add to Wish List" title="Add to Wish List" href="javascript:void(0);"> <i
                                                class="fa fa-heart"></i></a>
                                    </span>
                                    <a href="#">
                                        <img :src="product.thumbnail">
                                    </a>
                                </div>
                                <h4 class="mb-1"> <a href="#"> {{ product.title }} </a> </h4>
                                <div v-if="product.discountPercentage" class="price-box mb-2">
                                    <span class="price"> Price: <i class="fa fa-inr">${{ product.price }}</i></span>
                                    <span class="offer-price"> Offer Price <i class="fa fa-inr"></i> ${{
                                        getDiscountedPrice(product.price, product.discountPercentage) }} </span>
                                </div>
                                <div v-else class="price-box mb-2">
                                    <span class="price"> Price: $<i class="fa fa-inr"></i> {{ product.price }} </span>
                                </div>
                                <div class="btn-box text-center">
                                    <router-link :to="{ path: '/product-details', params: { id: product.id }, query: { product: product, id: product.id } }" class="btn btn-sm" href="javascript:void(0);"> <i class="fa fa-shopping-cart"></i>
                                        Show More </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <footer style="margin-left: 15%;" class="bg-gray-200 text-gray-600 py-4 mt-8">
        <div class="container mx-auto text-center">
            <p>&copy; 2022 BuyCom Store. All rights reserved.</p>
        </div>
    </footer>
</template>

<style>
/* category list */
.w3-sidebar.w3-bar-block.w3-border-right {
    width: 15%;
}

/* product card */
.bg-white.p-4.rounded-md.shadow-md {
    border: 3px solid blue;
    width: 500px;
}

/* product card image */
.w-full.h-32.object-cover.mb-4.rounded-md {
    border: 4px solid green;
    width: 300px;
    /* height: 50px; */
}

/* category sidebar */
.w3-sidebar.w3-bar-block.w3-border-right {
    border: 3px solid yellow;
}

/* ========================================================= */
/* ========================================================= */
/* ========================================================= */
/* ========================================================= */
/* ========================================================= */

.picZoomer {
    position: relative;
    /*margin-left: 40px;
    padding: 15px;*/
}

.picZoomer-pic-wp {
    position: relative;
    overflow: hidden;
    text-align: center;
}

.picZoomer-pic-wp:hover .picZoomer-cursor {
    display: block;
}

.picZoomer-zoom-pic {
    position: absolute;
    top: 0;
    left: 0;
}

/*
.picZoomer-pic {
    width: 100%;
	height: 100%;
}*/

.picZoomer-zoom-wp {
    display: none;
    position: absolute;
    z-index: 999;
    overflow: hidden;
    border: 1px solid #eee;
    height: 460px;
    margin-top: -19px;
}

.picZoomer-cursor {
    display: none;
    cursor: crosshair;
    width: 100px;
    height: 100px;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    border: 1px solid #eee;
    background-color: rgba(0, 0, 0, .1);
}

.picZoomCursor-ico {
    width: 23px;
    height: 23px;
    position: absolute;
    top: 40px;
    left: 40px;
    background: url(images/zoom-ico.png) left top no-repeat;
}

.my_img {
    vertical-align: middle;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    height: 100%;
}

.piclist li {
    display: inline-block;
    width: 90px;
    height: 114px;
    border: 1px solid #eee;
}

.piclist li img {
    width: 97%;
    height: auto;
}

/* custom style */
.picZoomer-pic-wp,
.picZoomer-zoom-wp {
    border: 1px solid #eee;
}



.section-bg {
    background-color: #fff1e0;
}

section {
    padding: 60px 0;
}

.row-sm .col-md-6 {
    padding-left: 5px;
    padding-right: 5px;
}

/*===pic-Zoom===*/
._boxzoom .zoom-thumb {
    width: 90px;
    display: inline-block;
    vertical-align: top;
    margin-top: 0px;
}

._boxzoom .zoom-thumb ul.piclist {
    padding-left: 0px;
    top: 0px;
}

._boxzoom ._product-images {
    width: 80%;
    display: inline-block;
}

._boxzoom ._product-images .picZoomer {
    width: 100%;
}

._boxzoom ._product-images .picZoomer .picZoomer-pic-wp img {
    left: 0px;
}

._boxzoom ._product-images .picZoomer img.my_img {
    width: 100%;
}

.piclist li img {
    height: 100px;
    object-fit: cover;
}

/*======products-details=====*/
._product-detail-content {
    background: #fff;
    padding: 15px;
    border: 1px solid lightgray;
}

._product-detail-content p._p-name {
    color: black;
    font-size: 20px;
    border-bottom: 1px solid lightgray;
    padding-bottom: 12px;
}

.p-list span {
    margin-right: 15px;
}

.p-list span.price {
    font-size: 25px;
    color: #318234;
}

._p-qty>span {
    color: black;
    margin-right: 15px;
    font-weight: 500;
}

._p-qty .value-button {
    display: inline-flex;
    border: 0px solid #ddd;
    margin: 0px;
    width: 30px;
    height: 35px;
    justify-content: center;
    align-items: center;
    background: #fd7f34;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    color: #fff;
}

._p-qty .value-button {
    border: 0px solid #fe0000;
    height: 35px;
    font-size: 20px;
    font-weight: bold;
}

._p-qty input#number {
    text-align: center;
    border: none;
    border-top: 1px solid #fe0000;
    border-bottom: 1px solid #fe0000;
    margin: 0px;
    width: 50px;
    height: 35px;
    font-size: 14px;
    box-sizing: border-box;
}

._p-add-cart {
    margin-left: 0px;
    margin-bottom: 15px;
}

.p-list {
    margin-bottom: 10px;
}

._p-features>span {
    display: block;
    font-size: 16px;
    color: #000;
    font-weight: 500;
}

._p-add-cart .buy-btn {
    background-color: #fd7f34;
    color: #fff;
}

._p-add-cart .btn {
    text-transform: capitalize;
    padding: 6px 20px;
    /* width: 200px; */
    border-radius: 52px;
}

._p-add-cart .btn {
    margin: 0px 8px;
}

/*=========Recent-post==========*/
.title_bx h3.title {
    font-size: 22px;
    text-transform: capitalize;
    position: relative;
    color: #fd7f34;
    font-weight: 700;
    line-height: 1.2em;
}

.title_bx h3.title:before {
    content: "";
    height: 2px;
    width: 20%;
    position: absolute;
    left: 0px;
    z-index: 1;
    top: 40px;
    background-color: #fd7f34;
}

.title_bx h3.title:after {
    content: "";
    height: 2px;
    width: 100%;
    position: absolute;
    left: 0px;
    top: 40px;
    background-color: #ffc107;
}

.common_wd .owl-nav .owl-prev,
.common_wd .owl-nav .owl-next {
    background-color: #fd7f34 !important;
    display: block;
    height: 30px;
    width: 30px;
    text-align: center;
    border-radius: 0px !important;
}

.owl-nav .owl-next {
    right: -10px;
}

.owl-nav .owl-prev,
.owl-nav .owl-next {
    top: 50%;
    position: absolute;
}

.common_wd .owl-nav .owl-prev i,
.common_wd .owl-nav .owl-next i {
    color: #fff;
    font-size: 14px !important;
    position: relative;
    top: -1px;
}

.common_wd .owl-nav {
    position: absolute;
    top: -21%;
    right: 4px;
    width: 65px;
}

.owl-nav .owl-prev i,
.owl-nav .owl-next i {
    left: 0px;
}

._p-qty .decrease_ {
    position: relative;
    right: -5px;
    top: 3px;
}

._p-qty .increase_ {
    position: relative;
    top: 3px;
    left: -5px;
}

/*========box========*/
.sq_box {
    padding-bottom: 5px;
    border-bottom: solid 2px #fd7f34;
    background-color: #fff;
    text-align: center;
    padding: 15px 10px;
    margin-bottom: 20px;
    border-radius: 4px;
}

.item .sq_box span.wishlist {
    right: 5px !important;
}

.sq_box span.wishlist {
    position: absolute;
    top: 10px;
    right: 20px;
}

.sq_box span {
    font-size: 14px;
    font-weight: 600;
    margin: 0px 10px;
}

.sq_box span.wishlist i {
    color: #adb5bd;
    font-size: 20px;
}

.sq_box h4 {
    font-size: 18px;
    text-align: center;
    font-weight: 500;
    color: #343a40;
    margin-top: 10px;
    margin-bottom: 10px !important;
}

.sq_box .price-box {
    margin-bottom: 15px !important;
}

.sq_box .btn {
    border-radius: 50px;
    padding: 5px 13px;
    font-size: 15px;
    color: #fff;
    background-color: #fd7f34;
    font-weight: 600;
}

.sq_box .price-box span.price {
    text-decoration: line-through;
    color: #6c757d;
}

.sq_box span {
    font-size: 14px;
    font-weight: 600;
    margin: 0px 10px;
}

.sq_box .price-box span.offer-price {
    color: #28a745;
}

.sq_box img {
    object-fit: cover;
    height: 150px !important;
    margin-top: 20px;
}

.sq_box span.wishlist i:hover {
    color: #fd7f34;
}</style>
