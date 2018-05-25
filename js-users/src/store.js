import Vue from 'vue';
import Vuex from 'vuex';
import http from 'axios';

const BACKEND_BASE_URL = 'http://js-assessment-backend.herokuapp.com';
const BACKEND_USERS_URL = `${BACKEND_BASE_URL}/users.json`;
const BACKEND_USER_URL = (id) => `${BACKEND_BASE_URL}/users/${id}.json`;

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
        },
        appendUser(state, payload) {
            console.log('store', 'mutations', 'appendUser', payload);
            const oldLen = state.users.length;
            if (!payload) {
                console.error('store', 'mutations', 'appendUser', 'No payload!');
                return;
            }
            state.users.push(payload);
            console.log('store', 'mutations', 'appendUser', oldLen, '->', state.users.length)
        },
        updateUser(state, payload) {
            console.log('store', 'mutations', 'updateUser', payload);
            if (!payload || !payload.id) {
                console.error('store', 'mutations', 'updateUser', 'No payload!');
                return;
            }
            const user = state.users.find((user) => user.id === payload.id);
            if (!user) {
                console.error('store', 'mutations', 'updateUser', 'Didn`t find a matching user!');
                return;
            }
            Object.assign(user, payload);
        }
    },
    actions: {
        init(context) {
            console.log('store', 'actions', 'init');
            http.get(BACKEND_USERS_URL)
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
        },
        addNewUser(context, payload) {
            console.log('store', 'actions', 'addNewUser', payload);
            if (!payload || !payload.first_name || !payload.last_name) {
                console.log('store', 'actions', 'addNewUser', 'Missing fields in payload');
                return;
            }
            const newUser = { ...payload };
            newUser.status = 'active';

            return http.post(BACKEND_USERS_URL, newUser)
            .then((response) => {
                const addedUser = response.data;
                addedUser.url = BACKEND_USER_URL(addedUser.id);
                context.commit('appendUser', addedUser);
            })
            .catch((err) => console.error('store', 'actions', 'addNewUser', 'catch', err));
        },
        updateUser(context, payload) {
            console.log('store', 'actions', 'updateUser', payload);
            if (!payload || !payload.first_name || !payload.last_name) {
                console.log('store', 'actions', 'updateUser', 'Missing fields in payload');
                return;
            }
            const newUser = {
                first_name: payload.first_name,
                last_name: payload.last_name
            };
            return http.put(payload.url, newUser)
            .then((response) => {
                context.commit('updateUser', payload);
            })
            .catch((err) => console.error('store', 'actions', 'updateUser', 'catch', err));
        }
    }
});
