import React, { Component } from 'react';
import './AlienList.css';

class AlienList extends Component {
  render() {
    const { aliens, aliensCost, aliensSynapse } = this.props

    return (
      <div className='left aliens-box'>
        <h2>Aliens</h2>
        {aliens.map(alien => (
          <div>
          <div className='list-box-aliens'>
            <div className='left-column'>
              <span className='top-aliens'><h4>Name</h4></span>
              <ul className='left-list'>
                <li className='item'>{alien.alien_name}</li>
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
            <div className='middle-column'>
              <span className='top-aliens'><h4>Brood Count</h4></span>
                <ul>
                  <li>{alien.brood_count}</li>
                </ul>
            </div>
            <div className='right-column'>
              <span className='top-aliens'><h4>Spawning</h4></span>
                <ul>
                  <li>{alien.spawning_count}</li>
                </ul>
            </div>
          </div>
          <div className='bottom-row'>
            <h4>Biomass Cost: {aliensCost}</h4>
            <h4 className='orange'>Synapse Required: {aliensSynapse}</h4>
          </div>
        </div>
      ))}
    </div>
    )   
  };
};

export default AlienList;