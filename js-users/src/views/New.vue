<template>
  <div class="new">
    <NewUser :edit="false"></NewUser>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import NewUser from '@/components/UserEdit.vue';

export default {
  name: 'userlist',
  components: {
    NewUser,
  },
  computed: {
  }
};
</script>
