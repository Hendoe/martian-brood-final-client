import React, { Component } from 'react';
import './AlienBuilder.css';

class AlienBuilder extends Component {
  render() {
    return (
      <div className='builder-box'>
        <h2>Alien Spawner</h2>
        <div className="inner-builder">
          <div className="left-builder">
            <h3>Aliens</h3>
            <ul>
              <li><button className="spawn-button">Primarch</button></li>
              <li><button className="spawn-button">Warrior Drone</button></li>
              <li><button className="spawn-button">Worker Drone</button></li>
            </ul>
          </div>
          <div className="right-builder">
            <h3>Count</h3>
            <ul>
              <li><p>Primarchs to Build: 0</p></li>
              <li><p>Warrior Drones to Build: 1</p></li>
              <li><p>Worker Drones to Build: 4</p></li>
            </ul>
          </div>
        </div>
        <button className='builder-button' onClick={() => this.props.handleClickSpawn()}>SPAWN</button>
      </div>
    );
  };
};

export default AlienBuilder;