// import React, { Component } from 'react';
// import './Loader.css';

class Reactions extends Component {
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

  timer() {
    setTimeout((){ alert("Loading"); }, 1000);
  };

  render() {
    const { aliens } = this.props

    return(
      <div class="reaction-box">
        <p>{this.timer}</p>
      </div>
    );
  };
};

export default Reactions;