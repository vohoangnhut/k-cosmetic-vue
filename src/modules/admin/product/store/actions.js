import Vue from 'vue';
import { DIALOG_FLG} from './types';
import { MessageBox } from 'element-ui';

export const changeDialogFlg = ({ commit, state }, data) => {
  commit(DIALOG_FLG, data);
};
