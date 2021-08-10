import { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import './App.css';

function App() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const responseGoogle = (response) => {
    setName(response.profileObj.name)
    setEmail(response.profileObj.email)
    console.log(email)
  }
  return (
    <div className="App">
      <h1>Login With Google</h1>
      <h2>Welcome {name}</h2>
      <GoogleLogin
    clientId="8883512831-jh64k5os3e6len7ij617j3k6r6vk3ms3.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
    </div>
  );
}

export default App;
