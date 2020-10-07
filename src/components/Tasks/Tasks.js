import React, { Component } from 'react';
import './Tasks.css';

class Tasks extends Component {
  render() {
    const { aliens=[] } = this.props

    return(
      <div class="builder-box">
        <div className="inner-builder">
            <div className="left-builder">
              <h3>Alien Spawning Order</h3>
              {aliens.map(alien => (
                <div>
                  <span><h3>Name: {alien.alien_name}</h3></span>
                  <span><h3>To Spawn: {alien.toBuild}</h3></span>
                </div>
              ))}
            </div>
            <div vlassName="right-builder">
              <h3>Task List</h3>
                <li><button className='tasks' 
                // onClick={() => this.props.handleClickCancel()} 
                disabled>Gather Biomass</button></li>
            </div>
          </div>
        <button className='builder-button' onClick={() => this.props.handleClickCancel()}>CANCEL</button>
        <button className='builder-button' onClick={() => this.props.handleClickCommit()}>COMMIT TASKS</button>
      </div>
    );
  };
};

export default Tasks;