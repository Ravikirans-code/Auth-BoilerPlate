import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './type';

export const signup = (formProps, callback) => async dispatch => {
    try {
        console.log('signup');
        const response = await axios.post('http://localhost:3090/signup', formProps);
        dispatch({ type: AUTH_USER, payload: response.data.token });
        localStorage.setItem('token', response.data.token);
        callback();
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Email in Use' })
    }
};

export const signout = () => {
    localStorage.removeItem('token');
    
    return{
        type: AUTH_USER,
        paylpoad: ''
    }
}

export const signin = (formProps, callback) => async dispatch => {
    try {
        console.log('signin');
        const response = await axios.post('http://localhost:3090/signin', formProps);
        dispatch({ type: AUTH_USER, payload: response.data.token });
        localStorage.setItem('token', response.data.token);
        callback();
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invlid Email and Passowrd' })
    }
};