import React, { Component } from 'react';
import './TaskFooter.css';

class TaskFooter extends Component {
  renderTaskMaster() {
    if (this.props.buildMode === true) {
      return (
        <button className='task-button' disabled>Set Tasks</button>
      )
    } else {
      return (
        <a href="/task-master"><button className='task-button'>Set Tasks</button></a>
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