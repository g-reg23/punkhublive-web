
import React, {useState, useRef} from 'react';
import '../index.css';
import '../App.css';
import MediaCapturer from 'react-multimedia-capture';
import {Link} from 'react-router-dom';


const Video = () => {
  const [granted, setGranted] = useState(false);
  const [rejectedReason, setReason] = useState('');
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [videos, setVideos] = useState([]);
  // const myRef = React.createRef();
  const myRef = useRef(null);
  const mediaRef = useRef(null);
  const handleGranted = () => {
    setGranted(true);
  }
  const handleDenied = () => {
    setGranted(false);
  }
  const onData = () => {
    console.log('data available');
  }
  const handleStart = stream => {
    setRecording(true);
    setStreamToVideo(stream);
  }
  const setStreamToVideo = stream => {
    console.log(stream);
    console.log(typeof stream);
		myRef.current.srcObject = stream;
    mediaRef.current.mediaRecorder.ondataavailable = e => {
      onData(e.data);
    };
	}
  const handleStop = blob => {
    setRecording(false);
    releaseStreamFromVideo();

		console.log('Recording Stopped.');
		downloadVideo(blob);
  }
  const handlePause = () => {
    setPaused(true);
  }
  const handleResume = () => {
    setPaused(false);
  }
  const handleError = err => {
    setReason(err.name);
  }
  const handleStreamClose = () => {
    if (mediaRef.current !== null) {
      mediaRef.current.mediaRecorder.ondataavailable = null;
    }
  }
  const downloadVideo = blob => {
		let url = URL.createObjectURL(blob);
		// let a = document.createElement('a');
		// a.style.display = 'none';
		// a.href = url;
    setVideos([...videos, url]);
		// a.target = '_blank';
		// document.body.appendChild(a);
	}
  const releaseStreamFromVideo = () => {

	}
  console.log(videos);
  return (
    <div className="App">
      <Link to='/'>Back To Dashboard</Link>
      <h1>Video Recording Example</h1>
              <hr />

              <MediaCapturer
                  ref={mediaRef}
                  constraints={{ audio: true, video: true }}
                  timeSlice={1000}
                  onGranted={handleGranted}
                  onDenied={handleDenied}
                  onStart={handleStart}
                  onStop={handleStop}
                  onPause={handlePause}
                  onResume={handleResume}
                  onError={handleError}
                  onStreamClosed={handleStreamClose}
                  render={({ request, start, stop, pause, resume }) =>
                  <div>
                      <p>Granted: {granted.toString()}</p>
                      <p>Rejected Reason: {rejectedReason}</p>
                      <p>Recording: {recording.toString()}</p>
                      <p>Paused: {paused.toString()}</p>

                      {!granted && <button onClick={request}>Get Permission</button>}
                      <button onClick={start}>Start</button>
                      <button onClick={stop}>Stop</button>
                      <button onClick={pause}>Pause</button>
                      <button onClick={resume}>Resume</button>

                      <p>Streaming test</p>
                      <video ref={myRef} autoPlay></video><br />
                        {!videos.length > 0 ? null :
                          videos.map((vid,i) =>
                            <a key={i} href={vid} target='_blank' rel="noreferrer">Video {i+1}</a>
                          )
                        }
                  </div>
              } />
    </div>
  );
}

export default Video;
