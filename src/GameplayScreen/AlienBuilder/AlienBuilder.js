import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './AlienBuilder.css';

class AlienBuilder extends Component {
  render() {
    return (
      <section className='gameplay-style reaction-mode'>
        <div class="left aliens-box">
          <h2>Aliens</h2>
          <ul>
            <li>1 Primarch</li>
            <li>4 Worker Drones</li>
            <li>2 Warrior Drones</li>
          </ul>
          <button class='build-button' disabled>Spawn Aliens</button>
        </div>
        <div class="right alien-structures-box">
          <h2>Alien Stuctures</h2>
          <ul>
            <li>2 Synapse Clusters </li>
            <li>3 Watcher Orbs</li>
            <li>1 Spawning Pit</li>
          </ul>
          <button class='build-button' disabled>Build Alien Stuctures</button>
        </div>
        <div class='builder-box'>
          <h2>Alien Spawner</h2>
          <div class="inner-builder">
            <div class="left-builder">
              <h3>Aliens</h3>
              <ul>
                <li><button class="spawn-button">Primarch</button></li>
                <li><button class="spawn-button">Warrior Drone</button></li>
                <li><button class="spawn-button">Worker Drone</button></li>
              </ul>
            </div>
            <div class="right-builder">
              <h3>Count</h3>
              <ul>
                <li><p>Primarchs to Build: 0</p></li>
                <li><p>Warrior Drones to Build: 1</p></li>
                <li><p>Worker Drones to Build: 4</p></li>
              </ul>
            </div>
          </div>
          <Link to="/gameplay"><button class='builder-button'>SPAWN</button></Link>
        </div>
      </section>
    );
  };
};

export default AlienBuilder;