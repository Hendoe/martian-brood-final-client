import React, { Component } from 'react';
import Structure from '../Structure/Structure';
import './StructureConstructor.css';

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

  componentWillMount() {
    let constructables = this.props.structures.filter(structure => structure.constructable === true);
    this.setState({ constructables })
  };

  generateConstructing() {
    let i = this.state.current;
    return this.state.constructables[i].constructing_count;
  };

  generateCost() {
    let i = this.state.current;
    let constructing =  this.state.constructables[i].constructing_count;
    let cost = this.state.constructables[i].biomass_cost
    let structureCost = (constructing * cost)
    return structureCost;
  };

  generateTotalCost() {
    let constructing = this.state.constructables.filter(structure => structure.constructing_count > 0);
    let totalCost = 0;
    for (let i = 0; i < constructing.length; i++) {
      let construct = constructing[i]
      let cost = (construct.constructing_count * construct.biomass_cost);
      totalCost += cost;
     };
    return totalCost;
  };

  generateSynapse() {
    let i = this.state.current;
    let constructing =  this.state.constructables[i].constructing_count;
    let synapse =  this.state.constructables[i].synapse_produced;
    let synapseProduced = (constructing * synapse);
    return synapseProduced;
  };

  generateTotalSynapse() {
    let constructing = this.state.constructables.filter(structure => structure.constructing_count > 0);
    let totalSynapse = 0;
    for (let i = 0; i < constructing.length; i++) {
      let construct = constructing[i]
      let synapse = (construct.constructing_count * construct.synapse_produced);
      totalSynapse += synapse;
     };
    return totalSynapse;
  };

  addToConstruct() {
    let i = this.state.current;
    let constructCount = this.state.constructables[i].constructing_count;
    let newCount = (constructCount += 1);
    this.setState( prevState => {
      let newConstructing = prevState.constructables
        newConstructing[i].constructing_count = newCount;
        return {
          constructables: newConstructing
        }
    });
  };

  subtractToConstruct() {
    let i = this.state.current;
    let constructCount = this.state.constructables[i].constructing_count;
    if (constructCount === 0) {
      alert('You cannot construct less than 0 structures')
    } else {
      let newCount = (constructCount -= 1);
      this.setState( prevState => {
        let newConstructing = prevState.constructables
          newConstructing[i].constructing_count = newCount;
          return {
            constructables: newConstructing
          }
      });
    };
  };

  setConstructionOrders() {
    const toConstruct = this.state.constructables;
    let constructCounts = [];
      for (let i = 0; i < toConstruct.length; i++) {
        let count = {
          structure_name: toConstruct[i].structure_name,
          constructing_count: toConstruct[i].constructing_count
        };
        constructCounts.push(count);
      };
    const biomass = this.generateTotalCost();
    const synapse = this.generateTotalSynapse();
    this.props.setOrders(constructCounts);
    this.props.setStructuresBiomass(biomass);
    this.props.setStructuresSynapse(synapse);
  };

  findStructure(x) {
    let i = this.state.current;
    let constructables = this.state.constructables;
    if (x === 0) {
      if (i === 0) {
        let terminal = (constructables.length -1);
        for (let i = (terminal); i < constructables.length; i++) {
          this.setState({current: i});
            return constructables[i];
        };
      } else {
          let moveLeft = (i -= 1);
          for (let i = (moveLeft); i < constructables.length; i++) {
            this.setState({current: moveLeft});
              return constructables[i];
          };
      };
    } else if (x === 1) {
      if (i === constructables.length -1) {
        let start = 0;
        for (let i = (start); i < constructables.length; i++) {
          this.setState({current: start});
            return constructables[i];
        };
      } else {
          let moveRight = (i += 1);
          for (let i = (moveRight); i < constructables.length; i++) {
            this.setState({current: moveRight});
              return constructables[i];
          };
      };
    } else {
      let index = i
        for (let i = (index); i < constructables.length; i++) {
          return constructables[i];
      };
    };
  };

  render() {
    let structure = this.findStructure()

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
        <button className='builder-button' onClick={() => this.addToConstruct()}>+</button>
        <button className='builder-button' onClick={() => this.subtractToConstruct()}>-</button>
        <button className='builder-button' onClick={() => this.props.handleClick('cancel')}>CANCEL</button>
        <button className='arrow-button' onClick={() => this.findStructure(1)}>RIGHT</button>
      </div>
    </div>
    );
  };
};

export default StructureConstructor;