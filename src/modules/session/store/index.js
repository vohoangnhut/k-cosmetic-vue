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
          
          if('admin@ltv.vn' === username)
            state.user.role = 'admin';

          //let userId = user.uid;
          // return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
          //   //console.log(snapshot.val().username);
          //   //let username = (snapshot.val() && snapshot.val().username) || 'Anonymous';

          //   if(snapshot.val()){

          //   }
          // });
          
          window.location.href = '/';
        },
        (err) => {
          // eslint-disable-next-line
          alert(`Oops!!, ${err.message}`);
        }
      );
  },

  [LOGOUT]() {
    firebase.auth().signOut().then(() => {
      window.location.href = '/login';
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
