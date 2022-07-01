import { Component } from "react";
import { PropTypes } from "prop-types";
import './Register.css'

export default class Register extends Component {
    state = {
        name: '', 
        username: '', 
        email: '', 
        gender: '', 
        picture: '', 
        password: ''
    }
    
    submitArticle = (event) => {
        event.preventDefault();
        const name = this.state.name.trim();
        const username = this.state.username.trim();
        const email = this.state.email.trim();
        const gender = this.state.gender.trim();
        const picture = this.state.picture.trim();
        const password = this.state.password.trim();

        this.setState({ name: '', 
        username: '', 
        email: '', 
        gender: '', 
        picture: '', 
        password: ''
       })

        let user = {
          name: name, 
          username: username, 
          email: email, 
          gender: gender, 
          picture: picture, 
          password: password,
          role: "reader"
        };

        const url = "http://localhost:3002/api/register";
        const res = fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(function () {
                console.log("Article created");
            });

            if(res.status >= 400){
              alert("Invalid")
            }
    }

    changeName = (event) => {
        this.setState({ name: event.target.value })
    }

    changeUsername = (event) => {
      this.setState({ username: event.target.value })
  }

    changePicture = (event) => {
        this.setState({ picture: event.target.value })
    }

    changeEmail = (event) => {
        this.setState({ email: event.target.value })
    }

    changePassword = (event) => {
        this.setState({ password: event.target.value })
    }

    changeGender = (event) => {
      this.setState({ gender: event.target.value })
  }

    render() {
        return (
            <form className="RegisterForm" onSubmit={this.submitArticle}>
              <h1>Register</h1>
            <div className='RegisterFormContent'>
                <p>Name</p>
                <input id='name' value={this.state.name} onChange={this.changeName}></input>
                <p>Picture</p>
                <input id='picture' value={this.state.picture} onChange={this.changePicture}></input>
                <p>Username</p>
                <input id='username' value={this.state.username} onChange={this.changeUsername}></input>
                <p>Email</p>
                <input id='email' value={this.state.email} onChange={this.changeEmail}></input>
                <p>Password</p>
                <input id='password' value={this.state.password} onChange={this.changePassword}></input>
                <p>Gender</p>
                <input id='gender' value={this.state.gender} onChange={this.changeGender}></input>

                <button id='saveBtn'>Save</button>
            </div>
        </form>
        )
    }
}
