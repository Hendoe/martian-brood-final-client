import React, { Component } from 'react';
import { FinalSpawning } from '../../stores/AlienInventory';
import { FinalConstructing } from '../../stores/StructureInventory';
import './Tasks.css';

class Tasks extends Component {
  clickCommit = () => {
      FinalSpawning();
      FinalConstructing();
      this.finalBiomassCost();
      this.adjustSynapse();
      this.props.updateSolarDay();
  };

  finalBiomassCost() {
    const aliensBiomass = this.props.aliensCost;
    const structuresBiomass = this.props.structuresCost;
    // let totalBiomass = (aliensBiomass + structuresBiomass)
    // if (totalBiomass > this.props.status[0].biomass) {
    //   alert('There is not enough Biomass available for your plans');
    // } else {
      this.props.finalAliensBiomass(aliensBiomass);
      this.props.finalStructuresBiomass(structuresBiomass);
    // };
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
            <span><button className='tasks' disabled>Gather Biomass</button></span>
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