import React, { Component } from 'react';
import Structure from '../Structure/Structure';
import './StructureConstructor.css';

class StructureConstructor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      structures: this.props.structures,
      structureCost: 0,
      structuresToConstruct: 0,
      structuresSynapse: 0,
    };
  };

  generateConstructing() {
    return this.state.structures[0].constructing_count;
  };

  generateCost() {
    let constructing =  this.state.structures[0].constructing_count;
    let cost = this.state.structures[0].biomass_cost
    let structureCost = (constructing * cost)
    return structureCost;
  };

  generateSynapse() {
    let constructing =  this.state.structures[0].constructing_count;
    let synapse =  this.state.structures[0].synapse_produced;
    let synapseProduced = (constructing * synapse);
    return synapseProduced;
  };

  addToConstruct() {
    let constructCount = this.state.structures[0].constructing_count;
    let newCount = (constructCount += 1);
    this.setState( prevState => {
      let newConstructing = prevState.structures[0]
        newConstructing.constructing_count = newCount;
        return {
          structures: [newConstructing]
        }
    });
  };

  subtractToConstruct() {
    let constructCount = this.state.structures[0].constructing_count;
    if (constructCount === 0) {
      alert('You cannot construct less than 0 structures')
    } else {
      let newCount = (constructCount -= 1);
      this.setState( prevState => {
        let newConstructing = prevState.structures[0]
          newConstructing.constructing_count = newCount;
          return {
            structures: [newConstructing]
          }
      });
    };
  };

  updateStructureCost(constructing) {
    let newCost = (20 * constructing);
    this.setState({structureCost: newCost})
  };

  setConstructionOrders() {
    const toConstruct = this.state.structures[0].constructing_count;
    const biomass = this.generateCost();
    const synapse = this.generateSynapse();
    this.props.setOrders(toConstruct);
    this.props.setStructuresBiomass(biomass);
    this.props.setStructuresSynapse(synapse);
  };


  // postOrders(orders) {
  //   return fetch(`${config.API_ENDPOINT}/constructionOrders`, {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       structure_name: orders.structure_name,
  //       total_to_construct: orders.totalToConstruct,
  //       biomass_cost: orders.biomass_cost
  //     }),
  //   })
  //     .then(res =>
  //       (!res.ok)
  //         ? res.json().then(e => Promise.reject(e))
  //         : res.json()
  //     )
  // };


  render() {
    const { structures } = this.props

    return (
      <div className='builder-box'>
        <h2>Structure Constructor</h2>
        <hr />
          {/* {structures.filter(constructableStructure => constructableStructure.constructable === true)
            .filter(constructingStructure => constructingStructure.constructing === true) */}
              {structures.map(structure => (
                <form>
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
                  <span className='row center'>
                    <p className='red'>COST: {this.generateCost()}</p>
                    <p className='red'>CONSTRUCTING: {this.generateConstructing()}</p>
                    <p className='GOLD'>SYNAPSE PRODUCED: {this.generateSynapse()}</p>
                  </span>
                </form>
              ))}
          <div className='buttons'>
            <button className='arrow-button' onClick={() => this.props.handleMoveLeft()} disabled>LEFT</button>
            <button className='builder-button' onClick={() => this.setConstructionOrders()}>CONSTRUCT</button>
            <button className='builder-button' onClick={() => this.addToConstruct()}>+</button>
            <button className='builder-button' onClick={() => this.subtractToConstruct()}>-</button>
            <button className='builder-button' onClick={() => this.props.handleClickCancel()}>CANCEL</button>
            <button className='arrow-button' onClick={() => this.props.handleMoveRight()} disabled>RIGHT</button>
          </div>
        </div>
    );
  };
};

export default StructureConstructor;