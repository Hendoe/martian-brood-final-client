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

  //ALL FUNCTIONS FOR UPDATING PLAYER STATUS
  handleUpdateAlienCount() {
    Spawner.updateAlienCount();
  };

  handleClickSpawn = () => {
    this.setState({buildAliensMode: false});
    this.handleBuildModeChange();
  };

  handleClickCancel = () => {
    this.setState({buildAliensMode: false});
    this.setState({buildStructuresMode: false});
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
        <AlienSpawner aliens={this.state.aliens} handleClickSpawn={this.handleClickSpawn} updateTotalBiomass={this.updateTotalBiomass}
          handleClickCancel={this.handleClickCancel}
        />
      );
    } else if (this.state.buildStructuresMode === true) {
      return (
        <StructureConstructor structures={this.state.structures} handleClickConstruct={this.handleClickConstruct} 
          handleClickCancel={this.handleClickCancel}
        />
      );
    } else if (this.props.taskMode === true) {
      return (
        <Tasks aliens={this.state.aliens}
          handleClickCancel={this.handleCancelTasks} handleClickCommit={this.handleCommitTasks}/>
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
            <AlienList aliens={aliens} />
            <span>{this.renderSpawnerButton()}</span>
          </div>
          <div className='right alien-structures-box'>
            <h2>Structures</h2>
              <StructureList structures={structures} />
              <span>{this.renderConstructorButton()}</span>
          </div>
          <div>{this.renderBuilders()}</div>
        </section>
      </div>
    )
  };
};

export default GameplayScreen;