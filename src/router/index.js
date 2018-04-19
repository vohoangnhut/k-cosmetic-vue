import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

import Employees from '@/modules/employees';
import Login from '@/modules/session/login';
//import Login from '@/modules/account/login';
import Product from '@/modules/product';
import About from '@/modules/about';
import Item from '@/modules/item';
import Upload from '@/modules/upload';
import Products from '@/modules/admin/products';
import AdminProduct from '@/modules/admin/product';
import Setting from '@/modules/admin/setting';


Vue.use(Router);
const router = new Router({
  mode: 'history',
  routes: [{
      path: '*',
      redirect: '/product'
    },
    {
      path: '/',
      name: 'Product',
      component: Product,
      meta: { requiresAuth: false, title: 'Product' }
    },

    {
      path: '/daily',
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
    { path: '/item/:prodId', name: 'Item', component: Item, meta: { requiresAuth: false, title: 'Product' } },



    {
      path: '/admin',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false, title: 'Login' }
    },
    {
      path: '/admin/products',
      name: 'Sản Phẩm',
      component: Products,
      meta: {
        requiresAuth: true,
        title: 'Sản Phẩm'
      }
    },{
      //:branchId
      path: '/admin/setting',
      name: 'Setting',
      component: Setting,
      meta: {
        requiresAuth: true,
        title: 'Setting'
      }
    },
    {
      //:branchId
      path: '/admin/product',
      name: 'Product New',
      component: AdminProduct,
      meta: {
        requiresAuth: true,
        title: 'Product'
      }
    },
    {
      //:branchId
      path: '/admin/product/:prodId',
      name: 'Product Edit',
      component: AdminProduct,
      meta: {
        requiresAuth: true,
        title: 'Product'
      }
    }
    // ,{
    //   path: '/admin/upload',
    //   name: 'Upload',
    //   component: Upload,
    //   meta: {
    //     requiresAuth: true,
    //     title: 'Upload'
    //   }
    // }

  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  // console.log('requiresAuth', requiresAuth)
  // console.log('currentUser', currentUser)
  // console.log('to', to)
  // console.log('from', from)
  if (to.path != '/admin') next();
  if (requiresAuth && !currentUser) next('admin');
  else if (!requiresAuth && currentUser) next('/admin/products');
  else next();
});


export default router;
