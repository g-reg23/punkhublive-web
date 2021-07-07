import React, {useState} from 'react';
import '../index.css';
import '../App.css';
import Dashboard from './Dashboard';
import Login from './Login';
import {useStore} from '../store.js';
import axios from 'axios'

const LandingPage = () => {
  const user = useStore(state => state.user);
  const setUser = useStore(state => state.setUser);
  const [message, setMessage] = useState('');
  // const [user, setUser] = useState({});
  const logIn = async (email, pass) => {
    // setLogIn(true);
    await axios.post('http://localhost:5000/api/v1/auth/login',
    {email: email, password:pass},
    {"content-type": "application/json"},)
      .then(async res => {
        return await axios.get('http://localhost:5000/api/v1/auth/me',{
        headers: {Authorization: `Bearer ${res.data.token}`}})
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
          token:res.data.data.id
        }
        setUser(userInfo);
        setMessage("Successfully logged in!")
      })
      .catch(err => {
        console.log(err.message);
        console.log('caught');
        setMessage("Invalid login");
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
