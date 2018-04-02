import { GET_USERS } from './types';
import * as getters from './getters';
import * as actions from './actions';

const sState = {
  user: null,
  notifications: [
    { id: 1, text: 'Something happened!', time: 1, user: null }
  ],
  messages: [],
  searchText: '',
  users: []
};

const mutations = {
  [GET_USERS](state, users) {
    state.users = users;
  }
};

export default {
  namespaced: true,
  sState,
  getters,
  actions,
  mutations
};
