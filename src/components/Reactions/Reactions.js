import React, { Component } from 'react';
import { Reactor } from '../../stores/Reactor';
// import config from '../../config';
import './Reactions.css';
import ReportContext from '../../contexts/ReportContext';

class Reactions extends Component {
  static contextType = ReportContext

  renderSpawning() {
    if (Reactor.total_spawning_count === 0 ) {
      return <p>The Brood didn't spawn any aliens</p>
    } else if (Reactor.total_spawning_count === 1 ) {
      return <p>The Brood spawned {Reactor.total_spawning_count} alien</p>
    } else {
      return <p>The Brood spawned {Reactor.total_spawning_count} aliens</p>
    };
  };

  renderConstructing() {
    if (Reactor.total_constructing_count === 0 ) {
      return <p>The Brood didn't construct any structures</p>
    } else if (Reactor.total_constructing_count === 1 ) {
      return <p>The Brood constructed {Reactor.total_constructing_count} structure</p>
    } else {
      return <p>The Brood constructed {Reactor.total_constructing_count} structures</p>
    };
  };

  render() {
    const { status } = this.context

    return(
      <div className="reaction-box">
        <p>End of Solar Day {(status.solar_day - 1)}</p>
        {this.renderSpawning()}
        {this.renderConstructing()}
        <button className='reaction-button' onClick={() => this.props.handleClick('cancel')}>OK</button>
      </div>
    );
  };
};

export default Reactions;