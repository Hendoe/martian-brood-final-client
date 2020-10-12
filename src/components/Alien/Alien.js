import React, { Component } from 'react';
import './Alien.css';

class Alien extends Component {
  render() {
    const { id, name, hp, atk, cost, synapse, desc, features } = this.props

    return (
      <li key={id}>
        <span><h3>Name: {name}</h3></span>
        <span><h3>Description:</h3></span>
          <span><p>{desc}</p></span>
        <span><h3>Special Features:</h3></span>
          <span><p>{features}</p></span>
        <section className='stats'>
          <div className='builder-column'>
            <h3>Hitpoints</h3>
            <p>{hp}</p>
          </div>
          <div className='builder-column'>
            <h3>Attack</h3>
            <p>{atk}</p>
          </div>
          <div className='builder-column'>
            <h3>Biomass Cost</h3>
            <p>{cost}</p>
          </div>
         <div className='builder-column'>
            <h3>Synapse Required</h3>
            <p>{synapse}</p>
          </div>
        </section>
      </li>
    );
  };
};

export default Alien;