import React, { Component } from 'react';
import config from '../../config';
import './Reactions.css';

class Reactions extends Component {
  componentWillUnmount() {
    this.POSTmaster();
  };

  POSTmaster() {
    this.commitStatus();
    this.commitAliens();
    this.commitStructures();
  };

  commitStatus() {
    const { status } = this.props
    status.map( newStatus => (
      fetch(config.API_ENDPOINT + `/commit/status`, {
        method: 'PATCH',
        body: JSON.stringify(newStatus),
        headers: {
          'content-type': 'application/json',
        },
      })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
      })
      .catch(error => {
        console.error(error)
      })
    ));
  };
  
  commitAliens() {
    const { aliens } = this.props
    aliens.map( newAliens => (
      fetch(config.API_ENDPOINT + `/commit/aliens`, {
        method: 'PATCH',
        body: JSON.stringify(newAliens),
        headers: {
          'content-type': 'application/json',
        },
      })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
      })
      .catch(error => {
        console.error(error)
      })
    ))
  };
  
  commitStructures() {
    console.log('final structures', this.props.structures)
    const { structures } = this.props
    structures.map( newStructures => (
      fetch(config.API_ENDPOINT + `/commit/structures`, {
        method: 'PATCH',
        body: JSON.stringify(newStructures),
        headers: {
          'content-type': 'application/json',
        },
      })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
      })
      .catch(error => {
        console.error(error)
      })
    ));
  };

  renderSpawning() {
    if (this.props.reactionsSpawn === 0 ) {
      return <p>The Brood didn't spawn any aliens</p>
    } else if (this.props.reactionsSpawn === 1 ) {
      return <p>The Brood spawned {this.props.reactionsSpawn} alien</p>
    } else {
      return <p>The Brood spawned {this.props.reactionsSpawn} aliens</p>
    };
  };

  renderConstructing() {
    if (this.props.reactionsConstruct === 0 ) {
      return <p>The Brood didn't construct any structures</p>
    } else if (this.props.reactionsConstruct === 1 ) {
      return <p>The Brood constructed {this.props.reactionsConstruct} structure</p>
    } else {
      return <p>The Brood constructed {this.props.reactionsConstruct} structures</p>
    };
  };

  render() {
    const { status } = this.props

    return(
      <div class="reaction-box">
        <p>End of Solar Day {(status[0].solar_day - 1)}</p>
        {this.renderSpawning()}
        {this.renderConstructing()}
        <button className='reaction-button' onClick={() => this.props.handleClickCancel()}>OK</button>
      </div>
    );
  };
};

export default Reactions;