import React, { Component } from 'react';
import config from '../../config';
import './Tasks.css';

class Tasks extends Component {

  clickCommit = (event) => {
    event.preventDefault();
    this.finalSpawnPlan();
    // this.props.finalSpawning()
    // this.commitStatus();
    // let spawning = this.props.aliens.spawning_count
    // this.commitAliens(spawning);
  };

  finalSpawnPlan() {
    const spawning = this.props.aliens[0].spawning_count;
    // const biomass_cost = this.state.alienCost;
    // const synapse_required = this.state.aliensSynapse;
            // let newPlan = this.state.spawnPlan;
            // newPlan.total_to_spawn = toSpawn;
            // newPlan.biomass_cost = biomass_cost;
            // newPlan.synapse_required = synapse_required;
            // this.setState({spawnPlan: newPlan});
    this.props.finalSpawning(spawning);
  };

  commitStatus() {
    console.log(this.props)
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
    console.log(this.props)
    const { aliens } = this.props
    console.log(aliens)
    // {aliens.map( newAliens => (
    // fetch(config.API_ENDPOINT + `/commit/aliens`, {
    //   method: 'PATCH',
    //   body: JSON.stringify(newAliens),
    //   headers: {
    //     'content-type': 'application/json',
    //   },
    // })
    //   .then(res => {
    //     if (!res.ok)
    //       return res.json().then(error => Promise.reject(error))
    //   })
    //   .catch(error => {
    //   console.error(error)
    //   })
    // ))};
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
        <button className='builder-button' onClick={() => this.props.handleClickCancel()}>CANCEL</button>
        <button className='builder-button' onClick={(e) => this.clickCommit(e)}>COMMIT</button>
      </div>
    );
  };
};

export default Tasks;