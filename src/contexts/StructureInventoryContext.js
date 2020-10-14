import React, { Component } from 'react';

const StructureInventoryContext = React.createContext({
  stuctureInventory: [],
  setStructureInventory: () => {},
})
export default StructureInventoryContext

export class StructureInventoryProvider extends Component {
  state = {
    structureInventory: [],
  };

  //USED TO ADJUST THE STATES AS NEEDED AND SET INITIAL STATES
  setStructureInventory = structureInventory => {
    console.log('SETTING STRUCTURE INVENTORY')
    this.setState([ structureInventory ]);
  };

    //UPDATES STRUCTURE INVENTORY WITH NEW CONSTRUCTION ORDERS
    updateConstructionOrders = () => {
      console.log('NEW ORDERS', this.state.structure_inventory);
      let oldSolarDay = this.state.status[0].solar_day;
      let newSolarDay = (oldSolarDay += 1);
      let newStatus = {
        aliens: this.state.status[0].aliens,
        biomass: this.state.status[0].biomass,
        brood_name: this.state.status[0].brood_name,
        id: this.state.status[0].id,
        solar_day: newSolarDay,
        structures: this.state.status[0].structures,
        synapse_produced: this.state.status[0].synapse_produced,
        synapse_required: this.state.status[0].synapse_required,
      };
      this.setStatus(newStatus);
    };

  render() {
    const value = {
      structureInventory: this.state.structureInventory,
      setStructureInventory: this.setStructureInventory,
    }
    return (
      <StructureInventoryContext.Provider value={value}>
        {this.props.children}
      </StructureInventoryContext.Provider>
    )
  };
};