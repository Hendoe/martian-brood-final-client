import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import './Create.css';

class Create extends Component {
  handleSubmit = (event) => {
    event.preventDefault()
    const newBrood = {
      brood_name: event.target['brood-name'].value,
    }
    fetch(`${config.API_ENDPOINT}/api/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newBrood)
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
      <section className='brood-style'>
        <h2>Create Brood here:</h2>
        <form onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='brood-name-input'>Brood Name</label>
            <br/>
            <input type='text' id='brood-name-input' name='brood-name' />
          </div>
          </form>
        <br/>
        <Link to='/gameplay'><h1>Start</h1></Link>
        <Link to='/'><h1>Back to Main Screen</h1></Link>
      </section>
    );
  };
};

export default Create;