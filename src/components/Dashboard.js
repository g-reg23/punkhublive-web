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
      <div className="dashLinkDiv">
        <Link to='/Users' className='siteLink'>Users</Link>
        <Link to='/bands' className='siteLink'>Bands</Link>
        <Link to='/events' className='siteLink'>Events</Link>
        <Link to='/video' className='siteLink'>Video</Link>
      </div>
    </div>
  )
}
export default Dashboard;
