
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
} from './authentication.types';

console.log('>>>> client > authentication.reducer.js <<<< loaded');

export default function (state = {}, action) {

  console.log('>>>> client > authentication.reducer.js <<<< action.type', action.type);

  switch (action.type) {

    case AUTH_USER:


      return { ...state, error: '', authenticated: true };

    case UNAUTH_USER:


      return { ...state, authenticated: false };

    case AUTH_ERROR:


      return { ...state, error: action.payload };

    case FETCH_MESSAGE:


      return { ...state, message: action.payload };

    default:


      return state;

  }

}
