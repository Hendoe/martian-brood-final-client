import React, { Component } from 'react';
import { AlienInventory } from '../stores/AlienInventory';
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
    console.log('WHAT WE PRODUCING', newProduced);
    console.log('WHAT WE REQUIRING', newRequired);    

    let newStatus = [{
      aliens: this.state.status[0].aliens,
      biomass: finalBiomass,
      brood_name: this.state.status[0].brood_name,
      id: this.state.status[0].id,
      solar_day: newSolarDay,
      structures: this.state.status[0].structures,
      synapse_produced: newProduced,
      synapse_required: newRequired,
    },]
    this.setStatus(newStatus)
  }

  updateSolarDay = () => {
    console.log('LAST IS SOLAR DAY', this.state.status[0])
    let oldSolarDay = this.state.status[0].solar_day;
    let newSolarDay = (oldSolarDay += 1);
    return newSolarDay;
  };

  updateBroodCounts = () => {
    console.log('FIRST BROOD COUNTS', this.state.status[0])
    let totalSpawning = 0;
    let newAlienInventory = [];
    for (let i = 0; i< AlienInventory.length; i++) {
      totalSpawning += AlienInventory[i].spawning_count;
      let newAlienBroodCount = (this.state.alienInventory[i].brood_count += AlienInventory[i].spawning_count);
      let newAlien = {
        id: this.state.alienInventory[i].id,
        alien_name: this.state.alienInventory[i].alien_name,
        spawning_count: AlienInventory[i].spawning_count,
        brood_count: newAlienBroodCount,
        spawnable: true,
      };
      newAlienInventory.push(newAlien);
      AlienInventory[i].spawning_count = 0;
    };
    let totalConstructing = 0;
    let newStructureInventory = [];
    for (let i = 0; i< StructureInventory.length; i++) {
      totalConstructing += StructureInventory[i].constructing_count;
        let newStructureBroodCount = (this.state.structureInventory[i].brood_count += StructureInventory[i].constructing_count);
        let newStructure = {
          id: this.state.structureInventory[i].id,
          structure_name: this.state.structureInventory[i].structure_name,
          constructing_count: StructureInventory[i].constructing_count,
          brood_count: newStructureBroodCount,
          constructable: true,
        };
        newStructureInventory.push(newStructure);
        StructureInventory[i].constructing_count = 0;
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
    console.log('THE FACTORY', producedSynapse)
    let oldProduced = this.state.status[0].synapse_produced;
    let newProduced = (oldProduced += producedSynapse);
    return newProduced;
  };
  updateRequiredSynapse(requiredSynapse) {
    let oldRequired = this.state.status[0].synapse_required;
    let newRequired = (oldRequired += requiredSynapse);
    return newRequired;
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
    }
    return (
      <ReportContext.Provider value={value}>
        {this.props.children}
      </ReportContext.Provider>
    )
  };
};