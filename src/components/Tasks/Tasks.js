import React, { Component } from 'react';
import ReportContext from '../../contexts/ReportContext';
import './Tasks.css';

class Tasks extends Component {
  static contextType = ReportContext

  //Once a player commits their choices we must first ascertain what type of Commit they are making
  //Then we need to gather details about the Biomass and Synapse Costs associated with their Commit
  //With those figured, we can go to context and update
  //From there, context will handle the rest of the end of turn process
  //But we still need to change our conditionals and reset our costs, since the old ones have already been sent away
  clickCommit = (type) => {
      let finalBiomassCost = this.finalBiomassCost(type);
      let producedSynapse = this.findProducedSynapse(type);
      let requiredSynapse = this.findRequiredSynapse(type);
      this.context.updateBroodCounts(type);
      this.context.masterStatusUpdater(finalBiomassCost, producedSynapse, requiredSynapse);
      this.props.handleClick('loading');
      this.props.resetCosts(type);
  };

  //Here we determine exactly how much Biomass we need to produce more Aliens or Structures
  //Our clickCommit() takes this return and passes it along to our context to update the state there
  finalBiomassCost(type) {
    if (type === 'spawning') {
      const aliensBiomass = this.props.aliensCost;
      return aliensBiomass;
    } else if (type === 'constructing') {
      const structuresBiomass = this.props.structuresCost;
      return structuresBiomass;
    } else if (type === 'both') {
      const aliensBiomass = this.props.aliensCost;
      const structuresBiomass = this.props.structuresCost;
      const finalBiomassCost = (aliensBiomass + structuresBiomass);
      return finalBiomassCost;
    } else {
      return 0;
    };
  };

  //Now we calculate what our new Synapse Distribution will be, in a process fairly similar to what we used for determining the Biomass exchange
  //However, Biomass is a single cost, Synapse is two values competing. So we have to use two functions here, one for Producing and one for Requiring
  findProducedSynapse(type) {
    if (type === 'constructing') {
      const synapseProduced = this.props.structuresSynapse;
      return synapseProduced
    } else {
      return 0;
    };
  };
  findRequiredSynapse(type) {
    if (type === 'spawning') {
      const synapseRequired = this.props.aliensSynapse;
      return synapseRequired
    } else {
      return 0;
    };
  };

  //All of the line breaks <br /> are a neccessary evil until the CSS is improved
  render() {
    return(
      <div className="builder-box-tasks">
        <h3>Task List</h3>
          <h4 className='subtitle'>The Brood can only focus on one task a day.</h4>
            <div className='task-column-1'>
              <span>
                <button className='tasks' onClick={() => this.clickCommit('spawning')}>Spawn</button>
                <p>Focus on spawning additonal aliens</p>  
              </span>
              <span>
                <button className='tasks' onClick={() => this.clickCommit('gathering')}>Gather Biomass</button>
                <p>Gather Biomass to grow the Brood</p>  
              </span>
              <span>
                <button className='tasks' onClick={() => this.clickCommit('constructing')}>Construct</button>
                <p>Create new structures</p>  
              </span>
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