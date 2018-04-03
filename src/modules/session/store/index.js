import firebase from 'firebase';

import { ADD_MESSAGE, SET_USER, SEARCH, LOGIN, LOGOUT } from './types';
import * as getters from './getters';
import * as actions from './actions';

const sState = {
  user: null,
  messages: [],
  searchText: '',
  screens: []
};

const mutations = {
  [ADD_MESSAGE](state, item) {
    state.messages.splice(0);
    state.messages.push(item);
  },

  [SET_USER](state, user) {
    state.user = user;
  },

  [SEARCH](state, text) {
    state.searchText = text;
  },

  [LOGIN](state, credentials) {
    let { username, password } = credentials;
    
    if (username.indexOf('@') < 0)
    {
      if(username === 'admin')
        username = username + '@ltv.vn';
      else
        username = username + '@masan.com';
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(
        (user) => {
          state.user = user;
          window.location.href = '/admin/emp';
        },
        (err) => {
          // eslint-disable-next-line
          alert(`Oops!!, ${err.message}`);
        }
      );
  },

  [LOGOUT]() {
    firebase.auth().signOut().then(() => {
      window.location.href = '/';
    });
  }
};

export default {
  namespaced: true,
  sState,
  getters,
  actions,
  mutations
};
