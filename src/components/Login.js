import React, {useState} from 'react';
import '../index.css';
import '../App.css';
import {Link} from 'react-router-dom';


const Login = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass]  = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = () => {
    let re = /\S+@\S+\.\S+/;
    if(!re.test(email)) {
      setMessage("Email must be in email format.");
      return;
    }
    if (pass.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }
    setMessage('');
    props.logIn(email, pass);
  }
  return (
    <div className='loginDiv'>
      <input className='input' placeholder='Email' type='email' onChange={e => setEmail(e.target.value)} value={email}/>
      <input className='input' placeholder='Password' type='password' onChange={e => setPass(e.target.value)} value={pass}/>
      <button onClick={handleSubmit} className='submitButton'>Submit</button>
      {message.length > 0 ? <div className='messageDiv'><p className='message'>{message}</p></div>
      : null}
    </div>
  )
}
export default Login;
