import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

import Dashboard from '@/modules/dashboard';
import Employees from '@/modules/employees';
import Questions from '@/modules/questions';
import Upload from '@/modules/upload';
import Login from '@/modules/session/login';
import Maps from '@/modules/maps';
import Surveys from '@/modules/surveys';
import Steps from '@/modules/steps';
//import Login from '@/modules/account/login';
import Product from '@/modules/product';
import About from '@/modules/about';
import Item from '@/modules/item';

Vue.use(Router);
const router = new Router({
  mode: 'history',
  routes: [{
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'About',
      component: About,
      meta: { requiresAuth: false, title: 'About' }
    },

    {
      path: '/product',
      name: 'Product',
      component: Product,
      meta: { requiresAuth: false, title: 'Product' }
    },
    { path: '/item/:id', name: 'Item', component: Item, meta: { requiresAuth: false, title: 'Product' } },


    
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false, title: 'Login' }
    },
    {
      path: '/admin/emp',
      name: 'Employees',
      component: Employees,
      meta: {
        requiresAuth: true,
        title: 'Employees'
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  console.log('requiresAuth', requiresAuth)
  console.log('currentUser', currentUser)
  console.log('to', to)
  console.log('from', from)
  if (to.path != '/login') next();
  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('/admin/emp');
  else next();
});


export default router;
