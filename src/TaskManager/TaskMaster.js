import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './TaskMaster.css';

class TaskMaster extends Component {
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
      <div class="builder-box">
        <h2>Tasks</h2>
        <div class="inner-builder-task-mode">
          <button class="tasks">Process Biomass</button>
          <button class="tasks">Harvest Trees</button>
          <button class="tasks">Attack Settlement</button>
       </div>
        <Link to="/reaction"><button class='builder-button'>COMMIT TASKS</button></Link>
      </div>
    </section>
    );
  };
};

export default TaskMaster;