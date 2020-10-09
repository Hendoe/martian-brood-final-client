import React, { Component } from 'react';
import config from '../../config';
import './Tasks.css';

class Tasks extends Component {
  clickCommit = () => {
      this.finalSpawnPlan();
      this.finalBiomassCost();
      this.adjustSynapse();
      this.props.updateSolarDay();
      this.POSTmaster();
      this.runGET();
  };

  finalSpawnPlan() {
    const spawning = this.props.aliens[0].spawning_count;
    this.props.finalSpawning(spawning);
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

  POSTmaster() {
    this.commitStatus();
    this.commitAliens();
    this.commitStructures();
  };
    
  commitStatus() {
    const { status } = this.props
    status.map( newStatus => (
      fetch(config.API_ENDPOINT + `/commit/status`, {
        method: 'PATCH',
        body: JSON.stringify(newStatus),
        headers: {
          'content-type': 'application/json',
        },
      })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
      })
      .catch(error => {
        console.error(error)
      })
    ));
  };

  commitAliens() {
    const { aliens } = this.props
    aliens.map( newAliens => (
      fetch(config.API_ENDPOINT + `/commit/aliens`, {
        method: 'PATCH',
        body: JSON.stringify(newAliens),
        headers: {
          'content-type': 'application/json',
        },
      })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
      })
      .catch(error => {
        console.error(error)
      })
    ))
  };

  commitStructures() {
    const { structures } = this.props
    structures.map( newStatus => (
      fetch(config.API_ENDPOINT + `/commit/structures`, {
        method: 'PATCH',
        body: JSON.stringify(newStatus),
        headers: {
          'content-type': 'application/json',
        },
      })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
      })
      .catch(error => {
        console.error(error)
      })
    ));
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