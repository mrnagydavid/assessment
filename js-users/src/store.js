import Vue from 'vue';
import Vuex from 'vuex';
import http from 'axios';

const BACKEND_URL = 'http://js-assessment-backend.herokuapp.com/users.json';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        users: []
    },
    getters: {
        users(state) {
            console.log('store', 'getters', 'users');
            return state.users;
        }
    },
    mutations: {
        init(state, payload) {
            console.log('store', 'mutations', 'init', payload.length);
            state.users = payload;
        }
    },
    actions: {
        init(state) {
            console.log('store', 'actions', 'init');
            http.get(BACKEND_URL)
            .then((response) => {
                const json = response.data;
                if (!json) {
                    console.error('store', 'action', 'init', 'No data received', response);
                    json = [];
                }
                state.commit('init', json);
            })
            .catch((err) => console.error('store', 'actions', 'init', err));
        }
    }
});
