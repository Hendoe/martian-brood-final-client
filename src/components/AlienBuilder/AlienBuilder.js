import React, { Component } from 'react';
import AliensContext from '../../contexts/AliensContext'
import AliensApiService from '../../services/aliens-api-service';
import Alien from '../Alien/Alien';
import './AlienBuilder.css';

class AlienBuilder extends Component {
  static defaultProps = {
    match: { params: {} },
  };

  static contextType = AliensContext

  componentDidMount() {
    // const { alienId } = this.props.match.params
    // this.context.clearError()
          // AliensApiService.getAlien(alienId)
          //   .then(this.context.setAlien)
          //   .catch(this.context.setError)
          AliensApiService.getAliens()
          .then(this.context.setAliens)
          .catch(this.context.setError)
  }

  componentWillUnmount() {
    this.context.clearAlien()
  }

  render() {
    console.log(this.context.aliens)
    const { alien } = this.context
    const { aliens } =this.context
    const cost = this.props.cost
    const toBuild = this.props.toBuild
    
    return (
      <div className='builder-box'>
        <h2>Alien Spawner</h2>
        <hr />
          {aliens.map(alien => (
            <Alien 
              id={alien.id}
              name={alien.alien_name}
              hp={alien.hp}
              atk={alien.atk}
              cost={alien.biomass_cost}
              synapse={alien.synapse_required}
              desc={alien.description}
              features={alien.special_features}
            />
          ))}
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