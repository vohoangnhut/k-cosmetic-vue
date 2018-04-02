// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'element-ui/lib/theme-chalk/index.css';

import locale from 'element-ui/lib/locale/lang/en';
import BootstrapVue from 'bootstrap-vue';
import ElementUI from 'element-ui';
import firebase from 'firebase';
import VueFire from 'vuefire';
import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
import * as VueGM from 'vue2-google-maps';

import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import AuthApp from './AuthApp';
import router from './router';
import store from './store';
import { FIREBASE_CONFIG } from './config';

Vue.config.productionTip = false;

Vue.use(ElementUI, { locale });
Vue.use(BootstrapVue);
Vue.use(Vuex);
Vue.use(VueFire);
Vue.use(VueGM, {
  load: {
    key: 'AIzaSyD_Vsr3XlbyfLd_4rVp_L-6l3iJnJrI_I0',//'AIzaSyBhiu5mQa7nDe-Mzc-6YaLn7IRJdDfWVSk',
    libraries: 'places'
  }
});

const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
const db = firebaseApp.database();
const storage = firebaseApp.storage();
Vue.prototype.$db = db;
Vue.prototype.$storage = storage;

let app;

const createApp = user => new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App: user ? AuthApp : App 
  }
});

firebase.auth().onAuthStateChanged((user) => {
  if (user && !app) {
    app = createApp(user);
  } else if (!app) {
    app = createApp(false);
  }
});
