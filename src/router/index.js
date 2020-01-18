import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import CreateQuiz from '../views/CreateQuiz';
import Quiz from '../views/Quiz';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/create',
    name: 'create',
    component: CreateQuiz
  },
  {
    path: '/quiz/:id',
    name: 'quiz',
    component: Quiz
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router
