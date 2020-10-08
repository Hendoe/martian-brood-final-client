import React, { Component } from 'react';
import Alien from '../Alien/Alien';
import './AlienSpawner.css';

class AlienSpawner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alienCost: 0,
      aliensToSpawn: 0,
    };
  };

  addToSpawn() {
    let spawning = this.state.aliensToSpawn
    spawning += 1;
    this.setState({aliensToSpawn: spawning});
    this.updateAlienCost(spawning);
  };

  subtractToSpawn() {
    let spawning = this.state.aliensToSpawn;
    if (spawning === 0) {
      alert('You cannot spawn less than 0 aliens')
    } else {
        spawning -= 1;
    };
    this.setState({aliensToSpawn: spawning});
    this.updateAlienCost(spawning);
  };
  
  updateAlienCost(spawning) {
    console.log(this.state.aliensToSpawn)
    let newCost = (5 * spawning);
    this.setState({alienCost: newCost})
  };

  componentWillUnmount() {
    this.setState({alienCost: 0});
    this.setState({aliensToSpawn: 0});
  };

  render() {
    const { aliens } = this.props
    const { aliensToSpawn, alienCost } =this.state
    console.log(aliensToSpawn)    

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
            <button className='builder-button' onClick={() => this.props.handleSpawn()}>SPAWN</button>
            <button className='builder-button' onClick={() => this.addToSpawn()}>+</button>
              <p className='red'>COST: {alienCost}</p>
              <p className='red'>SPAWNING: {aliensToSpawn}</p>
            <button className='builder-button' onClick={() => this.subtractToSpawn()}>-</button>
            <button className='builder-button' onClick={() => this.props.cancelSpawn()}>CANCEL</button>
            <button className='arrow-button' onClick={() => this.props.handleMoveRight()} disabled>RIGHT</button>
          </div>
        </div>
    );
  };
};

export default AlienSpawner;