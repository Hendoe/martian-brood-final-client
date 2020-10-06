import React, { Component } from 'react';
import './Alien.css';

class Alien extends Component {
  render() {
    const { name } = this.props

    return (
      <div className='Alien'>
        <p className='Alien__tittle'>
          {name}
        </p>
      </div>
    );
  };
};

export default Alien;