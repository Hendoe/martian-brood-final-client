import React, { Component } from 'react';
import Spawner from '../../helpers/Spawner';
import Alien from '../Alien/Alien';
import './AlienSpawner.css';

class AlienSpawner extends Component {
  generateCost(Aliens) {
    let cost = (Aliens.biomass_cost * Aliens.toSpawn);
    return cost;
  };

  render() {
    const { aliens } = this.props
        
    return (
      <div className='builder-box'>
        <h2>Alien Spawner</h2>
        <hr />
          {aliens.filter(spawnableAlien => spawnableAlien.spawnable === true)
            .filter(spawningAlien => spawningAlien.spawning === true)
              .map(alien => (
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
              ))
          }
          <div className='buttons'>
            <button className='arrow-button' onClick={() => this.props.handleMoveLeft()} disabled>LEFT</button>
            <button className='builder-button' onClick={() => this.props.handleSpawn()}>SET SPAWNS</button>
            <span className='row center'>
              <p className='red'>COST: {this.generateCost(aliens)}</p>
              <p className='red'>SPAWNING: {aliens.toSpawn}</p>
            </span>
            <button className='builder-button' value='1' onClick={(event) => Spawner.updateToSpawn(event)}>+</button>
            <button className='builder-button' value='-1' onClick={(event) => Spawner.updateToSpawn(event)}>-</button>
            <button className='arrow-button' onClick={() => this.props.handleMoveRight()} disabled>RIGHT</button>
          </div>
        </div>
    );
  };
};

export default AlienSpawner;