import Vue from 'vue';
import Vuex from 'vuex';

import dashboard from '../modules/dashboard/store';
import session from '../modules/session/store';
import employees from '../modules/employees/store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    session,
    dashboard,
    employees
  }
});
