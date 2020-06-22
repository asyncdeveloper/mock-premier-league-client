import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from "../views/Register";
import Login from "../views/Login";
import Team from "../views/team/Team";
import Fixture from "../views/fixture/Fixture";
import TeamCreate from "../views/team/TeamCreate"
import FixtureCreate from "../views/fixture/FixtureCreate";
import TeamShow from "../views/team/TeamShow";
import FixtureShow from "../views/fixture/FixtureShow";
import TeamEdit from "../views/team/TeamEdit";
import FixtureEdit from "../views/fixture/FixtureEdit";

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
    component: Team
  },
  {
    path: '/teams/create',
    name: 'TeamCreate',
    component: TeamCreate
  },
  {
    path: '/teams/:id',
    name: 'TeamShow',
    component: TeamShow
  },
  {
    path: '/teams/edit/:id',
    name: 'TeamEdit',
    component: TeamEdit
  },
  {
    path: '/fixtures',
    name: 'Fixtures',
    component: Fixture
  },
  {
    path: '/fixtures/create',
    name: 'FixtureCreate',
    component: FixtureCreate
  },
  {
    path: '/fixtures/:id',
    name: 'FixtureShow',
    component: FixtureShow
  },
  {
    path: '/fixtures/edit/:id',
    name: 'FixtureEdit',
    component: FixtureEdit
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
