import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

import Dashboard from '@/modules/dashboard';
import Employees from '@/modules/employees';
import Questions from '@/modules/questions';
import Upload from '@/modules/upload';
//import Login from '@/modules/session/login';
import Maps from '@/modules/maps';
import Surveys from '@/modules/surveys';
import Steps from '@/modules/steps';
import Login from '@/modules/account/login';
import Home from '@/modules/home';

Vue.use(Router);
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { title: 'Credit Score – Chấm điểm tín dụng “thần tốc” trong 60s' }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Employees',
      component: Employees,
      meta: {
        requiresAuth: true
      }
    },{
      path: '/questions',
      name: 'Questions',
      component: Questions,
      meta: {
        requiresAuth: true
      }
    },{
      path: '/upload',
      name: 'Upload',
      component: Upload,
      meta: {
        requiresAuth: true
      }
    },{
      path: '/maps',
      name: 'Maps',
      component: Maps,
      meta: {
        requiresAuth: true
      }
    },{
      path: '/surveys',
      name: 'Surveys',
      component: Surveys,
      meta: {
        requiresAuth: true
      }
    },{
      path: '/steps',
      name: 'Steps',
      component: Steps,
      meta: {
        requiresAuth: true
      }
    },
    
    
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  console.log('requiresAuth', requiresAuth)
  console.log('currentUser', currentUser)
  console.log('to', to)
  console.log('from', from)
  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('/');
  else next();
});


export default router;
