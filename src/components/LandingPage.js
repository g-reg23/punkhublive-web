import React, {useState} from 'react';
import '../index.css';
import '../App.css';
import Dashboard from './Dashboard';
import Login from './Login';
import {useStore} from '../store.js';
import getRequest from '../functions/getRequest';
import postRequest from '../functions/postRequest';

const LandingPage = () => {
  const user = useStore(state => state.user);
  const setUser = useStore(state => state.setUser);
  const [message, setMessage] = useState('');
  const messageTimer = message => {
    setTimeout(() => {
      setMessage('');
    }, 5000);
    setMessage(message);
  }
  const logIn = async (email, pass) => {
    let token;
    postRequest('auth/login', {email: email, password:pass}, {"content-type": "application/json"})
      .then(async res => {
        token = res.data.token;
        return getRequest('auth/me',{},
        {Authorization: `Bearer ${res.data.token}`})
      })
      .then(res => {
        if (res.data.data.role !== 'admin') {
          setMessage("Sorry you can't access this site. Thanks for using the app tho!!");
          return;
        }
        const userInfo = {
          name:res.data.data.name,
          email:res.data.data.email,
          authed:true,
          role:res.data.data.role,
          token:token,
        }
        setUser(userInfo);
        messageTimer("Successfully logged in!")
      })
      .catch(err => {
        console.log(err.message);
        messageTimer("Invalid login");
      })
  }
  return(
    <div>
      {user.authed ?
        <Dashboard /> : <Login logIn={logIn} />
      }
      {message.length > 0 ? <div className='messageDiv'><p className='message'>{message}</p></div>
      : null}
    </div>
  )
}
export default LandingPage;
