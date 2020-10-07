import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MainScreen.css';

class MainScreen extends Component {
  render() {
    return(
      <section className='main-style'>
        <Link to='/login'><h1>Login</h1></Link>
        <br />
        <br />
        <Link to='/gameplay'><h1>Quickplay</h1></Link>
      </section>
    );
  };
};

export default MainScreen;