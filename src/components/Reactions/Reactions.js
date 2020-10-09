import React, { Component } from 'react';
import './Reactions.css';

class Reactions extends Component {
  render() {
    const { aliens } = this.props
    console.log(aliens)

    return(
      <div class="reaction-box">
        <p>The Brood spawns {aliens[0].spawning_count}</p>
        <button className='reaction-button' onClick={() => this.props.handleClickCancel()}>OK</button>
      </div>
    );
  };
};

export default Reactions;