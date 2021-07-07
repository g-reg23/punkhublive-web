import React, {useState} from 'react';
import '../index.css';
import '../App.css';
// import {Link} from 'react-router-dom';
import Select from 'react-select'
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import {useStore} from '../store.js';
import { DatePicker } from 'react-rainbow-components';

const CreateEvent = () => {
  const bands = useStore(state => state.bands);
  const [bandSelected, selectBand] = useState(-1);
  const options = [
    {value:'event', label:'Event'},
    {value:'allAccess', label:'All Access Event'}
  ];
  const options2 = [
    {value:'band', label:'Band'},
    {value:'mkr', label:'MKR'}
  ]
  const [time, setTime] = useState('10:00');
  const [time2, setTime2] = useState('11:00');
  const [date, setDate] = useState(new Date());
  const bandList = bands[0].map((band, i)=> {return {value: i, label: band.name}});
  return (
    <div>
      <h2>Create Event</h2>
      <div className='eventForm'>
        <Select className='select' options={options} placeholder='Event Type' />
        <input className='eventInput' placeholder='Event Name' />
        {bands[0] > 0 ?
        <Select className='select' options={bandList} placeholder='Select The Band' onChange={selection => selectBand(selection.value)} />
        : null}
        {bandSelected >= 0 ?
          <p>{bands[0][bandSelected].name}</p> : <p>Please select a band above to get the band images.</p>
        }
        <input className='eventInput' placeholder='Event Link' /><br />
        <Select className='select' options={options2} placeholder='Stream Type' />
        <div className='dateDiv'>
          <span className='spanHeader'>Event Date</span>
          <DatePicker className="datepicker" value={date} onChange={date => setDate(date)} />
        </div>
        <div className='outerTimeDiv'>
          <div className='innerTimeDiv'>
            <span className='spanHeader'>Start Time</span>
            <TimePicker
            onChange={setTime}
            value={time}
            className='timePicker'
            label='Start'
            />
          </div>
          <div className='innerTimeDiv'>
            <span className='spanHeader'>End Time</span>
            <TimePicker
            onChange={setTime2}
            value={time2}
            className='timePicker'
            label='End'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateEvent;
