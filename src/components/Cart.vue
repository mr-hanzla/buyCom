<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const productStore = useStore('productStore');

function removeFromCart(id) {
    console.log('removeFromCart is Called')
    productStore.dispatch('removeFromCart', id);
}
</script>

<template>
    <div v-if="!productStore.state.cart.length">
        <h1>Empty Cart ...</h1>
        <button @click="router.push({ name: 'Home' })">Home</button>
    </div>
    <div class="cart-items" v-else>
        <div class="class-item" v-for="item in productStore.state.cart" :key="item.id">
            <div class="item-details">
                <img :src="item.thumbnail">
                <span>Brand: {{ item.brand }}</span>
                <span>Category: {{ item.category }}</span>
                <span>Price: ${{ item.price }}</span>
                <button @click="removeFromCart(item.id)">Remove</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.item-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    box-shadow: 0 0 17px 6px #a7e7e7;
    border-radius: 8px;
    padding: 16x;
}

.item-details img {
    width: 20%;
}
</style>
