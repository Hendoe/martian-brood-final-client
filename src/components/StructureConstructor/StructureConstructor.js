import React, { Component } from 'react';
import Structure from '../Structure/Structure';
import Structures from '../../stores/Structures';
import { StructureInventory, UpdateConstructing } from '../../stores/StructureInventory';
import './StructureConstructor.css';

class StructureConstructor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      constructables: StructureInventory,
      current: 0,
      structureCost: 0,
      structuresToConstruct: 0,
      structuresSynapse: 0,
    };
  };

  generateConstructing() {
    let i = this.state.current;
    return StructureInventory[i].constructing_count;
  };

  generateCost() {
    let i = this.state.current;
    let constructing =  StructureInventory[i].constructing_count;
    let cost = Structures[i].biomass_cost
    let structureCost = (constructing * cost)
    return structureCost;
  };

  generateTotalCost() {
    let index = this.state.current;
    let constructing = this.state.constructables.filter(structure => structure.constructing_count > 0);
    let totalCost = 0;
    for (let i = (index); i < constructing.length; i++) {
      let construct = constructing[i];
      let cost = (construct.constructing_count * Structures[i].biomass_cost);
      console.log(Structures[i])
      totalCost += cost;
     };
    return totalCost;
  };

  generateSynapse() {
    let i = this.state.current;
    let constructing =  StructureInventory[i].constructing_count;
    let synapse =  Structures[i].synapse_produced;
    let synapseProduced = (constructing * synapse);
    return synapseProduced;
  };

  generateTotalSynapse() {
    let index = this.state.current;
    let constructing = StructureInventory.filter(structure => structure.constructing_count > 0);
    let totalSynapse = 0;
    for (let i = (index); i < constructing.length; i++) {
      let construct = constructing[i]
      let synapse = (construct.constructing_count * Structures[i].synapse_produced);
      totalSynapse += synapse;
     };
    return totalSynapse;
  };

  handleUpdateConstructing = (x, i) => {
    UpdateConstructing(x, i);
    this.forceUpdate();
  };

  setConstructionOrders() {
    const biomass = this.generateTotalCost();
    const synapse = this.generateTotalSynapse();
    this.props.setStructuresBiomass(biomass);
    this.props.setStructuresSynapse(synapse);
  };

  findStructure(x) {
    let i = this.state.current;
    if (x === 0) {
      if (i === 0) {
        let terminal = (StructureInventory.length -1);
        for (let i = (terminal); i < StructureInventory.length; i++) {
          this.setState({current: i});
            return StructureInventory[i];
        };
      } else {
          let moveLeft = (i -= 1);
          for (let i = (moveLeft); i < StructureInventory.length; i++) {
            this.setState({current: moveLeft});
              return StructureInventory[i];
          };
      };
    } else if (x === 1) {
      if (i === StructureInventory.length -1) {
        let start = 0;
        for (let i = (start); i < StructureInventory.length; i++) {
          this.setState({current: start});
            return StructureInventory[i];
        };
      } else {
          let moveRight = (i += 1);
          for (let i = (moveRight); i < StructureInventory.length; i++) {
            this.setState({current: moveRight});
              return StructureInventory[i];
          };
      };
    } else {
      let index = i
        for (let i = (index); i < StructureInventory.length; i++) {
          return Structures[i];
      };
    };
  };

  render() {
    let structure = this.findStructure()
    let i = this.state.current

    return (
      <div className='builder-box'>
        <h2>Structure Constructor</h2>
        <hr />
        <form>
          <Structure
            // id={structure.id}
            name={structure.structure_name}
            hp={structure.hp}
            atk={structure.atk}
            cost={structure.biomass_cost}
            synapse={structure.synapse_produced}
            desc={structure.description}
            features={structure.special_features}
          />
          <span className='row center'>
            <p className='red'>COST: {this.generateCost()}</p>
            <p className='red'>CONSTRUCTING: {this.generateConstructing()}</p>
            <p className='gold'>SYNAPSE PRODUCED: {this.generateSynapse()}</p>
          </span>
        </form>
      <div className='buttons'>
        <button className='arrow-button' onClick={() => this.findStructure(0)}>LEFT</button>
        <button className='builder-button' onClick={() => this.setConstructionOrders()}>CONSTRUCT</button>
        <button className='builder-button' onClick={() => this.handleUpdateConstructing(1, i)}>+</button>
        <button className='builder-button' onClick={() => this.handleUpdateConstructing(0, i)}>-</button>
        <button className='builder-button' onClick={() => this.props.handleClick('cancel')}>CANCEL</button>
        <button className='arrow-button' onClick={() => this.findStructure(1)}>RIGHT</button>
      </div>
    </div>
    );
  };
};

export default StructureConstructor;