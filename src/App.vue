<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Mock EPL</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <div v-if="!currentUser" class="navbar-nav ml-auto">
            <router-link to="/" class="nav-link">Home</router-link>
            <router-link to="/login" class="nav-link">Login</router-link>
            <router-link to="/register" class="nav-link">Register</router-link>
          </div>
          <div v-if="currentUser" class="navbar-nav ml-auto">
            <router-link to="/teams" class="nav-link">Teams</router-link>
            <router-link to="/fixtures" class="nav-link">Fixtures</router-link>
            <a class="nav-link" href @click.prevent="logOut">
              LogOut
            </a>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      },
    },
    methods: {
      logOut() {
        this.$store.dispatch('auth/logout');
        this.$router.push('/login');
      }
    }
  };
</script>