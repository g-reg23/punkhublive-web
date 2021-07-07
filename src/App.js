import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Events from './components/Events';
import Video from './components/Video';

const App = () => {
    return (
      <Router>
        <div className="App">
          <div>
            <p className='title'>PunkHubLive Admin</p>
            <img className="logo"
              alt='Logo'
              src="https://i.ibb.co/kqKK9tC/Punk-Hub-Black-876x600.png"/>
          </div>
          <Switch>
              <Route exact path='/' render={(props)=><LandingPage />} />
              <Route exact path='/events' render={(props)=><Events />} />
              <Route exact path='/video' render={(props)=><Video />} />
          </Switch>
        </div>
      </Router>
    );
}

export default App;
