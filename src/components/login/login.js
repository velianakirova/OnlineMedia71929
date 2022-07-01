import React, {useState } from 'react';
import './login.css'

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

  const sendUserData = (userData) => {
  const url = 'http://localhost:3002/api/login';
  sendPostRequest(url, userData);
};

  const sendPostRequest = (url, userData) => {
  console.log(JSON.stringify(userData));
  const res = fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
  })
      .then(response => response.json())
      .then(function () {
          localStorage.setItem("access_token", res.token);
          window.location.href='/UserProfileProcessor';

      });
};

      return (
        <form className="Login">
        <h1>Login</h1>
        <p>Username</p>
          <input type="text" value={username}
          onChange={e => setUsername(e.target.value)}></input>
            <p>Password</p>
          <input type="password" value={password}
          onChange={e => setPassword(e.target.value)}></input>

          <button onClick={() => {
                let user = {
                    username: username, password: password
                };

              sendUserData(user);
              localStorage.setItem("loggedUserName", username);
              }
              } >Login</button>
        </form>
    );  
}

export default Login;