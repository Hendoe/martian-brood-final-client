import React, { Component } from 'react';
import { AlienInventory } from '../../stores/AlienInventory';
import ReportContext from '../../contexts/ReportContext';
import './AlienList.css';
import { Conditionals } from '../../stores/Conditionals';

class AlienList extends Component {
  static contextType = ReportContext

  filterInBrood = () => {
    const { alienInventory } = this.context;
    let filteredAliens = alienInventory.filter(alien => alien.brood_count > 0);
    return filteredAliens
  };

  renderAlienList = (filteredAliens) => {
    if (Conditionals.loadMode === false) {
      return (
        <div className='list-box-aliens'>
          <div className='left-column-aliens'>
            <span className='top-aliens'><h4>Name</h4></span>
            <ul className='left-list'>
              {filteredAliens.map(alien => (
                <li key={alien.id} className='alien'>{alien.alien_name}</li>
              ))}
            </ul>
          </div>
          <div className='middle-column-aliens'>
            <span className='top-aliens'><h4>Brood Count</h4></span>
            <ul> 
              {filteredAliens.map(alien => (
                <li key={alien.id} className='alien'>{alien.brood_count}</li>
              ))}
            </ul>
          </div>
          <div className='right-column-aliens'>
            <span className='top-aliens'><h4>Spawning</h4></span>
            <ul>
              {filteredAliens.map(alien => (
                <li key={alien.id} className='alien'>{alien.spawning_count}</li>
              ))}
            </ul>
          </div>
        </div>
      )
    } else {
      return (
      <ul className='left-list'>
        <li><br /></li>
        <li>SPAWNING</li>
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
        <li><br /></li>
        <li><br /></li>
        <li><br /></li>
        <li><br /></li>
      </ul>
      )
    };
  };
  render() {
    const { aliensCost, aliensSynapse } = this.props
    let filteredAliens = this.filterInBrood();

    return (
      <div className='left aliens-box'>
        <h2>Aliens</h2>
          <div className='lower-left'>
            {this.renderAlienList(filteredAliens)}
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