import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from "../views/Register";
import Login from "../views/Login";
import Teams from "../views/Teams";
import Fixtures from "../views/Fixtures";

Vue.use(VueRouter);

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/teams',
    name: 'Teams',
    component: Teams
  },
  {
    path: '/fixtures',
    name: 'Fixtures',
    component: Fixtures
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
