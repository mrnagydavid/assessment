<template>
  <div class="home">
    <img src="../assets/logo.png">
    <UserList :users="users"></UserList>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import UserList from '@/components/UserList.vue';

export default {
  name: 'userlist',
  components: {
    UserList,
  },
  computed: {
      ...mapGetters(['users'])
  }
};
</script>
