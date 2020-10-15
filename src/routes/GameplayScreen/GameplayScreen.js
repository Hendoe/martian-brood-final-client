import React, { Component } from 'react';
import { Conditionals, ChangeConditions} from '../../stores/Conditionals';
import AlienList from '../../components/AlienList/AlienList';
import AlienSpawner from '../../components/AlienSpawner/AlienSpawner';
import { StructureInventory } from '../../stores/ConstructionOrders';
import StructureList from '../../components/StructureList/StructureList';
import StructureConstructor from '../../components/StructureConstructor/StructureConstructor';
import Tasks from '../../components/Tasks/Tasks';
import Reactions from '../../components/Reactions/Reactions';
import './GameplayScreen.css';
import { StatusApiService } from '../../services/report-api-services';
import ReportContext from '../../contexts/ReportContext';

class GameplayScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aliensCost: 0,
      aliensSynapse: 0,
      AlienInventory: {},
      StructureInventory: {},
      structuresCost: 0,
      structuresSynapse: 0,
    };
  };

  static contextType = ReportContext

  //Once the Component Mounts the game will need access to all the information about the player
  //Thus, we call on 3 GET requests to fetch the info from the server
  //An attempt is being made to simplify this process with Promise.all
  //Lastly, the page updates to be sure it's displaying proper data
  componentDidMount() {
    StatusApiService.getStatus()
      .then(this.context.setStatus)
    StatusApiService.getAliens()
      .then(this.context.setAliens)
    StatusApiService.getAlienInventory()
      .then(this.context.setAlienInventory)
    StatusApiService.getStructures()
      .then(this.context.setStructures)
    StatusApiService.getStructureInventory()
      .then(this.context.setStructureInventory)
    // StatusApiService.GETmaster()
      // .then(this.context.setStatus)
      // .then(this.context.setAliens)
      // .then(this.context.setStructures) 

    this.forceUpdate();
  };
  
  //Clicks are sent here from the components
  //Then a message is sent to the Conditionals
  //Who need to know how to update the Conditions correctly
  //Lastly, this component is updated to stay current
  handleClick = (type) => {
    ChangeConditions(type);
    this.forceUpdate();
  };

  //The Reactions Page wants to tell the player how their turn went
  //So it has to figure out how many Aliens spawned, how many Structures were constructed
  //The Gameplay state holds this data, so that it may be sent to the Reactor when needed
  reactionsSpawn(spawning) {
    this.setState({reactionsSpawn: spawning})
  };

  reactionsConstruct(constructing) {
    this.setState({reactionsConstruct: constructing})
  };

  //Whenever a Player finalizes their Spawning Plans or Construction Orders the Biomass Cost and Synapse Distribution must then be calculated
  setAliensBiomass = (biomass) => {
    this.setState({aliensCost: biomass});
    this.handleClick('cancel');
  };

  resetAliensBiomass() {
    this.setState({aliensCost: 0});
  };

  finalAliensBiomass = (newBiomass) => {
    console.log('INCOMING ALIEN BIOMASS', newBiomass)
    console.log('CONTEXT ALIEN BIOMASS', this.context.status.biomass)
    let oldBiomass = this.context.status.biomass;
    let totalBiomass = (oldBiomass += newBiomass);
    this.context.setStatus(totalBiomass);
    this.resetAliensBiomass();
  };

  setStructuresBiomass = (biomass) => {
    this.setState({structuresCost: biomass});
    this.handleClick('cancel');
  };

  resetStructuresBiomass() {
    this.setState({structuresCost: 0});
  };

  finalStructuresBiomass = (newBiomass) => {
    console.log('INCOMING STRUCTURES BIOMASS', newBiomass)
    console.log('CONTEXT STRUCTURES BIOMASS', this.context.status.biomass)
    let oldBiomass = this.context.status.biomass;
    let totalBiomass = (oldBiomass += newBiomass);
    this.context.setStatus(totalBiomass);
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
    console.log('SYNAPSE REQUIRED', required)
    console.log('SYNAPSE PRODUCED', produced)
  //   let oldBiomass = this.context.status[0].biomass;
  //   let totalBiomass = (oldBiomass += newBiomass);
  //   this.context.setStatus(totalBiomass);
  //   this.resetSynapses();
  };

  //All of the buttons have an active and disabled state
  //If anything that creates a Builder Box is active then all the buttons that open new Builder Boxes must be made disabled
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

  //Our Builders are only going to appear when the Conditions are right for them
  renderBuilders() {
    if (Conditionals.spawnMode === true) {
      return (
        <AlienSpawner aliens={this.state.aliens} setAliensBiomass={this.setAliensBiomass}
        setSynapse={this.setSynapse} handleClick={this.handleClick}
        />
      );
    } else if (Conditionals.constructMode === true) {
      return (
        <StructureConstructor setStructuresBiomass={this.setStructuresBiomass}
          setStructuresSynapse={this.setStructuresSynapse} handleClick={this.handleClick}
        />
      );
    } else if (Conditionals.taskMode === true) {
      return (
        <Tasks aliensCost={this.state.aliensCost} structuresCost={this.state.structuresCost}
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

  //The Main Render Function
  render() {
    const { aliensCost, aliensSynapse, structuresCost, structuresSynapse } = this.state
    const { structureInventory, alienInventory } = this.context
    const { status } = this.context
    let report = ""
    if (status[0]) {
      report = status[0]
    };
    console.log('main screen', this.context.structureInventory)

    return (
      <div>
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
        <section className='gameplay-style reaction-mode'>
          <AlienList aliensCost={aliensCost} aliensSynapse={aliensSynapse} alienInventory={alienInventory} />
          <StructureList status={status} structuresCost={structuresCost} structuresSynapse={structuresSynapse} structureInventory={structureInventory} />
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