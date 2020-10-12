import React, { Component } from 'react';
import { AlienInventory, FinalSpawning } from '../../stores/AlienInventory';
import './Tasks.css';

class Tasks extends Component {
  clickCommit = () => {
      this.finalSpawnPlan();
      this.finalConstructionOrder();
      this.finalBiomassCost();
      this.adjustSynapse();
      this.props.updateSolarDay();
  };

  finalSpawnPlan() {
    FinalSpawning();
  };

  finalConstructionOrder() {
    const constructing = this.props.structures;
    let constructCounts = [];
      for (let i = 0; i < constructing.length; i++) {
        let count = {
          structure_name: constructing[i].structure_name,
          constructing_count: constructing[i].constructing_count
        };
        constructCounts.push(count);
      };
    this.props.finalOrders(constructCounts);
  };

  finalBiomassCost() {
    const aliensBiomass = this.props.aliensCost;
    const structuresBiomass = this.props.structuresCost;
    let totalBiomass = (aliensBiomass + structuresBiomass)
    if (totalBiomass > this.props.status[0].biomass) {
      alert('There is not enough Biomass available for your plans');
    } else {
      this.props.finalBiomass(aliensBiomass);
      this.props.finalStructuresBiomass(structuresBiomass);
    };
  };

  adjustSynapse() {
    const synapseProduced = this.props.structuresSynapse;
    const synapseRequired = this.props.aliensSynapse;
    this.props.finalSynapse(synapseRequired, synapseProduced);
  };

  render() {
    return(
      <div className="builder-box-tasks">
        <h3>Task List</h3>
          <div className='task-row-1'>
            <span><button className='tasks'onClick={() => this.props.handleClick('spawning')}>Spawn Plans</button></span>
            <span><button className='tasks'>Gather Biomass</button></span>
            <span><button className='tasks' onClick={() => this.props.handleClick('constructing')}>Construction Orders</button></span>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        <button className='builder-button' onClick={() => this.clickCommit()}>COMMIT</button>
        <button className='builder-button' onClick={() => this.props.handleClick('cancelTasks')}>CANCEL</button>
      </div>
    );
  };
};

export default Tasks;