import React, { Component } from 'react';
import './GameplayScreen.css';

class GameplayScreen extends Component {
  render() {
    return(
      <section className='gameplay-style'>
        <div class="left aliens-box">
        <h2>Aliens</h2>
        <ul>
          <li>1 Primarch</li>
          <li>4 Worker Drones</li>
          <li>2 Warrior Drones</li>
        </ul>
        <a href="/gameplay/build-aliens"><button class='build-button'>Spawn Aliens</button></a>
      </div>
      <div class="right alien-structures-box">
        <h2>Alien Stuctures</h2>
        <ul>
          <li>2 Synapse Clusters </li>
          <li>3 Watcher Orbs</li>
          <li>1 Spawning Pit</li>
        </ul>
        <a href="/gameplay/build-structures"><button class='build-button'>Build Alien Stuctures</button></a>
      </div>
    </section>
    
    );
  };
};

export default GameplayScreen;