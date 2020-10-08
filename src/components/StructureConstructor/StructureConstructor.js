import React, { Component } from 'react';
import config from '../../config';
import Structure from '../Structure/Structure';
import './StructureConstructor.css';

class StructureConstructor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      structureCost: 0,
      structuresToConstruct: 0,
      constructionOrders: {
        structure_name: 'Warrior Drone',
        totalToConstruct: 0,
        biomass_cost: 0,
        synapse_produced: 0
      },
    };
  };

  addToConstruct() {
    let constructing = this.state.structuresToConstruct
    constructing += 1;
    this.setState({structuresToConstruct: constructing});
    this.updateStructureCost(constructing);
  };

  subtractToConstruct() {
    let constructing = this.state.structuresToConstruct;
    if (constructing === 0) {
      alert('You cannot construct less than 0 structures')
    } else {
        constructing -= 1;
    };
    this.setState({structuresToConstruct: constructing});
    this.updateStructureCost(constructing);
  };

  updateStructureCost(constructing) {
    let newCost = (20 * constructing);
    this.setState({structureCost: newCost})
  };

  setConstructionOrders() {
    const biomass_cost = this.state.structureCost;
    const toSpawn = this.state.structuresToConstruct;
    let newPlan = this.state.constructionOrders;
    newPlan.totalToConstruct = toSpawn;
    newPlan.biomass_cost = biomass_cost;
    this.setState({constructionOrders: newPlan});
    this.postOrders();
  };


  postOrders(orders) {
    return fetch(`${config.API_ENDPOINT}/constructionOrders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        structure_name: orders.structure_name,
        total_to_construct: orders.totalToConstruct,
        biomass_cost: orders.biomass_cost
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  };


  render() {
    const { structures } = this.props
    const { structuresToConstruct, structureCost } = this.state
        
    return (
      <div className='builder-box'>
        <h2>Structure Constructor</h2>
        <hr />
          {structures.filter(constructableStructure => constructableStructure.constructable === true)
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
          <span className='row center'>
            <p className='red'>COST: {structureCost}</p>
            <p className='red'>CONSTRUCTING: {structuresToConstruct}</p>
          </span>
          <div className='buttons'>
            <button className='arrow-button' onClick={() => this.props.handleMoveLeft()} disabled>LEFT</button>
            <button className='builder-button' onClick={() => this.props.handleConstruct()}>CONSTRUCT</button>
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