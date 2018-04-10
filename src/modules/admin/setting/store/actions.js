import { UPDATE_PASS } from './types';

export const updatePass = ({ commit }, newPas) => {
  console.log('action > newPas', newPas)
  commit(UPDATE_PASS, newPas);
};
