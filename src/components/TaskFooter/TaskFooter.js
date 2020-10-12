import React, { Component } from 'react';
import './TaskFooter.css';

class TaskFooter extends Component {
  renderTaskMaster() {
    if (this.props.buildMode === true || this.props.taskMode === true) {
      return (
        <button className='task-button' disabled>Set Tasks</button>
      )
    } else {
      return (
        <button className='task-button' onClick={() =>  this.props.taskModeChange()}>Set Tasks</button>
      );
    };
  };

  render() {
    return (
      <div>{this.renderTaskMaster()}</div>
    );
  };
};

export default TaskFooter;