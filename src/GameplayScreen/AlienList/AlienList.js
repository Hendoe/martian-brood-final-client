import React, { Component } from 'react';
import './AlienList.css';

class AlienList extends Component {
  render() {
    const { alienInventory=[] } = this.props
    const count = this.props.count
    const toBuild = this.props.toBuild
    console.log(alienInventory)
    console.log(this.props)

    return (
      <div className='list-box'>
        {alienInventory.map(alien => (
          <ul className='left-list'>
            <li className='item'>Name: {alien.alien_name}</li>
            <li className='item'>Count: {count}</li>
            <li className='item'>To Spawn: {toBuild}</li>
          </ul>
        ))}
      </div>
    )   
  };
};



export default AlienList;