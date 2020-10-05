import React, { Component } from 'react';
import './TaskFooterDisabled.css';

class TaskFooterDisabled extends Component {
  render() {
    return(
      <button className='task-button' disabled>Set Tasks</button>
    );
  };
};

export default TaskFooterDisabled;