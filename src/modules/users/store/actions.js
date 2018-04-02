import firebase from 'firebase';
import { GET_USERS, GET_USER } from './types';

export const getUsers = (a, users) => {
  const { commit } = a;
  const db = firebase.database();
  const b = db.ref('meals');
  // eslint-disable-next-line
  console.log('getUsers >>> ', b);
  // b.push({ id: 3, title: 'New Meal' });
  commit(GET_USERS, users);
};

export const getUser = ({ commit }, user) => {
  commit(GET_USER, user);
};
