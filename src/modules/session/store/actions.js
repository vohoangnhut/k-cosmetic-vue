import { ADD_MESSAGE, SEARCH, LOGIN, LOGOUT } from './types';

export const addMessage = ({ commit }, item) => {
  commit(ADD_MESSAGE, item);
};

export const searching = ({ commit }, text) => {
  commit(SEARCH, text);
};

export const login = ({ commit }, credentials) => {
  commit(LOGIN, credentials);
};

export const logout = ({ commit }) => {
  commit(LOGOUT);
};
