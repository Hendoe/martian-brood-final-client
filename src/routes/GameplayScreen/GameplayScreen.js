import React, { Component } from 'react';
import config from '../../config';
import AlienList from '../../components/AlienList/AlienList';
import StructureList from '../../components/StructureList/StructureList';
import AlienSpawner from '../../components/AlienSpawner/AlienSpawner';
import StructureConstructor from '../../components/StructureConstructor/StructureConstructor';
import Tasks from '../../components/Tasks/Tasks';
import Reactions from '../../components/Reactions/Reactions';
import './GameplayScreen.css';

class GameplayScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableButtons: false,
      spawnMode: false,
      constructMode: false,
      taskMode: false,
      status: [],
      aliens: [],
      aliensCost: 0,
      aliensSynapse: 0,
      structures: [],
      structuresCost: 0,
      structuresSynapse: 0,
      reactionsSpawn: 0,
      reactionsConstruct: 0
    };
  };


  //GET OUR DATABASES
  componentDidMount() {
    this.GETmaster();
  };

  //GETS IT
  GETmaster() {
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

  runGET = () => {
    this.GETmaster();
 };

  //CHANGING THE CONDITIONALS
  handleChangeCondition(changing) {
    if (changing === 'spawning') {
      this.setState({disableButtons: true});
      this.setState({spawnMode: true});
      this.setState({constructMode: false});
    } else if (changing === 'constructing') {
      this.setState({disableButtons: true});
      this.setState({spawnMode: false});
      this.setState({constructMode: true});
    } else if (changing === 'tasks') {
      this.setState({disableButtons: true});
      this.setState({spawnMode: false});
      this.setState({constructMode: false});
      this.setState({taskMode: true});
    } else if (changing === 'reactions') {
      this.setState({disableButtons: true});
      this.setState({spawnMode: false});
      this.setState({constructMode: false});
      this.setState({taskMode: false});
      this.setState({reactionMode: true});
    }else if (changing === 'cancel') {
      this.setState({disableButtons: false});
      this.setState({spawnMode: false});
      this.setState({constructMode: false});
      this.setState({taskMode: false});
      this.setState({reactionMode: false});
    } else {
      alert('check your conditionals');
    };
  };

  handleClickSpawner = () => {
    let changing = 'spawning';
    this.handleChangeCondition(changing);
  };

  handleClickConstructor = () => {
    let changing = 'constructing';
    this.handleChangeCondition(changing);
  };

  handleClickTasks = () => {
    let changing = 'tasks';
    this.handleChangeCondition(changing);
  };

  handleClickCommit = () => {
    let changing = 'reactions';
    this.handleChangeCondition(changing);
  };

  handleClickCancel = () => {
    let changing = 'cancel';
    this.handleChangeCondition(changing);
  };

  //UPDATE PLAYER STATUS
  //SOLAR DAY
  updateSolarDay = () => {
    this.setState( prevState => {
      let newDay = prevState.status[0]
        newDay.solar_day += 1;
        return {
          status: [newDay]
        }
      });
  };

  //SPAWNING
  setSpawns = (toSpawn) => {
    this.setState( prevState => {
      let toSpawnAlien = prevState.aliens[0]
        toSpawnAlien.spawning_count = toSpawn;
        return {
          aliens: [toSpawnAlien]
        }
      });
    this.handleClickCancel();
  };

  resetSpawns() {
    this.setState( prevState => {
      let zeroAlien = prevState.aliens[0]
        zeroAlien.spawning_count = 0;
        return {
          aliens: [zeroAlien]
        }
      });
      this.handleClickCommit();
  };

  reactionsSpawn(spawning) {
    this.setState({reactionsSpawn: spawning})
  };

  finalSpawning = (spawning) => {
    console.log('spawn')
    this.setState( prevState => {
      let spawningAlien = prevState.aliens[0]
        spawningAlien.brood_count += spawning;
        return {
          aliens: [spawningAlien]
        }
      });
    this.reactionsSpawn(spawning);
    this.resetSpawns();
  };

  //CONSTRUCTING
  setOrders = (orders) => {
    this.setState( prevState => {
      let toConstructStructure = prevState.structures[0]
        toConstructStructure.constructing_count = orders;
        return {
          structures: [toConstructStructure]
        }
      });
    this.handleClickCancel();
  };

  reactionsConstruct(constructing) {
    this.setState({reactionsConstruct: constructing})
  };

  //BIOMASS COSTS
  setBiomass = (biomass) => {
    this.setState({aliensCost: biomass});
  };

  resetBiomass() {
    this.setState({aliensCost: 0});
  };

  finalBiomass = (biomass) => {
    this.setState( prevState => {
      let newStatus = prevState.status[0]
        newStatus.biomass -= biomass;
        return {
          status: [newStatus]
        }
      });
    this.resetBiomass();
  };

  setStructuresBiomass = (biomass) => {
    this.setState({structuresCost: biomass});
  };

  resetStructuresBiomass() {
    this.setState({structuresCost: 0});
  };

  finalStructuresBiomass = (biomass) => {
    this.setState( prevState => {
      let newStatus = prevState.status[0]
        newStatus.biomass -= biomass;
        return {
          status: [newStatus]
        }
      });
    this.resetStructuresBiomass();
  };

  //SYNAPSE DISTRIBUTION
  setSynapse = (synapse) => {
    this.setState({aliensSynapse: synapse});
  };

  setStructuresSynapse = (synapse) => {
    this.setState({structuresSynapse: synapse});
  };

  resetSynapses() {
    this.setState({aliensSynapse: 0});
    this.setState({structuresSynapse: 0});
  };

  finalSynapse = (required, produced) => {
    this.setState( prevState => {
      let newStatus = prevState.status[0]
        newStatus.synapse_required += required;
        newStatus.synapse_produced += produced;
        return {
          status: [newStatus]
        }
      });
    this.resetSynapses();
  };

  //RENDERING FUNCTIONS
  renderSpawnerButton() {
    if (this.state.disableButtons === true) {
      return (<button className='build-aliens-button' disabled>Spawn Aliens</button>);
    } else {
      return (<button className='build-aliens-button' onClick={() => this.handleClickSpawner()}>Spawn Aliens</button>);
    };
  };

  renderConstructorButton() {
    if (this.state.disableButtons === true) {
      return (<button className='build-structures-button' disabled>Build Alien Stuctures</button>);
    } else {
      return (<button className='build-structures-button' onClick={() => this.handleClickConstructor()}>Build Alien Stuctures</button>);
    };
  };

  renderTaskButton() {
    if (this.state.disableButtons === true) {
      return (<button className='task-button' disabled>Set Tasks</button>)
    } else {
      return (<button className='task-button' onClick={() =>  this.handleClickTasks()}>Set Tasks</button>);
    };
  };

  renderBuilders() {
    if (this.state.spawnMode === true) {
      return (
        <AlienSpawner aliens={this.state.aliens} setSpawns={this.setSpawns} setBiomass={this.setBiomass}
        setSynapse={this.setSynapse} handleClickCancel={this.handleClickCancel}
        />
      );
    } else if (this.state.constructMode === true) {
      return (
        <StructureConstructor structures={this.state.structures} setStructuresBiomass={this.setStructuresBiomass} setOrders={this.setOrders}
         setStructuresSynapse={this.setStructuresSynapse} handleClickCancel={this.handleClickCancel}
        />
      );
    } else if (this.state.taskMode === true) {
      return (
        <Tasks status={this.state.status} aliens={this.state.aliens} aliensCost={this.state.aliensCost} structuresCost={this.state.structuresCost}
          aliensSynapse={this.state.aliensSynapse} structuresSynapse={this.state.structuresSynapse} updateSolarDay={this.updateSolarDay} 
            finalSpawning={this.finalSpawning} finalBiomass={this.finalBiomass} finalSynapse={this.finalSynapse}
              handleClickSpawner={this.handleClickSpawner} handleClickConstructor={this.handleClickConstructor} 
                handleClickCancel={this.handleClickCancel} GETmaster={this.runGET}
        />
      );
    } else if (this.state.reactionMode === true) {
      return (
        <Reactions status={this.state.status} aliens={this.state.aliens} reactionsSpawn={this.state.reactionsSpawn}
            handleClickCancel={this.handleClickCancel}
        />
      );
    } else {
      return
    }
  };

  //MAIN RENDER
  render() {
    const { status, aliens, structures, aliensCost, aliensSynapse, structuresCost, structuresSynapse } = this.state

    return (
      <div>
        {status.map(report => (
          <header className='status-bar'>
            <span className='left'>
              <h4>Biomass: {report.biomass}</h4>
            </span>
            <span className='center'>
              <h3>Brood Name: {report.brood_name}</h3>
              <h3>Solar Day: {report.solar_day}</h3>
            </span>
            <span className='right'>
              <span>
                <h4>Synapse:</h4>
                <p className='orange'>{report.synapse_required}</p>
                <p className='gold'>{report.synapse_produced}</p>
              </span>
            </span>
          </header>
        ))}
        <section className='gameplay-style reaction-mode'>
          <div className='left aliens-box'>
          <h2>Aliens</h2>
            <AlienList aliens={aliens} status={status} aliensCost={aliensCost} aliensSynapse={aliensSynapse} />
            <span>{this.renderSpawnerButton()}</span>
          </div>
          <div className='right alien-structures-box'>
          <h2>Structures</h2>
            <StructureList structures={structures} status={status} structuresCost={structuresCost} structuresSynapse={structuresSynapse} />
            <span>{this.renderConstructorButton()}</span>
          </div>
          <div>{this.renderBuilders()}</div>
        </section>
        <footer>
          <span>{this.renderTaskButton()}</span>
        </footer>
      </div>
    )
  };
};

export default GameplayScreen;