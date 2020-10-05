import React, { Component } from 'react';
import './TaskFooter.css';

class TaskFooter extends Component {
  render() {
    return(
      <a href="../builders/task-builder.html"><button className='task-button'>Set Tasks</button></a>
    );
  };
};

export default TaskFooter;