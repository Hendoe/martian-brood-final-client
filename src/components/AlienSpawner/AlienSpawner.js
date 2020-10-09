import React, { Component } from 'react';
import Alien from '../Alien/Alien';
import './AlienSpawner.css';

class AlienSpawner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aliens: this.props.aliens,
      alienCost: 0,
      aliensToSpawn: 0,
      aliensSynapse: 0,
      spawnPlan: {
        alien_name: 'Worker Drone',
        total_to_spawn: 0,
        biomass_cost: 0,
        synapse_required: 0
      },
    };
  };

  generateSpawning() {
    return this.state.aliens[0].spawning_count;
  };

  generateCost() {
    let spawning =  this.state.aliens[0].spawning_count;
    let cost = this.state.aliens[0].biomass_cost
    let alienCost = (spawning * cost)
    return alienCost
  };

  generateSynapse() {
    let spawning =  this.state.aliens[0].spawning_count;
    let synapse =  this.state.aliens[0].synapse_required;
    let synapseRequired = (spawning * synapse);
    return synapseRequired;
  };

  addSpawning() {
    let spawnCount = this.state.aliens[0].spawning_count;
    let newCount = (spawnCount += 1);
    this.setState( prevState => {
      let newSpawning = prevState.aliens[0]
        newSpawning.spawning_count = newCount;
        return {
          aliens: [newSpawning]
        }
    });
  };

  subtractSpawning() {
    let spawnCount = this.state.aliens[0].spawning_count;
    if (spawnCount === 0) {
      alert('You cannot spawn less than 0 aliens')
    } else {
        let newCount = (spawnCount -= 1);
        this.setState( prevState => {
          let newSpawning = prevState.aliens[0]
            newSpawning.spawning_count = newCount;
            return {
              aliens: [newSpawning]
            }
        });
    };
  };

  updateAliensSynapse(spawning) {
    let newSynapse = (1 * spawning);
    this.setState({aliensSynapse: newSynapse})
  };

  setSpawnPlan() {
    const toSpawn = this.state.aliens[0].spawning_count;
    const biomass = this.generateCost();
    const synapse = this.generateSynapse();
    let newPlan = this.state.spawnPlan;
    newPlan.total_to_spawn = toSpawn;
    newPlan.biomass_cost = biomass;
    newPlan.synapse_required = synapse;
    this.setState({spawnPlan: newPlan});
    this.props.setSpawns(toSpawn);
    this.props.setBiomass(biomass);
    this.props.setSynapse(synapse);
  };
  
  render() {
    const { aliens } = this.state

    return (
      <div className='builder-box'>
        <h2>Alien Spawner</h2>
        <hr />
          {/* {aliens.filter(spawnableAlien => spawnableAlien.spawnable === true)
            .filter(spawningAlien => spawningAlien.spawning === true) */}
              {aliens.map(alien => (
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
                    <p className='red'>COST: {this.generateCost()}</p>
                    <p className='red'>SPAWNING: {this.generateSpawning()}</p>
                    <p className='red'>SYNAPSE REQUIRED: {this.generateSynapse()}</p>
                  </span>
                </form>
              ))
          }
          <div className='buttons'>
            <button className='arrow-button' onClick={() => this.props.handleMoveLeft()} disabled>LEFT</button>
            <button className='builder-button' onClick={() => this.setSpawnPlan()}>SPAWN</button>
            <button className='builder-button' onClick={() => this.addSpawning()}>+</button>
            <button className='builder-button' onClick={() => this.subtractSpawning()}>-</button>
            <button className='builder-button' onClick={() => this.props.handleClickCancel()}>CANCEL</button>
            <button className='arrow-button' onClick={() => this.props.handleMoveRight()} disabled>RIGHT</button>
          </div>
        </div>
    );
  };
};

export default AlienSpawner;