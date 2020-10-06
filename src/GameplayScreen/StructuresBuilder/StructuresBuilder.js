import React, { Component } from 'react';
import './StructuresBuilder.css';

class StructuresBuilder extends Component {
  render() {
    return (
        <div className="builder-box">
          <h2>Structure Constructor</h2>
          <div className="inner-builder">
            <div className="left-builder">
              <h3>Structures</h3>
              <ul>
                <li><button className="structure-button">Synapse Clusters</button></li>
                <li><button className="structure-button">Watcher Orbs</button></li>
                <li><button className="structure-button">Spawning Pit</button></li>
                <li><button className="structure-button">Processing Pool</button></li>
              </ul>
            </div>
            <div className="right-builder">
              <h3>Count</h3>
                <ul>
                  <li><p>Synapse Clusters to Build: 2</p></li>
                  <li><p>Watcher Orbs to Build: 0</p></li>
                  <li><p>Spawning Pools to Build: 1</p></li>
                  <li><p>Processing Pools to Build: 1</p></li>
                </ul>
            </div>
          </div>
          <button className='builder-button' onClick={() => this.props.handleClickConstruct()}>SPAWN</button>
        </div>
    );
  };
};

export default StructuresBuilder;