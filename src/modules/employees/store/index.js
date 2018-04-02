import { DIALOG_FLG} from './types';
import { each, find, assign, remove, isArray } from 'lodash';

const state = {
  showDialogFlg: false,
};

const mutations = {
  [DIALOG_FLG](state, data){
    state.showDialogFlg = data;
  },
};

import * as getters from './getters';
import * as actions from './actions';

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
