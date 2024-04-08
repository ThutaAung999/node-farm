/* eslint-disable */
import '@babel/polyfill';
import { login ,logout} from './login';

//const loginForm = document.querySelector('.form--login');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');


if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('email , password : ' ,email,password);
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });


  if (logOutBtn) logOutBtn.addEventListener('click', logout);
