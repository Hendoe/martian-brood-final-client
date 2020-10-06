import React, { Component } from 'react';
import config from '../config';
import AlienList from './AlienList/AlienList';
import AlienBuilder from './AlienBuilder/AlienBuilder';
import StructuresBuilder from './StructuresBuilder/StructuresBuilder';
import Tasks from './Tasks/Tasks';
import './GameplayScreen.css';

class GameplayScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buildStructures: false,
      buildAliens: false,
      aliensAPI: [],
      aliens: [
        {
          alienid: 0,
          alien_name: "Worker Drone",
          hp: 1,
          atk: 1,
          biomass_cost: 5,
          synapse_required: 1,
          description: 'Simple alien. Gathers Biomass for the growth of the Brood.',
          special_features: null,
        }
      ],
      statusAPI: {},
      status: {
        userid: 0,
        brood_name: 'starter',
        biomass: 25,
        synapse: 5,
        alienInventory: [
          {
            alien_name: 'Worker Drone',
            count: 0,
            living: false,
            toSpawn: 0,
            spawning: false
          },
        ]
      },
      buildOrders: {},
      biomass: 45,
      cost: 0,
      count: 0,
      toBuild: 0,
    };
  };

  componentDidMount() {
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
      .then(([aliensAPI]) => {
        this.setState({ aliensAPI })
      })
      .catch(error => {
        console.log({error})
      });
  };

  //ALL HANDLERS FOR CONDITIONAL CHANGES
  handleBuildModeChange() {
    this.props.buildModeChange();
  };

  handleTaskModeChange() {
    this.props.taskModeChange();
  };

  handleUpdateTotalBiomass() {
    let oldBiomass = this.state.biomass;
    const newBiomass = oldBiomass - this.state.cost;
    this.setState({biomass: newBiomass})
    this.setState({cost: 0})
  }

  handleUpdateAlienCount() {
    let oldCount = this.state.count;
    const newCount = oldCount + this.state.toBuild;
    this.setState({count: newCount});
    this.setState({toBuild: 0});
  }

  //ALL HANDLERS FOR SPAWNING ALIENS
  handleClickAlienBuilder = () => {
    this.setState({buildAliens: true});
    this.handleBuildModeChange();
  };

  handleAddBuild = () => {
    console.log('adding');
    let oldCost = this.state.cost;
    const newCost = oldCost +=5;
    this.setState({cost: newCost});
    let oldBuild = this.state.toBuild;
    const newBuild = oldBuild +=1;
    this.setState({toBuild: newBuild});
  };

  handleSubtractBuild = () => {
    console.log('subtracting');
    let oldCost = this.state.cost;
    const newCost = oldCost -=5;
    this.setState({cost: newCost});
    let oldBuild = this.state.toBuild;
    const newBuild = oldBuild -=1;
    this.setState({toBuild: newBuild});
  };

  handleClickSpawn = () => {
    this.setState({buildAliens: false});
    let newCount = this.state.toBuild;
    let aliens = this.state.aliens;
    aliens[0] = {...aliens[0], toBuild: newCount} 
    this.setState({ aliens })
    this.handleBuildModeChange();
  };

  //ALL HANDLERS FOR STRUCTURE CONSTRUCTION
  handleClickStructureBuilder = () => {
    this.setState({buildStructures: true});
    this.handleBuildModeChange();
  };

  handleClickConstruct = () => {
    this.setState({buildStructures: false});
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

  renderGameplay() {
    if (this.props.buildMode === true || this.props.taskMode === true) {
      return (
        <div>
          <header className='status-bar'>
            <span className='left'>
              <span className='row'>
                <h4>
                  Biomass: {this.state.biomass}
                </h4>
                <br />
                <h4 className='red'>
                  - {this.state.cost}
                </h4>
                </span>
            </span>
            <span className='center'>
              <h3>Brood Name: {this.state.status.brood_name}</h3>
            </span>
            <span className='right'>
              <h4>Synapse: {this.state.status.synapse}</h4>
            </span>
          </header>
          <section className='gameplay-style reaction-mode'>
            <div className='left aliens-box'>
            <h2>Aliens</h2>
              {/* <AlienList aliens={this.state.aliens} alienInventory={this.state.status.alienInventory} count={this.state.count} toBuild={this.state.toBuild} /> */}
              <AlienList alienInventory={this.state.status.alienInventory} count={this.state.count} toBuild={this.state.toBuild} />
              <button className='build-aliens-button' disabled>Spawn Aliens</button>
            </div>
            <div className='right alien-structures-box'>
              <h2>Alien Stuctures</h2>
              <ul>
                <li>1 Synapse Cluster</li>
                {/* <li>3 Watcher Orbs</li> */}
                <li>1 Spawning Pit</li>
              </ul>
              <button className='build-structures-button' disabled>Build Alien Stuctures</button>
            </div>
            <div>{this.renderBuilders()}</div>
          </section>
        </div>
      )
    } else {
      return (
        <div>
          <header className='status-bar'>
            <span className='left'>
              {/* {this.state.status.map(status => ( */}
                <span className='row'>
                  <h4>
                    Biomass: {this.state.biomass}
                  </h4>
                  <br />
                  <h4 className='red'>
                    - {this.state.cost}
                  </h4>
                </span>
             {/* ))} */}
            </span>
            <span className='center'>
              {/* {this.state.status.map(status => ( */}
              <h3>Brood Name: {this.state.status.brood_name}</h3>
              {/* ))} */}
            </span>
            <span className='right'>
              {/* {this.state.status.map(status => ( */}
              <h4>Synapse: {this.state.status.synapse}</h4>
              {/* ))} */}
            </span>
          </header>
          <section className='gameplay-style'>
            <div className="left aliens-box">
            <h2>Aliens</h2>
              {/* <AlienList aliens={this.state.aliens} alienInventory={this.state.status.alienInventory} count={this.state.count} toBuild={this.state.toBuild} /> */}
              <AlienList alienInventory={this.state.status.alienInventory} count={this.state.count} toBuild={this.state.toBuild} />
              <button className='build-aliens-button' onClick={() => this.handleClickAlienBuilder()}>Spawn Aliens</button>
            </div>
            <div className="right alien-structures-box">
              <h2>Alien Structures</h2>
              <ul>
                <li>1 Synapse Cluster</li>
                {/* <li>3 Watcher Orbs</li> */}
                <li>1 Spawning Pit</li>
              </ul>
              <button className='build-structures-button' onClick={() => this.handleClickStructureBuilder()}>Build Alien Stuctures</button>
            </div>
          <div>{this.renderBuilders()}</div>
        </section>
      </div>
      )
    };
  };

  renderBuilders() {
    if (this.state.buildAliens === true) {
      return (
        // <AlienBuilder aliens={this.state.aliens} cost={this.state.cost} toBuild={this.state.toBuild}
        //   handleClickAdd={this.handleAddBuild} handleClickSubtract={this.handleSubtractBuild} handleClickSpawn={this.handleClickSpawn}
        // />
        <AlienBuilder  aliens={this.state.aliensAPI} cost={this.state.cost} toBuild={this.state.toBuild}
          handleClickAdd={this.handleAddBuild} handleClickSubtract={this.handleSubtractBuild} handleClickSpawn={this.handleClickSpawn}
        />
      );
    } else if (this.state.buildStructures === true) {
      return (
        <StructuresBuilder handleClickConstruct={this.handleClickConstruct} />
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
    return (
      <div>{this.renderGameplay()}</div>
    );
  };
};

export default GameplayScreen;