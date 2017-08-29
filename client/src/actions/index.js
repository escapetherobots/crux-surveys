import axios from 'axios';
import { FETCH_USER } from './types';

// with redux-thunk setup it will inspect the return value of our functions below
// if it sees a function as return value, it will automatically call the returned function
// and it will pass a dispatch function as an argument!
// export const fetchUser = () => {
  // HOW REDUX-THUNK WORKS
  // This would be the normal process
  // const request = axios.get('/api/current_user');
  // return {
  //   type: FETCH_USER,
  //   payload: request
  // }

  // but that is not asynchronous
  // THUNK WAY WITH PROMISE:::::::::::::::::::::::::::::
  // return (dispatch) => {
  //   axios
  //     .get('api/current_user')
  //     .then(res => dispatch({ type: FETCH_USER, payload: res}))
  // }
// };

// THUNK WAY WITH ASYNC:::::::::::::::::::::::::::::::
// fetchUser only returns 1 expression so no block quotes needed
// fetchUser will also be passed the dispatch method thanks to THUNK
export const fetchUser = () =>
  async (dispatch) => {
    const { data } = await axios.get('/api/current_user');
    dispatch({type: FETCH_USER, payload: data});
  };

// export const fetchUser = () => async dispatch => {
//     dispatch({type: FETCH_USER, payload: await axios.get('/api/current_user')});
//   };
//
//   let { data } = await axios.get('/api/current_user');
//   dispatch({ type: FETCH_USER, payload: data });
//

// handle the token from the stripe form
export const handleToken = (token) => async dispatch => {
   const res = await axios.post('/api/stripe', token);
   dispatch({type: FETCH_USER, payload: res.data})
};
