import React, { Component } from 'react';
import './AlienList.css';

class AlienList extends Component {
  render() {
    const { alienInventory=[] } = this.props
    console.log(alienInventory)
    console.log(this.props)

    return (
      <div className='list-box'>
        {alienInventory.map(alien => (
          <ul className='left-list'>
            <li className='item'>Name: {alien.alien_name}</li>
            <li className='item'>Count: {alien.count}</li>
            <li className='item'>To Spawn: {alien.toSpawn}</li>
          </ul>
        ))}
      </div>
    )   
  };
};



export default AlienList;