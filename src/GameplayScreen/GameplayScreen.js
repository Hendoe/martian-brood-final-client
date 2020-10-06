import React, { Component } from 'react';
import config from '../config';
import AlienBuilder from './AlienBuilder/AlienBuilder';
import StructuresBuilder from './StructuresBuilder/StructuresBuilder';
import './GameplayScreen.css';

class GameplayScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buildStructures: false,
      buildAliens: false,
      aliens: [],
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
      .then(([aliens]) => {
        this.setState({ aliens })
      })
      .catch(error => {
        console.log({error})
      });
  };

  handleBuildModeChange() {
    this.props.buildModeChange();
  };

  handleClickAlienBuilder = () => {
    this.setState({buildAliens: true});
    this.handleBuildModeChange();
  };

  handleClickSpawn = () => {
    this.setState({buildAliens: false});
    this.handleBuildModeChange();
  };

  handleClickStructureBuilder = () => {
    this.setState({buildStructures: true});
    this.handleBuildModeChange();
  };

  handleClickConstruct = () => {
    this.setState({buildStructures: false});
    this.handleBuildModeChange();
  };

  renderGameplay() {
    if (this.props.buildMode === true) {
      return (
      <section className='gameplay-style reaction-mode'>
        <div className='left aliens-box'>
        <h2>Aliens</h2>
          <ul>
            <li>1 Primarch</li>
            <li>4 Worker Drones</li>
            <li>2 Warrior Drones</li>
          </ul>
          <button className='build-aliens-button' disabled>Spawn Aliens</button>
        </div>
        <div className='right alien-structures-box'>
          <h2>Alien Stuctures</h2>
          <ul>
            <li>2 Synapse Clusters </li>
            <li>3 Watcher Orbs</li>
            <li>1 Spawning Pit</li>
          </ul>
          <button className='build-structures-button' disabled>Build Alien Stuctures</button>
        </div>
        <div>{this.renderBuilders()}</div>
      </section>
      )
    } else {
      return (
        <section className='gameplay-style'>
          <div className="left aliens-box">
          <h2>Aliens</h2>
            <ul>
              <li>1 Primarch</li>
              <li>4 Worker Drones</li>
              <li>2 Warrior Drones</li>
            </ul>
            <button className='build-aliens-button' onClick={() => this.handleClickAlienBuilder()}>Spawn Aliens</button>
          </div>
          <div className="right alien-structures-box">
            <h2>Alien Structures</h2>
            <ul>
              <li>2 Synapse Clusters </li>
              <li>3 Watcher Orbs</li>
              <li>1 Spawning Pit</li>
            </ul>
            <button className='build-structures-button' onClick={() => this.handleClickStructureBuilder()}>Build Alien Stuctures</button>
          </div>
        <div>{this.renderBuilders()}</div>
      </section>
      )
    };
  };

  renderBuilders() {
    if (this.state.buildAliens === true) {
      return (
        <AlienBuilder handleClickSpawn={this.handleClickSpawn}/>
      );
    } else if (this.state.buildStructures === true) {
      return (
        <StructuresBuilder handleClickConstruct={this.handleClickConstruct} />
      );
    } else {
      return
    }
  };

  render() {
    console.log(this.state.aliens)
    console.log(this.props.buildMode)
    return(
      <div>{this.renderGameplay()}</div>
    );
  };
};

export default GameplayScreen;