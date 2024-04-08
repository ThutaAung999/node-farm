/* eslint-disable */
import '@babel/polyfill';
import { login } from './login';

//const loginForm = document.querySelector('.form--login');
const loginForm = document.querySelector('.form');

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('email , password : ' ,email,password);
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
