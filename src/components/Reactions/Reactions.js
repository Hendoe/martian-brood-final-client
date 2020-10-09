import React, { Component } from 'react';
import './Reactions.css';

class Reactions extends Component {
  render() {
    const { status, reactionsSpawn, reactionsConstruct } = this.props

    return(
      <div class="reaction-box">
        <p>End of Solar Day {status[0].solar_day}</p>
        <p>The Brood spawns {reactionsSpawn} aliens</p>
        <p>The Brood constructs {reactionsConstruct} structures</p>
        <button className='reaction-button' onClick={() => this.props.handleClickCancel()}>OK</button>
      </div>
    );
  };
};

export default Reactions;