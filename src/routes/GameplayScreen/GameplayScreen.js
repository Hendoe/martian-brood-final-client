import React, { Component } from 'react';
import config from '../../config';
import Spawner from '../../helpers/Spawner';
import AlienList from '../../components/AlienList/AlienList';
import StructureList from '../../components/StructureList/StructureList';
import AlienSpawner from '../../components/AlienSpawner/AlienSpawner';
import StructureConstructor from '../../components/StructureConstructor/StructureConstructor';
import TaskFooter from '../../components/TaskFooter/TaskFooter';
import Tasks from '../../components/Tasks/Tasks';
import './GameplayScreen.css';

class GameplayScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buildMode: false,
      taskMode: false,
      spawnAliensMode: false,
      constructStructuresMode: false,
      commitTasksMode: false,
      status: [],
      aliens: [],
      structures: [],
    };
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/status`)
    ])
      .then(([statusRes]) => {
        if (!statusRes.ok)
          return statusRes.json().then(event => Promise.reject(event))
        return Promise.all([
          statusRes.json(),
        ])
      })
      .then(([status]) => {
        this.setState({ status })
      })
      .catch(error => {
        console.log({error})
      })

    Promise.all([
      fetch(`${config.API_ENDPOINT}/aliens`)
    ])
      .then(([aliensRes]) => {
        if (!aliensRes.ok)
          return aliensRes.json().then(event => Promise.reject(event))
        return Promise.all([
          aliensRes.json(),
        ])
      })
      .then(([aliens]) => {
        this.setState({ aliens })
      })
      .catch(error => {
        console.log({error})
      })

      Promise.all([
        fetch(`${config.API_ENDPOINT}/structures`)
      ])
        .then(([structuresRes]) => {
          if (!structuresRes.ok)
            return structuresRes.json().then(event => Promise.reject(event))
          return Promise.all([
            structuresRes.json(),
          ])
        })
        .then(([structures]) => {
          this.setState({ structures })
        })
        .catch(error => {
          console.log({error})
        })

  };

  //ALL HANDLERS FOR CONDITIONAL CHANGES
  handleBuildModeChange = () => {
    if (this.state.buildMode === true) {
      this.setState({buildMode: false})
    } else if (this.state.buildMode === false) {
      this.setState({buildMode: true})
    };
  };

  handleTaskModeChange = () => {
    if (this.state.taskMode === true) {
      this.setState({taskMode: false})
    } else if (this.state.taskMode === false) {
      this.setState({taskMode: true})
    };
  };

  handleClickAlienSpawner = () => {
    this.setState({spawnAliensMode: true});
    this.handleBuildModeChange();
  };

  //ALL FUNCTIONS FOR UPDATING PLAYER STATUS
  handleUpdateAlienCount() {
    Spawner.updateAlienCount();
  };

  handleClickSpawn = () => {
    this.setState({spawnAliensMode: false});
    this.handleBuildModeChange();
  };

  handleClickCancel = () => {
    this.setState({spawnAliensMode: false});
    this.setState({constructStructuresMode: false});
    this.handleBuildModeChange();
  };

  //ALL HANDLERS FOR STRUCTURE CONSTRUCTION
  handleClickStructureConstructor = () => {
    this.setState({constructStructuresMode: true});
    this.handleBuildModeChange();
  };

  handleClickConstruct = () => {
    this.setState({constructStructuresMode: false});
    this.handleBuildModeChange();
  };

  handleCommitTasks = () => {
    this.handleTaskModeChange();
    this.handleUpdateTotalBiomass();
    this.handleUpdateAlienCount();
  };

  //FUNCTIONS FOR RENDERING
  renderSpawnerButton() {
    if (this.state.buildMode === true || this.state.taskMode === true) {
      return (<button className='build-aliens-button' disabled>Spawn Aliens</button>);
    } else {
      return (<button className='build-aliens-button' onClick={() => this.handleClickAlienSpawner()}>Spawn Aliens</button>);
    };
  };

  renderConstructorButton() {
    if (this.state.buildMode === true || this.state.taskMode === true) {
      return (<button className='build-structures-button' disabled>Build Alien Stuctures</button>);
    } else {
      return (<button className='build-structures-button' onClick={() => this.handleClickStructureConstructor()}>Build Alien Stuctures</button>);
    };
  };

  renderTaskButton() {
    if (this.state.buildMode === true || this.state.taskMode === true) {
      return (
        <button className='task-button' disabled>Set Tasks</button>
      )
    } else {
      return (
        <button className='task-button' onClick={() =>  this.handleTaskModeChange()}>Set Tasks</button>
      );
    };
  };

  renderBuilders() {
    if (this.state.spawnAliensMode === true) {
      return (
        <AlienSpawner aliens={this.state.aliens} handleClickSpawn={this.handleClickSpawn}
          handleClickCancel={this.handleClickCancel}
        />
      );
    } else if (this.state.constructStructuresMode === true) {
      return (
        <StructureConstructor structures={this.state.structures} handleClickConstruct={this.handleClickConstruct} 
          handleClickCancel={this.handleClickCancel}
        />
      );
    } else if (this.state.taskMode === true) {
      return (
        <Tasks handleClickAlienSpawner={this.handleClickAlienSpawner()} handleClickStructureConstructor={this.handleClickStructureConstructor()} 
          handleClickCancel={this.handleClickCancel()} handleClickCommit={this.handleCommitTasks}/>
      );
    } else {
      return
    }
  };

  render() {
    const { status, aliens, structures } = this.state

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
            <AlienList aliens={aliens} status={status} />
            <span>{this.renderSpawnerButton()}</span>
          </div>
          <div className='right alien-structures-box'>
            <h2>Structures</h2>
              <StructureList structures={structures} />
              <span>{this.renderConstructorButton()}</span>
          </div>
          <div>{this.renderBuilders()}</div>
        </section>
        <footer>{this.renderTaskButton()}</footer>
      </div>
    )
  };
};

export default GameplayScreen;