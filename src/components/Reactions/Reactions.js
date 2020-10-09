import React, { Component } from 'react';
import './Reactions.css';

class Reactions extends Component {
  render() {
    const { aliens } = this.props

    return(
      <div class="reaction-box">
        <p>The Brood spawns {aliens[0].spawning_count} {aliens[0].alien_name}s</p>
        <button className='reaction-button' onClick={() => this.props.handleClickCancel()}>OK</button>
      </div>
    );
  };
};

export default Reactions;