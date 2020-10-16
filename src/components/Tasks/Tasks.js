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
  //Last, set the Conditionals to display Reactions, as well as reseting our Costs and Synapse Distribution
  clickCommit = () => {
      let finalBiomassCost = this.finalBiomassCost();
      let producedSynapse = this.findProducedSynapse();
      let requiredSynapse = this.findRequiredSynapse();
      console.log('HOWS SHE LOOKING', producedSynapse, requiredSynapse)
      this.context.updateBroodCounts();
      this.context.masterStatusUpdater(finalBiomassCost, producedSynapse, requiredSynapse);
      this.props.handleClick('reactions')
      this.props.resetCosts();
  };

  //Here we determine exactly how much Biomass we need to produce more Aliens and Structures
  //Our clickCommit() takes this return and passes it along to our context to update the state there
  finalBiomassCost() {
    const aliensBiomass = this.props.aliensCost;
    const structuresBiomass = this.props.structuresCost;
    let finalBiomassCost = (aliensBiomass + structuresBiomass);
    return finalBiomassCost;
  };

  //Now we determine how our new Synapse Distribution will be, in a process fairly similar to what we used for determining the Biomass exchange
  //However, Biomass is a single cost, Synapse is two values competing. So we have to use two functions here, one for Producing and one for Requiring
  findProducedSynapse() {
    const synapseProduced = this.props.structuresSynapse;
   return synapseProduced
  };
  findRequiredSynapse() {
    const synapseRequired = this.props.aliensSynapse;
   return synapseRequired
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