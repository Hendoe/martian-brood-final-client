import React, { Component } from 'react';
import { AlienInventory } from '../../stores/AlienInventory';
import './AlienList.css';

class AlienList extends Component {
  render() {
    const { aliensCost, aliensSynapse } = this.props

    return (
      <div className='left aliens-box'>
        <h2>Aliens</h2>
      <div>
        <div className='list-box-aliens'>
          <div className='left-column-aliens'>
            <span className='top-aliens'><h4>Name</h4></span>
            <ul className='left-list'>
              <li className='alien'>{AlienInventory[0].alien_name}</li>
              <li><br /></li>
              <li><br /></li>
              <li><br /></li>
              <li><br /></li>
              <li><br /></li>
              <li><br /></li>
              <li><br /></li>
              <li><br /></li>
              <li><br /></li>
              <li><br /></li>
              <li><br /></li>
              <li><br /></li>
              <li><br /></li>
            </ul>
          </div>
          <div className='middle-column-aliens'>
            <span className='top-aliens'><h4>Brood Count</h4></span>
            <ul>
              <li>{AlienInventory[0].brood_count}</li>
            </ul>
          </div>
          <div className='right-column-aliens'>
            <span className='top-aliens'><h4>Spawning</h4></span>
            <ul>
              <li>{AlienInventory[0].spawning_count}</li>
            </ul>
          </div>
        </div>
        <div className='bottom-row-aliens'>
          <h4>Biomass Cost: {aliensCost}</h4>
          <h4 className='orange'>Synapse Required: {aliensSynapse}</h4>
        </div>
      </div>
    </div>
    )   
  };
};

export default AlienList;