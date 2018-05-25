<template>
  <div class="new">
    <EditUser :edit="true" :user="user" v-if="user"></EditUser>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import EditUser from '@/components/UserEdit.vue';

export default {
  name: 'userlist',
  components: {
    EditUser,
  },
  computed: {
    ...mapGetters(['users']),
    user() {
        const id = +this.$route.params['id'];
        if (!id) {
            console.error('Edit', 'computed', 'user', 'No id in props');
            return {};
        }
        if (this.users.length > 0) {
            const u = this.users.find((user) => user.id === id);
            if (!u) {
                console.error('Edit', 'computed', 'user', `User was not found with this id #${id}`);
                return {};
            }
            return u;
        } else {
            console.log('Edit', 'computed', 'user', 'Loading users...');
            return false;
        }
    }
  }
};
</script>
