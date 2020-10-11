import React, { Component } from 'react';
import config from '../../config';
import Aliens from '../../stores/Aliens';
import { Conditionals, handleChangeCondition} from '../../stores/Conditionals';
import AlienList from '../../components/AlienList/AlienList';
import AlienSpawner from '../../components/AlienSpawner/AlienSpawner';
import Structures from '../../stores/Structures';
import StructureList from '../../components/StructureList/StructureList';
import StructureConstructor from '../../components/StructureConstructor/StructureConstructor';
import Status from '../../stores/Status';
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
      status: Status,
      aliens: Aliens,
      aliensCost: 0,
      aliensSynapse: 0,
      structures: Structures,
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

  // //CHANGING THE CONDITIONALS
  // handleChangeCondition(changing) {
  //   if (changing === 'spawning') {
  //     this.setState({disableButtons: true});
  //     this.setState({spawnMode: true});
  //     this.setState({constructMode: false});
  //   } else if (changing === 'constructing') {
  //     this.setState({disableButtons: true});
  //     this.setState({spawnMode: false});
  //     this.setState({constructMode: true});
  //   } else if (changing === 'tasks') {
  //     this.setState({disableButtons: true});
  //     this.setState({spawnMode: false});
  //     this.setState({constructMode: false});
  //     this.setState({taskMode: true});
  //   } else if (changing === 'reactions') {
  //     this.setState({disableButtons: true});
  //     this.setState({spawnMode: false});
  //     this.setState({constructMode: false});
  //     this.setState({taskMode: false});
  //     this.setState({reactionMode: true});
  //   }else if (changing === 'cancel') {
  //     this.setState({disableButtons: false});
  //     this.setState({spawnMode: false});
  //     this.setState({constructMode: false});
  //     this.setState({taskMode: false});
  //     this.setState({reactionMode: false});
  //   } else {
  //     alert('check your conditionals');
  //   };
  // };

  handleClick = (type) => {
    handleChangeCondition(type);
    this.forceUpdate();
  };

  //UPDATE PLAYER STATUS
  //SOLAR DAY
  updateSolarDay = () => {
    this.setState( prevState => {
      let newDay = prevState.status[0]
        newDay.solar_day = (newDay.solar_day += 1);
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
    this.handleClick('cancel');
  };

  resetSpawns() {
    this.setState( prevState => {
      let zeroAlien = prevState.aliens[0]
        zeroAlien.spawning_count = 0;
        return {
          aliens: [zeroAlien]
        }
      });
      this.handleClick('reactions');
  };

  finalSpawning = (spawning) => {
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

  reactionsSpawn(spawning) {
    this.setState({reactionsSpawn: spawning})
  };

  //CONSTRUCTING
  setOrders = (orders) => {
    this.setState( prevState => {
      let toConstructStructures = prevState.structures;
      let newOrders = orders.filter(structure => structure.constructing_count > 0);
      let filtered = toConstructStructures.filter(structure => structure.constructing_count > 0);
      for (let i = 0; i < newOrders.length; i ++) {
        filtered[i].constructing_count = newOrders[i].constructing_count;
      };
    });
    this.handleClick('cancel');
  };

  resetOrders() {
    this.setState( prevState => {
      let zeroStructure = prevState.structures;
        for (let i = 0; i < zeroStructure.length; i++) {
          zeroStructure[i].constructing_count = 0;
        };
        return {
          structures: zeroStructure
        };
      });
      this.handleClick('reactions');
  };

  finalOrders = (constructCounts) => {
    this.setState( prevState => {
      let constructingStructures = prevState.structures;
      for (let i = 0; i < constructingStructures.length; i ++) {
        constructingStructures[i].brood_count = constructCounts[i].constructing_count;
      };
    });
    let constructTotal = 0;
    for (let i = 0; i < constructCounts.length; i ++) {
      let addToTotal = constructCounts[i].constructing_count;
      constructTotal += addToTotal;
    };
    this.reactionsConstruct(constructTotal);
    this.resetOrders();
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
    if (Conditionals.disableButtons === true) {
      return (<button className='build-aliens-button' disabled>Spawn Aliens</button>);
    } else {
      return (<button className='build-aliens-button' onClick={() => this.handleClick('spawning')}>Spawn Aliens</button>);
    };
  };

  renderConstructorButton() {
    if (Conditionals.disableButtons === true) {
      return (<button className='build-structures-button' disabled>Build Alien Stuctures</button>);
    } else {
      return (<button className='build-structures-button' onClick={() => this.handleClick('constructing')}>Build Alien Stuctures</button>);
    };
  };

  renderTaskButton() {
    if (Conditionals.disableButtons === true) {
      return (<button className='task-button' disabled>Set Tasks</button>)
    } else {
      return (<button className='task-button' onClick={() =>  this.handleClick('tasks')}>Set Tasks</button>);
    };
  };

  renderBuilders() {
    if (Conditionals.spawnMode === true) {
      return (
        <AlienSpawner aliens={this.state.aliens} setSpawns={this.setSpawns} setBiomass={this.setBiomass}
        setSynapse={this.setSynapse} handleClick={this.handleClick}
        />
      );
    } else if (Conditionals.constructMode === true) {
      return (
        <StructureConstructor structures={this.state.structures} setStructuresBiomass={this.setStructuresBiomass} setOrders={this.setOrders}
          setStructuresSynapse={this.setStructuresSynapse} handleClick={this.handleClick}
        />
      );
    } else if (Conditionals.taskMode === true) {
      return (
        <Tasks status={this.state.status} aliens={this.state.aliens} structures={this.state.structures}
          aliensCost={this.state.aliensCost} structuresCost={this.state.structuresCost}
            aliensSynapse={this.state.aliensSynapse} structuresSynapse={this.state.structuresSynapse} updateSolarDay={this.updateSolarDay} 
              finalSpawning={this.finalSpawning} finalBiomass={this.finalBiomass} finalSynapse={this.finalSynapse} 
                finalOrders={this.finalOrders} finalStructuresBiomass={this.finalStructuresBiomass}
                  handleClick={this.handleClick}
        />
      );
    } else if (Conditionals.reactionMode === true) {
      return (
        <Reactions status={this.state.status} aliens={this.state.aliens}  structures={this.state.structures}
          reactionsSpawn={this.state.reactionsSpawn} reactionsConstruct={this.state.reactionsConstruct}
           handleClick={this.handleClick}
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
            <div className='status-bar-major' >
              <span className='far-left-major'></span>
              <span className='left-major'>
                <h4>Biomass: {report.biomass}</h4>
              </span>
              <span className='center'>
                <h3>Brood Name: {report.brood_name}</h3>
              </span>
              <div className='right-major'>
                <h4>Synapse:</h4>
                <h4 className='orange'>{report.synapse_required}</h4>
                <h4 className='gold'>{report.synapse_produced}</h4>
              </div>
              <span className='far-right-major'></span>
            </div>
            <div className='status-bar-minor'>
              <span className='far-left-minor'></span>
              <span className='center-minor'><h4>Solar Day: {report.solar_day}</h4></span>
              <span className='far-right-minor'></span>
            </div>
          </header>
        ))}
        <section className='gameplay-style reaction-mode'>
            <AlienList aliens={aliens} status={status} aliensCost={aliensCost} aliensSynapse={aliensSynapse} />
            <StructureList structures={structures} status={status} structuresCost={structuresCost} structuresSynapse={structuresSynapse} />
          <div>{this.renderBuilders()}</div>
        </section>
        <footer className='game-footer'>
          <span>{this.renderSpawnerButton()}</span>
          <span>{this.renderTaskButton()}</span>
          <span>{this.renderConstructorButton()}</span>
        </footer>
      </div>
    )
  };
};

export default GameplayScreen;