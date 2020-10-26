import React, { Component } from 'react';
import { AlienInventory, ResetSpawns} from '../stores/AlienInventory';
import { StructureInventory } from '../stores/ConstructionOrders';
import { ReactionsSpawning, ReactionsConstructing } from '../stores/Reactor';

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
  masterStatusUpdater: () => {},
  updateBroodCounts: () => {},
  updateSpawning: () => {},
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
    this.setState({ status });
  };

  setAliens = aliens => {
    this.setState({ aliens });
  };

  setAlienInventory = alienInventory => {
    this.setState({ alienInventory });
  };

  setStructures = structures => {
    this.setState({ structures });
  };

  setStructureInventory = structureInventory => {
    this.setState({ structureInventory });
  };

  //Updaters first take transient values from the Client
  //With these values, they are able to build new forms of the State
  //Ulimately, these new States get sent to the Server, where they are PATCHED to keep track of the player's progress
  masterStatusUpdater = (finalBiomassCost, producedSynapse, requiredSynapse) => {
    let finalBiomass = this.updateBiomass(finalBiomassCost);
    let newSolarDay = this.updateSolarDay();
    let newProduced = this.updateProducedSynapse(producedSynapse);
    let newRequired = this.updateRequiredSynapse(requiredSynapse); 
    let newStatus = [{
      id: this.state.status[0].id,
      brood_name: this.state.status[0].brood_name,
      solar_day: newSolarDay,
      biomass: finalBiomass,
      synapse_produced: newProduced,
      synapse_required: newRequired,
    },]
    this.setStatus(newStatus)
  }

  updateSolarDay = () => {
    let oldSolarDay = this.state.status[0].solar_day;
    let newSolarDay = (oldSolarDay += 1);
    return newSolarDay;
  };

  updateBroodCounts = (type) => {
    let totalSpawning = 0;
    let newAlienInventory = [];
    let totalConstructing = 0;
    let newStructureInventory = [];
    if (type === 'spawning') {
      for (let i = 0; i < this.state.alienInventory.length; i++) {
        totalSpawning += this.state.alienInventory[i].spawning_count;
        let oldAlienBroodCount = this.state.alienInventory[i].brood_count;
        let newAlienBroodCount = (oldAlienBroodCount += this.state.alienInventory[i].spawning_count);
        let newAlien = {
          id: this.state.alienInventory[i].id,
          alien_name: this.state.alienInventory[i].alien_name,
          spawning_count: 0,
          brood_count: newAlienBroodCount
        };
        newAlienInventory.push(newAlien);
      };
      ResetSpawns();
    } else if (type === 'constructing') {
      for (let i = 0; i < StructureInventory.length; i++) {
        totalConstructing += StructureInventory[i].constructing_count;
        let oldStructureBroodCount = this.state.structureInventory[i].brood_count;
        let newStructureBroodCount = (oldStructureBroodCount += StructureInventory[i].constructing_count);
        let newStructure = {
          id: this.state.structureInventory[i].id,
          structure_name: this.state.structureInventory[i].structure_name,
          constructing_count: StructureInventory[i].constructing_count,
          brood_count: newStructureBroodCount
        };
        newStructureInventory.push(newStructure);
        StructureInventory[i].constructing_count = 0;
      };
    } else {
      console.log('no brood count update');
    };
    ReactionsSpawning(totalSpawning);
    ReactionsConstructing(totalConstructing);
    this.setAlienInventory(newAlienInventory);
    this.setStructureInventory(newStructureInventory);
  };

  //This is where we do all the calculations for our updated Resource Information
  updateBiomass = (finalBiomassCost) => {
    let oldBiomass = this.state.status[0].biomass;
    let newBiomass = (oldBiomass - finalBiomassCost);
    return newBiomass;
  };
  updateProducedSynapse = (producedSynapse) => {
    let oldProduced = this.state.status[0].synapse_produced;
    let newProduced = (oldProduced += producedSynapse);
    return newProduced;
  };
  updateRequiredSynapse(requiredSynapse) {
    let oldRequired = this.state.status[0].synapse_required;
    let newRequired = (oldRequired += requiredSynapse);
    return newRequired;
  };

  //These two functions are used for updating the Spawn and Construct Counts on their respective lists
  updateSpawning = (x) => {
    let spawnCount = this.state.alienInventory[0].spawning_count;
    if (x === 1) {
      let newCount = (spawnCount += 1);
      let newAlien = [{
        id: this.state.alienInventory[0].id,
        alien_name: this.state.alienInventory[0].alien_name,
        spawning_count: newCount,
        brood_count: this.state.alienInventory[0].brood_count
      }];
      this.setAlienInventory(newAlien);
    } else if (x === 0) {
      let newCount = (spawnCount -= 1);
      let newAlien = [{
        id: this.state.alienInventory[0].id,
        alien_name: this.state.alienInventory[0].alien_name,
        spawning_count: newCount,
        brood_count: this.state.alienInventory[0].brood_count
      }];
      this.setAlienInventory(newAlien);
    } else {
      alert("spawning broke'd");
    };
  };

  updateConstructing = (x, i) => {
    let constructCount = this.state.structureInventory[i].constructing_count;
    let 
    if (x === 1) {
      let newCount = (constructCount += 1);
      this.state.structureInventory[i].constructing_count = newCount;
      let newStructure = {
        id: this.state.structureInventory[i].id,
        structure_name: this.state.structureInventory[i].structure_name,
        constructing_count: newCount
        brood_count: this.state.structureInventory[i].id
      };
      else {
        let newStructure = {
          id: this.state.structureInventory[i].id,
          structure_name: this.state.structureInventory[i].structure_name,
          constructing_count: StructureInventory[i].constructing_count,
          brood_count: newStructureBroodCount
        };
      ;}
    } else if (x === 0) {
      let newCount = (constructCount -= 1);
      this.state.structureInventory[i].constructing_count = newCount;
    } else {
      alert("constructing broke'd");
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
      masterStatusUpdater: this.masterStatusUpdater,
      updateBroodCounts: this.updateBroodCounts,
      updateSpawning: this.updateSpawning,
    }
    return (
      <ReportContext.Provider value={value}>
        {this.props.children}
      </ReportContext.Provider>
    )
  };
};