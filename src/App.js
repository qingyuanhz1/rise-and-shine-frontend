import { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import './App.css';
import EventCalendar  from './components/EventCalendar';

function App() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [events, setEvents] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const responseGoogle = (response) => {
    setName(response.profileObj.name)
    setEmail(response.profileObj.email)
    setIsLoggedIn(true)
    console.log(email)
  }

  const getEventsClick = (name) => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/calendars/events`).then((response) => {
      console.log(response.data)
      setEvents(response.data)
    }).catch((error) => {
      console.log('Error:', error);
})}

  return (
    <div className="App">
      <h1>Welcome {name}!</h1>
      <GoogleLogin
      clientId="8883512831-jh64k5os3e6len7ij617j3k6r6vk3ms3.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
      />
      <button onClick={getEventsClick}>{isLoggedIn ? 'Calendar' : null}</button>
    <EventCalendar
    events={events}/>
    </div>
  );
}

export default App;
