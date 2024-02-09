import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            count: 0,
            user: null,
            isAuthenticated: false
        }
    },
    mutations: {
        increment(state) {
            state.count++
        },
        updateCount(state, payload) {
            state.count = payload
        },
        updateUser(state, payload) {
            state.user = payload;
            state.isAuthenticated = true;
            localStorage.setItem('current-user', JSON.stringify(state.user));
        },
        clearUser(state) {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('current-user');
        }
    },
    actions: {
        loadState(context) {
            const curUser = localStorage.getItem('current-user');
            if (curUser) {
                this.state.user = JSON.parse(curUser);
                this.state.isAuthenticated = true;
            }
        },
        tempFunction(context) {
            console.log('CONTEXT: ', context);
            this.state.count = 5343;
        },
        saveState(context) {
            if (this.state.user) {
                localStorage.setItem('current-user', JSON.stringify(this.state.user));
            }
        },
        updateUser({commit}, payload) {
            commit('updateUser', payload)
        },
        logout(context) {
            context.commit('clearUser');
        },
    },
    getters: {
        saveState(state) {
            if (state.user) {
                localStorage.setItem('current-user', JSON.stringify(state.user));
            }
        }
    }
})

// Load state from local storage when the application starts
store.dispatch('loadState');

// Save state to local storage whenever it changes
store.subscribe((mutation, state) => {
    store.dispatch('saveState');
});

export default store;
