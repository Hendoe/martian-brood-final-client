import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Tasks.css';

class Tasks extends Component {
  render() {
    const { aliens=[] } = this.props

    return(
      <div class="builder-box">
        <h2>Tasks</h2>
        <div>
          <h3>Alien Spawning Order</h3>
          {/* <span>{aliens.map(alien => (
            <h3>Name: {alien.alien_name}</h3>))}
          </span>
          <span>{aliens.map(alien => (
            <h3>Name: {alien.toBuild}</h3>))}
          </span> */}
          {aliens.map(alien => (
            <div>
              <span><h3>Name: {alien.alien_name}</h3></span>
              <span><h3>To Spawn: {alien.toBuild}</h3></span>
            </div>
          ))}
       </div>
        <button className='builder-button' onClick={() => this.props.handleClickCancel()}>CANCEL</button>
        <button className='builder-button' onClick={() => this.props.handleClickCommit()}>COMMIT TASKS</button>
      </div>
    );
  };
};

export default Tasks;