import React, {useState, useEffect} from 'react';
import '../index.css';
import '../App.css';
import {Link} from 'react-router-dom'
import CreateEvent from './CreateEvent';
import {useStore} from '../store.js';
import axios from 'axios'

const Events = () => {
  const [index, setIndex] = useState(0);
  const bandsFetched = useStore(state => state.bandsFetched);
  const setBandsFetched = useStore(state => state.setBandsFetched);
  const bands = useStore(state => state.bands);
  const setBands = useStore(state => state.setBands);
  useEffect(async () => {
    if (!bandsFetched) {
      axios.get("http://localhost:5000/api/v1/bands/")
        .then(res => {
          let newArr = res.data.data;
          setBandsFetched(true);
          setBands(newArr);
        })
        .catch(err => {
          console.log(err.message);
        })
    }
  },[bandsFetched]);
  return (
    <div className='eventsDiv'>
      <h1>Events</h1>
      <Link to='/' className='navLink'>Back to Dashboard</Link>
      <div className='flexRow'>
        <p onClick={() => setIndex(1)} className='eventTopLink'>Create Event</p>
        <p onClick={() => setIndex(2)} className='eventTopLink'>Edit Event</p>
        <p onClick={() => setIndex(3)} className='eventTopLink'>Delete Event</p>
      </div>
      {index === 0 ? <p>Click an action above to work on an event.</p> :
      index === 1 ? <CreateEvent /> : <p>This action is not yet implemented.</p>
      }
    </div>
  )
}
export default Events;
