import React, { Component } from 'react';
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
    const spawning = this.props.aliens[0].spawning_count;
    this.props.finalSpawning(spawning);
  };

  finalConstructionOrder() {
    const constructing = this.props.structures[0].constructing_count;
    this.props.finalOrders(constructing);
  };

  finalBiomassCost() {
    const aliensBiomass = this.props.aliensCost;
    const structuresBiomass = this.props.structuresCost;
    let totalBiomass = (aliensBiomass + structuresBiomass)
    if (totalBiomass > this.props.status[0].biomass) {
      alert('There is not enough Biomass available for your plans');
    } else {
      this.props.finalBiomass(totalBiomass);
      return 'true'
    };
  };

  adjustSynapse() {
    const synapseProduced = this.props.structuresSynapse;
    const synapseRequired = this.props.aliensSynapse;
    this.props.finalSynapse(synapseRequired, synapseProduced);
  };

  render() {
    return(
      <div class="builder-box-tasks">
        <h3>Task List</h3>
          <div className='task-row-1'>
            <span><button className='tasks'onClick={() => this.props.handleClickSpawner()}>Spawn Plans</button></span>
            <span><button className='tasks'>Gather Biomass</button></span>
            <span><button className='tasks' onClick={() => this.props.handleClickConstructor()}>Construction Orders</button></span>
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
        <button className='builder-button' onClick={() => this.props.handleClickCancel()}>CANCEL</button>
      </div>
    );
  };
};

export default Tasks;