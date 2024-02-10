<script setup>
import axios from 'axios';
import { ref, onMounted, onBeforeMount } from 'vue';
import { useStore } from 'vuex';

import { useRouter } from 'vue-router';

// const store = inject('store');
const store = useStore();

const router = useRouter();

const username = ref('');
const password = ref('');
const errorMessage = ref('');

async function submitForm() {
    try {
        const credentials = {
            username: username.value,
            password: password.value
        }
        const response = await axios.post('https://dummyjson.com/auth/login', credentials)
        store.dispatch('updateUser', response.data);
        router.push('/');
    } catch (error) {
        clearCredentials();
        errorMessage.value = 'Invalid Username or Password!';
        console.log(error);
    }
}

function clearCredentials() {
    username.value = '';
    password.value = '';
}

onBeforeMount(async () => {
    const currentUser = localStorage.getItem('current-user');
    if (currentUser !== null) {
        router.push('/');
    }
});
</script>

<template>
    <h1>Login View</h1>

    <div style="width: 100%; border: 3px solid red;">
    </div>

    <div>
        <form @submit.prevent="submitForm">
            <div class="container">
                <label for="uname"><b>Username</b></label>
                <input type="text" v-model="username" placeholder="Enter Username" name="uname" required>

                <label for="psw"><b>Password</b></label>
                <input type="password" v-model="password" placeholder="Enter Password" name="psw" required>

                <button type="submit">Login</button>
                <label>
                    <input type="checkbox" checked="checked" name="remember"> Remember me
                </label>
            </div>

            <div class="container" style="background-color:#f1f1f1">
                <button type="button" class="cancelbtn">Cancel</button>
                <span class="psw">Forgot <a href="#">password?</a></span>
            </div>
        </form>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
</template>

<style>
.error-message {
    align-content: center;
    border: 3px solid red;
    color: red;
    margin-top: 10px;
}

form {
    border: 3px solid #f1f1f1;
}

input[type=text],
input[type=password] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

button {
    background-color: #04AA6D;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
}

button:hover {
    opacity: 0.8;
}

.cancelbtn {
    width: auto;
    padding: 10px 18px;
    background-color: #f44336;
}

.imgcontainer {
    text-align: center;
    margin: 24px 0 12px 0;
}

img.avatar {
    width: 40%;
    border-radius: 50%;
}

.container {
    padding: 16px;
}

span.psw {
    float: right;
    padding-top: 16px;
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
    span.psw {
        display: block;
        float: none;
    }

    .cancelbtn {
        width: 100%;
    }
}
</style>
