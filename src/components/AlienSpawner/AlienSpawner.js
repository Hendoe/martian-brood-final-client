import React, { Component } from 'react';
import Alien from '../Alien/Alien';
import Aliens from '../../stores/Aliens';
import { AlienInventory } from '../../stores/AlienInventory';
import './AlienSpawner.css';
import ReportContext from '../../contexts/ReportContext';

class AlienSpawner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AlienInventory: AlienInventory,
      alienCost: 0,
      aliensToSpawn: 0,
      aliensSynapse: 0,
    };
  };

  static contextType = ReportContext;

  generateSpawning() {
    return this.context.alienInventory[0].spawning_count;
  };

  generateCost() {
    let spawning =  this.context.alienInventory[0].spawning_count;
    let cost = Aliens[0].biomass_cost
    let alienCost = (spawning * cost)
    return alienCost;
  };

  generateSynapse() {
    let spawning = this.context.alienInventory[0].spawning_count;
    let synapse =  Aliens[0].synapse_required;
    let synapseRequired = (spawning * synapse);
    return synapseRequired;
  };

  handleUpdateSpawning = (x) => {
    this.context.updateSpawning(x);
    this.forceUpdate();
  };

  setSpawnPlan() {
    const biomass = this.generateCost();
    const synapse = this.generateSynapse();
    this.props.setAliensBiomass(biomass);
    this.props.setSynapse(synapse);
  };
  
  render() {
    const { aliens = [] } = this.context
    let alien = ""
    if (aliens[0]) {
      alien = aliens[0]
    };

    return (
      <section className='builder-box'>
        <h2>Alien Spawner</h2>
        <hr />
          {/* {aliens.map(alien => (           */}
            <form>    
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
              <span className='row center'>
                <p className='orange'>COST: {this.generateCost()}</p>
                <p className='orange'>SPAWNING: {this.generateSpawning()}</p>
                <p className='orange'>SYNAPSE REQUIRED: {this.generateSynapse()}</p>
              </span>
            </form>
          {/* ))} */}
        <div className='buttons'>
          <button className='arrow-button' onClick={() => this.props.handleMoveLeft()} disabled>LEFT</button>
          <button className='builder-button' onClick={() => this.setSpawnPlan()}>SPAWN</button>
          <button className='builder-button' onClick={() => this.handleUpdateSpawning(1)}>+</button>
          <button className='builder-button' onClick={() => this.handleUpdateSpawning(0)}>-</button>
          <button className='builder-button' onClick={() => this.props.handleClick('cancel')}>CANCEL</button>
          <button className='arrow-button' onClick={() => this.props.handleMoveRight()} disabled>RIGHT</button>
        </div>
      </section>
    );
  };
};

export default AlienSpawner;