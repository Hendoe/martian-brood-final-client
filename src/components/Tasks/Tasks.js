import React, { Component } from 'react';
import ReportContext from '../../contexts/ReportContext';
import './Tasks.css';

class Tasks extends Component {
  static contextType = ReportContext

  //Once a player commits their choices we need to gather details about the Biomass and Synapse Costs associated with them
  //With those figured, we can go to context and update
  //From there, context will handle the rest of the end of turn process
  //But we still need to change our conditionals and reset our costs, since the old ones have already been sent away
  clickCommit = () => {
      let finalBiomassCost = this.finalBiomassCost();
      let producedSynapse = this.findProducedSynapse();
      let requiredSynapse = this.findRequiredSynapse();
      this.context.updateBroodCounts();
      this.context.masterStatusUpdater(finalBiomassCost, producedSynapse, requiredSynapse);
      this.props.handleClick('loadings')
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

  //Now we calculate what our new Synapse Distribution will be, in a process fairly similar to what we used for determining the Biomass exchange
  //However, Biomass is a single cost, Synapse is two values competing. So we have to use two functions here, one for Producing and one for Requiring
  findProducedSynapse() {
    const synapseProduced = this.props.structuresSynapse;
   return synapseProduced
  };
  findRequiredSynapse() {
    const synapseRequired = this.props.aliensSynapse;
   return synapseRequired
  };

  //All of the line breaks <br /> are a neccessary evil until the CSS is improved
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