import React, { Component } from 'react';
import { FinalSpawning } from '../../stores/AlienInventory';
import { FinalConstructionOrders } from '../../stores/ConstructionOrders';
import ReportContext from '../../contexts/ReportContext';
import './Tasks.css';

class Tasks extends Component {
  static contextType = ReportContext

  //FinalSpawning and FinalConstructing are responsible for changing the Player's spawning/constructing counts to new Brood Counts
  //After those, we have to calculate our Biomass and Synapse with in-component functions
  //We must also be sure to update the Solar Day, to signify the end of the turn and beginning of the next
  //Last, set the Conditionals to display Reactions
  clickCommit = () => {
      //FinalSpawning();
      //FinalConstructionOrders();
      this.context.updateBroodCounts();
      this.finalBiomassCost();
      this.adjustSynapse();
      this.context.updateSolarDay();
      this.props.handleClick('reactions')
      console.log('TASK CONTENT', this.context);
  };

  //Here we determine exactly how much Biomass we need from the Aliens and the Structures
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

  //Now we determine how our new Synapse Distribution will be
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