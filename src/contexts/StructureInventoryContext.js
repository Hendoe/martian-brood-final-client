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