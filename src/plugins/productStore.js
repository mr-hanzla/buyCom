import axios from 'axios';
import { createStore } from 'vuex';

const productStore = createStore({
    state() {
        return {
            products: [],
            isProductsDataFetched: false,
            categories: null,
            isCategoryDataFetched: false,
            categoryProducts: null,
            cart: [],
        }
    },
    mutations: {
    },
    actions: {
        async fetchProducts({ state }) {
            try {
                if (!state.isProductsDataFetched) {
                    const response = await axios.get('https://dummyjson.com/products?limit=5000')
                    state.products = response.data.products;
                    state.isProductsDataFetched = true;
                    console.log('fetchProducts STORE is called and DONE');
                }
                console.log('fetchProducts STORE is called and but data already DONE');
            } catch (error) {
                console.log('Error Getting Products' + error);
                return error;
            }
        },
        async fetchProductsByCategory(context, category) {
            try {
                const response = await axios.get(`https://dummyjson.com/products/category/${category}`)
                this.state.products = response.data.products;
                state.isProductsDataFetched = true;
                console.log('fetchProductsByCategory STORE is called and done');
            } catch (error) {
                console.log('Error Getting Products' + error);
                return error;
            }
        },
        async fetchCategories(context) {
            try {
                if (!this.state.isCategoryDataFetched) {
                    const response = await axios.get('https://dummyjson.com/products/categories')
                    this.state.categories = response.data;
                    this.state.isCategoryDataFetched = true;
                    console.log('fetchCategory STORE is called and done!');
                }
                console.log('fetchCategory STORE is called BUT already done!');
            } catch (error) {
                console.log('Error getting categories!' + error)
                return error;
            }
        },
        async getProductById({ dispatch, state }, id) {
            try {
                if (!state.isProductsDataFetched && state.products.length === 0) {
                    await dispatch('fetchProducts');
                }
                return state.products.find(product => product.id === Number(id));
            } catch (error) {
                console.log('Error Getting Products' + error);
                return error;
            }
        },
        addToCart({state}, product) {
            state.cart.push(product);
            console.log('Added to cart, Cart: ', state.cart);
        },

        removeFromCart({state}, id) {
            state.cart = state.cart.filter(item => item.id !== id);
        }
    },
    getters: {
        getProductById: (state) => (id) => {
            return 'HelloFromGetProductByID!';
        }
    }
})

// Load state from local storage when the application starts
// productStore.dispatch('loadState');
// productStore.dispatch('fetchProducts');
// productStore.dispatch('fetchCategories');

// Save state to local storage whenever it changes
// productStore.subscribe((mutation, state) => {
//     productStore.dispatch('saveState');
// });

export default productStore;
