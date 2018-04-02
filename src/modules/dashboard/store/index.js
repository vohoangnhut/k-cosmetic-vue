import { GET_CHART_DATA, GET_STATS } from './types';
import * as getters from './getters';
import * as actions from './actions';

const state = {
  chartData: {},
  statsCount: {}
};

const mutations = {
  [GET_STATS](_, data) {
    state.statsCount = { ...data };
  },

  [GET_CHART_DATA](_, data) {
    state.chartData = { ...data };
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
