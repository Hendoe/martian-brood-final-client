import React, { Component } from 'react';
import { AlienInventory } from '../stores/AlienInventory';
import { StructureInventory } from '../stores/ConstructionOrders';

const ReportContext = React.createContext({
  status: [],
  setStatus: () => {},
  aliens: {},
  setAliens: () => {},
  alienInventory: [],
  setAlienInventory: () => {},
  structures: {},
  setStructures: () => {},
  structureInventory: [],
  setStructureInventory: () => {},
  updateSolarDay: () => {},
  updateBroodCounts: () => {},
})
export default ReportContext

export class ReportProvider extends Component {
  state = {
    status: [],
    aliens: {},
    alienInventory: [],
    structures: {},
    structureInventory: [],
  };

  //USED TO ADJUST THE STATES AS NEEDED AND SET INITIAL STATES
  setStatus = status => {
    console.log('SETTING STATUS')
    this.setState({ status });
  };

  setAliens = aliens => {
    console.log('SETTING ALIENS')
    this.setState({ aliens });
  };

  setAlienInventory = alienInventory => {
    console.log('SETTING ALIEN INVENTORY', alienInventory)
    this.setState({ alienInventory });
    console.log('SET ALIEN INVENTORY', alienInventory)
  };

  setStructures = structures => {
    console.log('SETTING STRUCTURES')
    this.setState({ structures });
  };

  setStructureInventory = structureInventory => {
    console.log('SETTING STRUCTURE INVENTORY', structureInventory)
    this.setState({ structureInventory });
  };

  //Updaters first take transient values from the Client
  //With these values, they are able to build new forms of the State
  //Ulimately, these new States get sent to the Server, where they are PATCHED to keep track of the player's progress
  updateSolarDay = () => {
    console.log('NEW SOLAR DAY', this.state.status[0].solar_day);
    let oldSolarDay = this.state.status[0].solar_day;
    let newSolarDay = (oldSolarDay += 1);
    let newStatus = [{
      aliens: this.state.status[0].aliens,
      biomass: this.state.status[0].biomass,
      brood_name: this.state.status[0].brood_name,
      id: this.state.status[0].id,
      solar_day: newSolarDay,
      structures: this.state.status[0].structures,
      synapse_produced: this.state.status[0].synapse_produced,
      synapse_required: this.state.status[0].synapse_required,
    },];
    this.setStatus(newStatus);
  };

  updateBroodCounts = () => {
    //let spawnCount = 0,
    //let constructCount = 0,
    //create empty array to push new States into
    //loop through alienInventory to find spawning_counts
      //for each Alien, add spawning_counts to spawnCount
      //then serialize a new version of that Alien
      //lastly, reset spawning_count to zero
    //loop through structureInventory to find constructing_counts
      //for each Structure, add spawning_counts to constructCount
      //then serialize a new version of that Structure
      //lastly, reset constructing_count to zero
    //setState of alienInventory
    //setState of structureInventory
    console.log('UPDATING BROOD COUNTS')
    let spawnCount = 0;
    let constructCount = 0;
    let newAlienInventory = [];
    let newStructureInventory = [];
    for (let i = 0; i< AlienInventory.length; i++) {
      spawnCount += AlienInventory[i].spawning_count;
      let newBroodCount = (this.state.alienInventory[i].brood_count += AlienInventory[i].spawning_count);
      let newAlien = {
        id: this.state.alienInventory[i].id,
        alien_name: this.state.alienInventory[i].alien_name,
        spawning_count: AlienInventory[i].spawning_count,
        brood_count: newBroodCount,
        spawnable: true,
      };
      newAlienInventory.push(newAlien);
      AlienInventory[i].spawning_count = 0;
    };
    for (let i = 0; i< StructureInventory.length; i++) {
      constructCount += StructureInventory[i].constructing_count;
        let newBroodCount = (this.state.structureInventory[i].brood_count += StructureInventory[i].constructing_count);
        let newStructure = {
          id: this.state.structureInventory[i].id,
          structure_name: this.state.structureInventory[i].structure_name,
          constructing_count: StructureInventory[i].constructing_count,
          brood_count: newBroodCount,
          constructable: true,
        };
        newStructureInventory.push(newStructure);
        StructureInventory[i].constructing_count = 0;
    this.setAlienInventory(newAlienInventory);
    this.setStructureInventory(newStructureInventory);
    };
  };

  render() {
    const value = {
      status: this.state.status,
      setStatus: this.setStatus,
      aliens: this.state.aliens,
      setAliens: this.setAliens,
      alienInventory: this.state.alienInventory,
      setAlienInventory: this.setAlienInventory,
      structures: this.state.structures,
      setStructures: this.setStructures,
      structureInventory: this.state.structureInventory,
      setStructureInventory: this.setStructureInventory,
      updateSolarDay: this.updateSolarDay,
      updateBroodCounts: this.updateBroodCounts,
    }
    return (
      <ReportContext.Provider value={value}>
        {this.props.children}
      </ReportContext.Provider>
    )
  };
};