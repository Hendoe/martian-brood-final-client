import React, { Component } from 'react';
import config from '../../config';
import Aliens from '../../stores/Aliens';
import { AlienInventory } from '../../stores/AlienInventory';
import { Conditionals, ChangeConditions} from '../../stores/Conditionals';
import AlienList from '../../components/AlienList/AlienList';
import AlienSpawner from '../../components/AlienSpawner/AlienSpawner';
import Structures from '../../stores/Structures';
import { StructureInventory } from '../../stores/StructureInventory';
import StructureList from '../../components/StructureList/StructureList';
import StructureConstructor from '../../components/StructureConstructor/StructureConstructor';
import Status from '../../stores/Status';
import Tasks from '../../components/Tasks/Tasks';
import Reactions from '../../components/Reactions/Reactions';
import './GameplayScreen.css';
import StatusApiService from '../../services/status-api-service';
import StatusContext from '../../contexts/StatusContext';

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
      alienInventory: AlienInventory,
      aliensCost: 0,
      aliensSynapse: 0,
      structures: [],
      StructureInventory: StructureInventory,
      structuresCost: 0,
      structuresSynapse: 0,
    };
  };

  static contextType = StatusContext

  //GET OUR DATABASES
  componentDidMount() {
    this.GETmaster();
    this.forceUpdate();
    console.log('context', this.context.setStatus())
  };
  
  //GETS IT
  GETmaster = () => {
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
      .then((status) => {
        this.setState({ status: status[0] })
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

  handleClick = (type) => {
    ChangeConditions(type);
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
    this.handleClick('reactions');
  };

  //SPAWNING
  reactionsSpawn(spawning) {
    this.setState({reactionsSpawn: spawning})
  };

  //CONSTRUCTING
  reactionsConstruct(constructing) {
    this.setState({reactionsConstruct: constructing})
  };

  //BIOMASS COSTS
  setAliensBiomass = (biomass) => {
    this.setState({aliensCost: biomass});
    this.handleClick('cancel');
  };

  resetAliensBiomass() {
    this.setState({aliensCost: 0});
  };

  finalAliensBiomass = (biomass) => {
    this.setState( prevState => {
      let newStatus = prevState.status[0]
        newStatus.biomass -= biomass;
        return {
          status: [newStatus]
        }
      });
    this.resetAliensBiomass();
  };

  setStructuresBiomass = (biomass) => {
    this.setState({structuresCost: biomass});
    this.handleClick('cancel');
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
        <AlienSpawner aliens={this.state.aliens} setAliensBiomass={this.setAliensBiomass}
        setSynapse={this.setSynapse} handleClick={this.handleClick}
        />
      );
    } else if (Conditionals.constructMode === true) {
      return (
        <StructureConstructor structures={this.state.structures} setStructuresBiomass={this.setStructuresBiomass}
          setStructuresSynapse={this.setStructuresSynapse} handleClick={this.handleClick}
        />
      );
    } else if (Conditionals.taskMode === true) {
      return (
        <Tasks status={this.state.status} aliens={this.state.aliens} structures={this.state.structures}
          aliensCost={this.state.aliensCost} structuresCost={this.state.structuresCost}
            aliensSynapse={this.state.aliensSynapse} structuresSynapse={this.state.structuresSynapse} updateSolarDay={this.updateSolarDay} 
             finalAliensBiomass={this.finalAliensBiomass} finalSynapse={this.finalSynapse} 
                finalStructuresBiomass={this.finalStructuresBiomass}
                  handleClick={this.handleClick}
        />
      );
    } else if (Conditionals.reactionMode === true) {
      return (
        <Reactions status={this.state.status} aliens={this.state.aliens}  structures={this.state.structures} handleClick={this.handleClick}
        />
      );
    } else {
      return
    }
  };

  //MAIN RENDER
  render() {
    const { status, aliens, structures, aliensCost, aliensSynapse, structuresCost, structuresSynapse } = this.state
    let report = ""
    if (status[0]) {
      report = status[0]
      // console.log('REPORT', report)
    };
    // console.log('state status', this.state.status[0])
    // console.log('aliens', aliens)
    // console.log('structures', structures)
    // console.log('context', this.context)
    // console.log('STATUS', status[0])

    return (
      <div>
        {/* {status.map(report => ( */}
          <li key={report.id} >
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
          </li>
        {/* ))} */}
        <section className='gameplay-style reaction-mode'>
            <AlienList aliensCost={aliensCost} aliensSynapse={aliensSynapse} />
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