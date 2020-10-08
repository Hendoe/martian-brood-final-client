import React, { Component } from 'react';
import './Tasks.css';

class Tasks extends Component {
  render() {
    const { aliens=[] } = this.props

    return(
      <div class="builder-box-tasks">
        <h3>Task List</h3>
          <div className='task-row-1'>
            <span><button className='tasks'>Spawn Plans</button></span>
            <span><button className='tasks'>Gather Biomass</button></span>
            <span><button className='tasks'>Construction Orders</button></span>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        <button className='builder-button' onClick={() => this.props.handleClickCancel()}>CANCEL</button>
        <button className='builder-button' onClick={() => this.props.handleClickCommit()}>COMMIT</button>
      </div>
    );
  };
};

export default Tasks;