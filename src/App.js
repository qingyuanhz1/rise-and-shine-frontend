import { useState, useEffect } from 'react';
import axios from 'axios';
import {GoogleLogin} from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import './App.css';
import EventCalendar  from './components/EventCalendar';
import NewEventForm from './components/NewEventForm';

function App() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [events, setEvents] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const loginSuccess = (response) => {
    setName(response.profileObj.name)
    setEmail(response.profileObj.email)
    setIsLoggedIn(true)
    alert ('Logged in successfully!')
    console.log(email)
  }

  const logoutSuccess = () => {
    setIsLoggedIn(false)
    alert ('Logged out succesfully!')
  }
  const getEventsClick = (name) => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/events`).then((response) => {
      console.log(response.data)
      setEvents(response.data)
    }).catch((error) => {
      console.log('Error:', error);
})}

  const createNewEvent = (newEvent) => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/events`, newEvent).then((response) => {
      console.log(response.data)
    }).catch((error) => {
      console.log('Error:', error);
    })}

  return (
    <div className="App">
      <h1>{isLoggedIn ? `Welcome ${name}!`: 'Welcome To Rise & Shine'}</h1>
      <section>
      <GoogleLogin
      clientId="8883512831-jh64k5os3e6len7ij617j3k6r6vk3ms3.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={loginSuccess}
      cookiePolicy={'single_host_origin'}
      />
      <GoogleLogout
      clientId="8883512831-jh64k5os3e6len7ij617j3k6r6vk3ms3.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={logoutSuccess}
      cookiePolicy={'single_host_origin'}
      />
      </section>
      
      <button onClick={getEventsClick}>{isLoggedIn ? 'Calendar' : null}</button>
      <section>
        {isLoggedIn && events ?
        <>
        <h2>Create a new event </h2>
        < NewEventForm createNewEvent = {createNewEvent}/>
        </>
        : ''
        }
      </section>

      <section>
      <EventCalendar
      events={events}
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}/>
        </section>
  
    </div>
  );
}

export default App;
