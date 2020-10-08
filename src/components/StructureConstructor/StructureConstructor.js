import React, { Component } from 'react';
import Constructor from '../../helpers/Constructor';
import Structure from '../Structure/Structure';
import './StructureConstructor.css';

class StructureConstructor extends Component {
  generateCost(Structures) {
    let cost = (Structures.biomass_cost * Structures.toSpawn);
    return cost;
  };

  render() {
    const { Structures } = this.props
        
    return (
      <div className='builder-box'>
        <h2>Structure Constructor</h2>
        <hr />
          {Structures.filter(constructableStructure => constructableStructure.constructing === true)
            .filter(constructingStructure => constructingStructure.constructing === true)
              .map(structure => (
                <Structure
                  id={structure.id}
                  name={structure.structure_name}
                  hp={structure.hp}
                  atk={structure.atk}
                  cost={structure.biomass_cost}
                  synapse={structure.synapse_produced}
                  desc={structure.description}
                  features={structure.special_features}
                />
              ))
          }
          <div className='buttons'>
            <button className='arrow-button' onClick={() => this.props.handleMoveLeft()} disabled>LEFT</button>
            <button className='builder-button' onClick={() => this.props.handleConstruct()}>SET SPAWNS</button>
            <span className='row center'>
              <p className='red'>COST: {this.generateCost(Structures)}</p>
              <p className='red'>CONSTRUCTING: {Structures.toConstruct}</p>
            </span>
            <button className='builder-button' value='1' onClick={(event) => Constructor.updateToConstruct(event)}>+</button>
            <button className='builder-button' value='-1' onClick={(event) => Constructor.updateToConstruct(event)}>-</button>
            <button className='arrow-button' onClick={() => this.props.handleMoveRight()} disabled>RIGHT</button>
          </div>
        </div>
    );
  };
};

export default StructureConstructor;