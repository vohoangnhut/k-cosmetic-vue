import firebase from 'firebase';

import { UPDATE_PASS } from './types';
import * as getters from './getters';
import * as actions from './actions';

const sState = {
  user: null,
  messages: [],
  searchText: '',
  screens: []
};

const mutations = {
  [UPDATE_PASS](state, password) {
    let currentUser = firebase.auth().currentUser;

    currentUser.updatePassword(password)
      .then(
        () => {
          alert('Cập nhật thành công \n Vui lòng login lại');
          firebase.auth().signOut().then(() => {
            window.location.href = '/';
          });
          //state.user = user;
          //window.location.href = '/admin/products';
        },
        (err) => {
          // eslint-disable-next-line
          alert(`Oops!!, ${err.message}`);
        }
      );
  },

  // [LOGOUT]() {
  //   firebase.auth().signOut().then(() => {
  //     window.location.href = '/';
  //   });
  // }
};

export default {
  namespaced: true,
  sState,
  getters,
  actions,
  mutations
};
