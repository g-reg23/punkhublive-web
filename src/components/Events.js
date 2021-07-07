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
  const setBands = useStore(state => state.setBands);
  useEffect(() => {
    if (!bandsFetched) {
      const getBands = async () => {
        axios.get("https://punkhublive.herokuapp.com/api/v1/bands/")
          .then(res => {
            let newArr = res.data.data;
            setBandsFetched(true);
            setBands(newArr);
          })
          .catch(err => {
            console.log(err.message);
          })
      }
      getBands();
    }
  },[bandsFetched, setBands, setBandsFetched]);
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
