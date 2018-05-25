<template>
  <div>
    <div class="row">
      <div class="col-4" style="margin: auto">
        <ul class="list-group">
          <li v-for="user in listedUsers" :key="user.id" class="list-group-item">
            <div class="row">
              <div class="col-10">
                {{ user.first_name | limit(15) }} {{ user.last_name | limit(15) }}
                <br>
                {{ user.created_at | date }}
                <br>
                <div class="form-check">
                  <input class="form-check-input" 
                    type="checkbox"
                    id="'statusCheck' + n"
                    :checked="user.status === 'locked'"
                    @change="changeStatus(user.id, $event.target.checked)">
                  <label class="form-check-label" for="'statusCheck' + n">
                    Lock <span v-show="user.status === 'locked'">ON</span><span v-show="user.status !== 'locked'">OFF</span>
                  </label>
                </div>
              </div>
              <div class="col-2">
                <button type="button" class="btn btn-light mr-2" @click="editUser(user.id)">Edit</button>
              </div>
            </div>
          </li>
        </ul>        
      </div>
    </div>
    <div class="row">
      <div style="margin: auto">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li v-for="n in steps" :key="n" class="page-item"><a class="page-link" style="cursor: pointer" @click="changePage(n-1)">{{ n }}</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

const STEP_BY = 10;

export default {
  name: 'userlist',
  data() {
    return {
      step: 0
    };
  },
  props: ['users'],
  computed: {
    listedUsers() {
      const startFrom = this.step * STEP_BY;
      const upTo = startFrom + STEP_BY;
      console.log('UserList', 'listedUsers', startFrom, upTo);
      return this.users.slice(startFrom, upTo);
    },
    steps() {
      return Math.floor(this.users.length / STEP_BY);
    }
  },
  methods: {
    changePage(nr) {
      console.log('UserList', 'changePage', nr);
      if (nr !== this.step && nr >= 0 && nr < this.steps) {
        this.step = nr;
      }
    },
    changeStatus(id, value) {
      this.$store.dispatch('updateLockedStatus', { id, value });
    },
    editUser(id) {
      console.log('UserList', 'editUser', id);
      this.$router.push(`/edit/${id}`);
    }
  }
};
</script>
