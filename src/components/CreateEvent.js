import React, {useState} from 'react';
import '../index.css';
import '../App.css';
import Select from 'react-select'
import TimePicker from 'react-time-picker';
import {useStore} from '../store.js';
import { DatePicker } from 'react-rainbow-components';
import postRequest from '../functions/postRequest';

const CreateEvent = () => {
  // App state variables
  const bands = useStore(state => state.bands);
  const bandsFetched = useStore(state => state.bandsFetched);
  const user = useStore(state => state.user);
  const [bandSelected, selectBand] = useState(-1);
  // Options for all the selectors
  const options = [
    {value:'event', label:'Event'},
    {value:'allAccess', label:'All Access Event'}
  ];
  const options2 = [
    {value:'band', label:'Band'},
    {value:'mkr', label:'MKR'}
  ]
  const options3 = [
    {value:'5', label:'5 minutes'},
    {value:'10', label:'10 minutes'},
    {value:'20', label:'20 minutes'}
  ]
  const options4 = [
    {value:'5', label:'5 dollars'},
    {value:'10', label:'10 dollars'},
    {value:'15', label:'15 dollars'},
    {value:'20', label:'20 dollars'},
    {value:'25', label:'25 dollars'},
    {value:'35', label:'35 dollars'},
    {value:'50', label:'50 dollars'}
  ]
  // Input variables
  const [time, setTime] = useState('18:00');
  const [time2, setTime2] = useState('19:00');
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [message, setMessage] = useState('');
  const [streamType, setStream] = useState('');
  const [eventType, setEvent] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');

  const bandList = bands[0].map((band, i)=> {return {value: i, label: band.name}});
  // Function to remove error message after 5 seconds.
  const messageTimer = message => {
    setTimeout(() => {
      setMessage('');
    }, 5000);
    setMessage(message);
  }
  // Checks if all inputs have values.
  // Checks type of event then sends post request accordingly.
  const handleSubmit = async () => {
    if (eventType === '') {
      messageTimer("Please set the Event Type, thanks!!");
      return;
    }
    if (bandSelected < 0) {
      messageTimer('Please select the band featured in the event.');
      return;
    }
    if (name.length < 5 || desc.length < 10) {
      messageTimer('Event name must be at least 5 character and/or description must be at least 10.')
      return;
    }
    const startDate = new Date(date.toDateString() + ' ' + time);
    const endDate = new Date(date.toDateString() + ' ' + time2);
    if (endDate <= startDate) {
      messageTimer("The start time must be before the end time.");
      return;
    }
    // Check if event is Event or All Access Event
    if (eventType === 'event') {
      if (streamType === '') {
        messageTimer('Please set stream type');
        return;
      }
      await postRequest('events/', {
        link:"manickatrecords.com",
        band:bands[0][bandSelected].id,
        photo:bands[0][bandSelected].groupPhoto,
        startTime:startDate,
        endTime:endDate,
        date:date,
        name:name,
        description:desc,
        streamType:streamType,
        location:'online',
        type:'twitch',
        venue:'PunkHubLive'
      }, {Authorization: `Bearer ${user.token}`})
        .then(res => {
          setMessage('Event Created!!!');
        })
        .catch(err => {
          console.log(err)
          messageTimer('Event not created, Reason: ' + err.message);
        })
    } else {
      if (duration === '' || price === '') {
        messageTimer('Please set the meeting duration and price per session.');
        return;
      }
      await postRequest('allaccess', {
        band:bands[0][bandSelected].id,
        photo:bands[0][bandSelected].groupPhoto,
        startTime:startDate,
        endTime:endDate,
        date:date,
        title:name,
        description:desc,
        meetingDuration:duration,
        price: price,
        location:'online',
        type:'allAccess',
        venue:'PunkHubLive'
      }, {Authorization: `Bearer ${user.token}`})
        .then(res => {
          setMessage('Event Created!!!');
        })
        .catch(err => {
          messageTimer('Event not created, Reason: ' + err.message);
        })
    }
  }
  return (
    <div>
      <h2>Create Event</h2>
      <div className='eventForm'>
        {message.length > 0 ? <div className='messageDiv'><p className='message'>{message}</p></div>
        : null}
        <Select className='select' options={options} placeholder='Event Type' onChange={selection => setEvent(selection.value)} />
        <input className='eventInput' placeholder='Event Name' value={name} onChange={e => setName(e.target.value)}/>
        {bandsFetched ?
        <Select className='select' options={bandList} placeholder='Select The Band' onChange={selection => selectBand(selection.value)} />
        : null}<br />
        {eventType === 'allAccess' ?
          <div className='allAccessDiv'>
            <Select className='select' options={options4} placeholder='Price per Session' onChange={selection => setPrice(selection.value)} />
            <Select className='select' options={options3} placeholder='Meeting Duration' onChange={selection => setDuration(selection.value)} />
          </div>:
          <Select className='select' options={options2} placeholder='Stream Type' onChange={selection => setStream(selection.value)} />}
        <br />
        <textarea className='eventInput eventDesc' placeholder='Event Description' value={desc} onChange={e => setDesc(e.target.value)} />
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
        {message.length > 0 ? <div className='messageDiv'><p className='message'>{message}</p></div>
        : null}
        <button className='submitButton' onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default CreateEvent;
