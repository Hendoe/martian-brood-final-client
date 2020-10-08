import React, { Component } from 'react';
import config from '../../config';
import Status from '../../local-stores/Status';
import Aliens from '../../local-stores/Aliens';
import Structures from '../../local-stores/Structures';
import Spawner from '../../helpers/Spawner';
import AlienList from '../../components/AlienList/AlienList';
import StructureList from '../../components/StructureList/StructureList';
import AlienSpawner from '../../components/AlienSpawner/AlienSpawner';
import StructureConstructor from '../../components/StructureConstructor/StructureConstructor';
import Tasks from '../../components/Tasks/Tasks';
import './GameplayScreen.css';

class GameplayScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buildAliensMode: false,
      buildStructuresMode: false,
      status: Status,
      aliens: Aliens,
      structures: Structures
    };
  };

  //ALL HANDLERS FOR CONDITIONAL CHANGES
  handleBuildModeChange() {
    this.props.buildModeChange();
  };

  handleTaskModeChange() {
    this.props.taskModeChange();
  };

  handleClickAlienSpawner = () => {
    this.setState({buildAliensMode: true});
    this.handleBuildModeChange();
  };

  //ALL HANDLER FOR UPDATING PLAYER STATUS
  handleUpdateTotalBiomass() {
    Spawner.updateTotalBiomass();
  };

  handleUpdateAlienCount() {
    Spawner.updateAlienCount();
  };

  handleClickSpawn = () => {
    this.setState({buildAliensMode: false});
    this.handleBuildModeChange();
  };

  //ALL HANDLERS FOR STRUCTURE CONSTRUCTION
  handleClickStructureBuilder = () => {
    this.setState({buildStructuresMode: true});
    this.handleBuildModeChange();
  };

  handleClickConstruct = () => {
    this.setState({buildStructuresMode: false});
    this.handleBuildModeChange();
  };

  //ALL HANDLERS FOR TASKS
  handleCancelTasks = () => {
    this.handleTaskModeChange();
  };

  handleCommitTasks = () => {
    this.handleTaskModeChange();
    this.handleUpdateTotalBiomass();
    this.handleUpdateAlienCount();
  };

  //FUNCTIONS FOR RENDERING
  renderSpawnerButton() {
    if (this.props.buildMode === true || this.props.taskMode === true) {
      return (<button className='build-aliens-button' disabled>Spawn Aliens</button>);
    } else {
      return (<button className='build-aliens-button' onClick={() => this.handleClickAlienSpawner()}>Spawn Aliens</button>);
    };
  };

  renderConstructorButton() {
    if (this.props.buildMode === true || this.props.taskMode === true) {
      return (<button className='build-structures-button' disabled>Build Alien Stuctures</button>);
    } else {
      return (<button className='build-structures-button' onClick={() => this.handleClickStructureBuilder()}>Build Alien Stuctures</button>);
    };
  };

  renderTasksButton() {
    if (this.props.buildMode === true || this.props.taskMode === true) {}
  };

  renderBuilders() {
    if (this.state.buildAliensMode === true) {
      return (
        <AlienSpawner aliens={Aliens} handleClickSpawn={this.handleClickSpawn}
        />
      );
    } else if (this.state.buildStructuresMode === true) {
      return (
        <StructureConstructor structures={Structures} handleClickConstruct={this.handleClickConstruct} />
      );
    } else if (this.props.taskMode === true) {
      return (
        <Tasks aliens={this.context.aliens}
          handleClickCancel={this.handleCancelTasks} handleClickCommit={this.handleCommitTasks}/>
      );
    } else {
      return
    }
  };

  render() {
    const { status } = this.state

    return (
      <div>
        {status.map(report => (
          <header className='status-bar'>
            <span className='left'>
              <h4>Biomass: {report.biomass}</h4>
            </span>
            <span className='center'>
              <h3>Brood Name: {report.brood_name}</h3>
            </span>
            <span className='right'>
              <h4>Synapse: {report.synapse}</h4>
            </span>
          </header>
        ))}
        <section className='gameplay-style reaction-mode'>
          <div className='left aliens-box'>
          <h2>Aliens</h2>
            <AlienList aliens={Aliens} />
            <span>{this.renderSpawnerButton()}</span>
          </div>
          <div className='right alien-structures-box'>
            <h2>Structures</h2>
              <StructureList structures={Structures} />
              <span>{this.renderConstructorButton()}</span>
          </div>
          <div>{this.renderBuilders()}</div>
        </section>
      </div>
    )
  };
};

export default GameplayScreen;