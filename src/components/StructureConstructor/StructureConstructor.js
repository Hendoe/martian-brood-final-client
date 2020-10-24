import React, { Component } from 'react';
import Structure from '../Structure/Structure';
import Structures from '../../stores/Structures';
import {StructureInventory, UpdateConstructionOrders } from '../../stores/ConstructionOrders';
import './StructureConstructor.css';
import ReportContext from '../../contexts/ReportContext';

class StructureConstructor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      constructables: [],
      current: 0,
      structureCost: 0,
      structuresToConstruct: 0,
      structuresSynapse: 0,
    };
  };

  static contextType = ReportContext

  //Before any Structures can be constructed, first it must be determined what is eligible for constructing
  componentDidMount() {
    let newConstructables = this.context.structures.filter(structure => structure.constructable === true);
    let badConstructables = this.context.structures.filter(structure => structure.constructable === false);
    console.log('constructables', newConstructables);
    console.log('bad stuff', badConstructables);
    this.setState({ constructables: newConstructables});
  };

  //This tallies up the total amount of a structure the Brood plans to construct
  generateConstructing() {
    let i = this.state.current;
    return StructureInventory[i].constructing_count;
  };

  //This will generate the cost for constructing so many of such and such Structure
  generateCost() {
    let i = this.state.current;
    let constructing =  StructureInventory[i].constructing_count;
    let cost = Structures[i].biomass_cost
    let structureCost = (constructing * cost)
    return structureCost;
  };

  //We need this to figure out what to display on the Structure List for our total costs
  //It's also used to calculate how much Biomass to subtract from our Final Status
  generateTotalCost() {
    let constructing = this.state.constructables
    let totalCost = 0;
    for (let x = 0; x < constructing.length; x++) {
      let cost = (constructing[x].constructing_count * Structures[x].biomass_cost);
      totalCost += cost;
     };
    return totalCost;
  };

  //This calculates how much Synapse the Brood will be producing after completing the Structures
  generateSynapse() {
    let i = this.state.current;
    let constructing =  StructureInventory[i].constructing_count;
    let synapse =  Structures[i].synapse_produced;
    let synapseProduced = (constructing * synapse);
    return synapseProduced;
  };

  //We need this to figure out what to display on the Structure List for our total produced Synapse
  //It's also used to calculate how much Synapse to add to our Final Status
  generateTotalSynapse() {
    let constructing = StructureInventory
    let totalSynapse = 0;
    for (let x = 0; x < constructing.length; x++) {
      let synapse = (constructing[x].constructing_count * Structures[x].synapse_produced);
      totalSynapse += synapse;
     };
    return totalSynapse;
  };

  //Everytime a new construction is planned, the Structure Inventory needs to take it into account
  handleUpdateConstructing = (x, i) => {
    UpdateConstructionOrders(x, i);
    this.forceUpdate();
  };

  //When the Player is happy with their selection the game needs to take all the costs and send them to the main screen
  setConstructionOrders() {
    const biomass = this.generateTotalCost();
    const synapse = this.generateTotalSynapse();
    this.props.setStructuresBiomass(biomass);
    this.props.setStructuresSynapse(synapse);
  };

  //Since their are several Structures able to be built, the Player must be able to cycle through their available options
  //This can be acheived mostly be changing the index value, however the extreme ends of the array need a different logic
  //'terminal' and 'start' are used to bring the index from last to first and vice versa, just in the case that no higher/lower index is available
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
    //the app needs to be told what structure to display, hence we use findStructure() to find our place in the Inventory
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