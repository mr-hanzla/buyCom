<script setup>
import axios from 'axios';
import { defineComponent, onBeforeMount, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const product = ref('');

const route = useRoute();

function calPercentageValue(number, percentage) {
    return number * (percentage / 100);
}

function getDiscountedPrice(price, discountPercentage) {
    return (price - calPercentageValue(price, discountPercentage)).toFixed(2);
}

async function getProductsById(id) {
    console.log('trying to get product: ' + id);
    try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`)
        product.value = response.data;
        console.log(product.value);
    } catch (error) {
        console.log(error);
        return error;
    }
}

onBeforeMount(async () => {
    console.log(route.query);
    await getProductsById(route.query.id);
})

</script>

<template>
    <h1>Product Details</h1>

    <section id="services" class="services section-bg">
        <div class="container-fluid">
            <div class="row row-sm">
                <div class="col-md-6 _boxzoom">
                    <div class="zoom-thumb">
                        <ul class="piclist">
                            <li v-for="image in product.images"><img :src="image" alt="hello"></li>
                        </ul>
                    </div>
                    <div class="_product-images">
                        <div class="picZoomer">
                            <img class="my_img" :src="product.images[0]" alt="">
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="_product-detail-content">
                        <p class="_p-name"> {{ product.title}} </p>
                        <div class="_p-price-box">
                            <div v-if="product.discountPercentage" class="p-list">
                                <span> Price : <i class="fa fa-inr"></i> <del>${{ product.price }} </del> </span>
                                <span class="price"> ${{ getDiscountedPrice(product.price, product.discountPercentage) }} </span>
                            </div>
                            <div v-else class="p-list">
                                <span class="price"> ${{ product.discountPercentage }}</span>
                            </div>
                            <div class="_p-add-cart">
                                <div class="_p-qty">
                                    <span>Add Quantity</span>
                                    <div class="value-button decrease_" id="" value="Decrease Value">-</div>
                                    <input type="number" name="qty" id="number" value="1" />
                                    <div class="value-button increase_" id="" value="Increase Value">+</div>
                                </div>
                            </div>
                            <div class="_p-add-cart">
                                <div class="_p-qty">
                                    <span>Stock: </span>
                                    <span name="qty">{{ product.stock }}</span>
                                </div>
                            </div>
                            <div class="_p-features">
                                <span> Description About this product:- </span>
                                {{ product.description }}
                            </div>
                            <form action="" method="post" accept-charset="utf-8">
                                <ul class="spe_ul"></ul>
                                <div class="_p-qty-and-cart">
                                    <div class="_p-add-cart">
                                        <button class="btn-theme btn buy-btn" tabindex="0">
                                            <i class="fa fa-shopping-cart"></i> Buy Now
                                        </button>
                                        <button class="btn-theme btn btn-success" tabindex="0">
                                            <i class="fa fa-shopping-cart"></i> Add to Cart
                                        </button>
                                        <input type="hidden" name="pid" value="18" />
                                        <input type="hidden" name="price" value="850" />
                                        <input type="hidden" name="url" value="" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style></style>
