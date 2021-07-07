import React from 'react';
import '../index.css';
import '../App.css';
import {Link} from 'react-router-dom';
import {useStore} from '../store.js';

const Dashboard = () => {
  const user = useStore(state => state.user)
  return (
    <div className='dashDiv'>
      <h1>{user.role.toUpperCase()} Dashboard</h1>
      <h2>Hi, {user.name}</h2>
      <Link to='/events' className='siteLink'>Events</Link>
      <Link to='/video' className='siteLink'>Video</Link>
    </div>
  )
}
export default Dashboard;
