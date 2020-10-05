import React, { Component } from 'react';
import './MainScreen.css';

class MainScreen extends Component {
  render() {
    return(
      <section className='main-style'>
        <a href='/gameplay'><h1>Quickplay</h1></a>
      </section>
    );
  };
};

export default MainScreen;