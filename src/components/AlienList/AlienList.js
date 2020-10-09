import React, { Component } from 'react';
import './AlienList.css';

class AlienList extends Component {
  render() {
    const { aliens, aliensCost, aliensSynapse } = this.props

    return (
      <div className='list-box-aliens'>
        <div className='top-row'>
          <span><h4>Name</h4></span>
          <span><h4>Brood Count</h4></span>
          <span><h4>To Spawn</h4></span>
        </div>
        {aliens.map(alien => (
          <ul className='left-list'>
            <li className='item'>{alien.alien_name}</li>
            <li className='item'>{alien.brood_count}</li>
            <li className='item'>{alien.spawning_count}</li>
          </ul>
        ))}
        <div className='bottom-row'>
          <h4>Biomass Cost: {aliensCost}</h4>
          <h4>Synapse Required: {aliensSynapse}</h4>
        </div>
      </div>
    )   
  };
};

export default AlienList;