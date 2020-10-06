import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../config';
import './Login.css';

class Login extends Component {
  handleSubmit = (event) => {
    event.preventDefault()
    const newUser = {
      user_name: event.target['user-name'].value,
      user_email: event.target['user-email'].value,
      user_password: event.target['user-password'].value
    }
    fetch(`${config.API_ENDPOINT}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(event => Promise.reject(event))
        return res.json()
      })
      .catch(error => {
        console.error({ error })
      });
  };

  render() {
    return(
      <section className='login-style'>
        <h2>Login here:</h2>
        <form onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='user-name-input'>User Name</label>
            <br/>
            <input type='text' id='user-name-input' name='user-name' />
          </div>
          <div className='field'>
            <label htmlFor='user-email-input'>Email Address</label>
            <br/>
            <input type='text' id='user-email-input' name='user-email' />
          </div>
          <div className='field'>
            <label htmlFor='user-password-input'>Password</label>
            <br/>
            <input type='text' id='user-password-input' name='user-password' />
          </div>
          </form>
        <br/>
        <Link to='/'><h1>Back to Main Screen</h1></Link>
      </section>
    );
  };
};

export default Login;