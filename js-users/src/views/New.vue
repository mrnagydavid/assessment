<template>
  <div class="new">
    <NewUser :edit="false"></NewUser>
  </div>
</template>

<script>
// @ is an alias to /src
import NewUser from '@/components/UserEdit.vue';

export default {
  name: 'userlist',
  components: {
    NewUser,
  }
};
</script>
