import React, { Component } from 'react';
import './AlienList.css';

class AlienList extends Component {
  render() {
    const { aliens } = this.props

    return (
      <div className='list-box'>
        {aliens.map(alien => (
          <ul className='left-list'>
            <li className='item'>Name: {alien.alien_name}</li>
            <li className='item'>Count: {alien.brood_count}</li>
            <li className='item'>To Spawn: {alien.spawn_count}</li>
          </ul>
        ))}
      </div>
    )   
  };
};

export default AlienList;