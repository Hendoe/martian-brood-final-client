import React, { Component } from 'react';
import Alien from '../Alien/Alien';
import './AlienBuilder.css';

class AlienBuilder extends Component {
  render() {
    const { aliens=[] } = this.props
    const cost = this.props.cost
    const toBuild = this.props.toBuild
    console.log(this.props.cost)
    
    return (
      <div className='builder-box'>
        <h2>Alien Spawner</h2>
        <hr />
          <span>{aliens.map(alien => (
            <h3>Name: {alien.alien_name}</h3>))}
          </span>
          <span>{aliens.map(alien => (
            <h3>Description: {alien.description}</h3>))}
          </span>

          <section className='stats'>
            <div className='builder-column'>
              <h3>Hitpoints</h3>
              {aliens.map(alien => (
              <p>{alien.hp}</p>))}
            </div>
            <div className='builder-column'>
              <h3>Attack</h3>
              {aliens.map(alien => (
              <p>{alien.atk}</p>))}
            </div>
            <div className='builder-column'>
              <h3>Biomass Cost</h3>
              {aliens.map(alien => (
              <p>{alien.biomass_cost}</p>))}
            </div>
            <div className='builder-column'>
              <h3>Synapse Required</h3>
              {aliens.map(alien => (
              <p>{alien.synapse_required}</p>))}
            </div>
          </section>

        <div className='build-buttons'>
          <button className='builder-button' onClick={() => this.props.handleClickSpawn()}>SET SPAWNS</button>
          <span className='row center'>
            <p className='red'>COST: {cost}</p>
            <br />
            <p className='red'>SPAWNING: {toBuild}</p>
          </span>
          <button className='builder-button' onClick={() => this.props.handleClickAdd()}>+</button>
          <button className='builder-button' onClick={() => this.props.handleClickSubtract()}>-</button>
        </div>
        <div className='arrow-buttons'>
          <button className='arrow-button' onClick={() => this.props.handleMoveLeft()} disabled>LEFT</button> 
          <button className='arrow-button' onClick={() => this.props.handleMoveRight()} disabled>RIGHT</button>
        </div>
      </div>
    );
  };
};

export default AlienBuilder;