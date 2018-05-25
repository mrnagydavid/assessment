<template>
  <div>
    <div class="row">
      <div class="col-4" style="margin: auto">
        <ul class="list-group">
            <li v-for="user in listedUsers" :key="user.id" class="list-group-item">
                {{ user.id }} {{ user.first_name | limit(10) }} {{ user.last_name | limit(10) }} {{ user.created_at | date }}
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

import { mapGetters } from 'vuex';

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
      return this.users.slice(startFrom, startFrom + STEP_BY);
    },
    steps() {
      return Math.floor(this.users.length / STEP_BY);
    }
  },
  methods: {
    changePage(nr) {
      if (nr !== this.step && nr > 0 && nr < this.steps) {
        this.step = nr;
      }
    }
  }
};
</script>
