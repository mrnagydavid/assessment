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
        },
        updateUser(state, payload) {
            console.log('store', 'mutations', 'updateUser', payload);
            if (!payload.id) {
                console.error('store', 'mutations', 'updateUser', 'No id in user payload');
                return;
            }
            const index = state.users.findIndex((user) => user.id = payload.id);
            if (index === -1) {
                console.error('store', 'mutations', 'updateUser', `No user is found with this id #${payload.id}`);
                return;
            }
            Vue.set(state.users, index, payload);
        }
    },
    actions: {
        init(context) {
            console.log('store', 'actions', 'init');
            http.get(BACKEND_URL)
            .then((response) => {
                const json = response.data;
                if (!json) {
                    console.error('store', 'action', 'init', 'No data received', response);
                    json = [];
                }
                context.commit('init', json);
            })
            .catch((err) => console.error('store', 'actions', 'init', err));
        },
        updateLockedStatus(context, payload) {
            console.log('store', 'actions', 'updateLockedStatus', payload);
            const user = context.state.users.find((user) => user.id === payload.id);
            if (user) {
                const newUser = { ...user };
                newUser.status = (payload.value === true) ? 'locked' : 'active';
                http.put(newUser.url, newUser)
                .then((response) => {
                    if (response && response.status && response.status > 200 && response.status < 300) {
                        context.commit('updateUser', newUser);
                    } else {
                        throw new Error(response);
                    }
                })
                .catch((err) => console.error('store', 'actions', 'updateLockedStatus', 'catch', payload, err));
            } else {
                console.log('store', 'actions', 'updateLockedStatus', `Couldn't find user #${id}`);
            }
        }
    }
});
