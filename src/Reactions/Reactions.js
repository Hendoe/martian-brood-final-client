import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Reactions.css';

class Reactions extends Component {
  render() {
    return(
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
        <div class="reaction-box">
          <p>Humans attack your lair!</p>
          <p>4 soldiers fought your 2 Warrior Drones and 1 Primarch.</p>
          <p>They lose 4 soliders, you lost 1 Watcher Orb and 2 Warrior Drones!</p>
          <Link to="/gameplay"><button className='reaction-button'>OK</button></Link>
        </div>
    </section>
    );
  };
};

export default Reactions;