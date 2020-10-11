import React, { Component } from 'react';
import './StructureList.css';

class StructureList extends Component {
  render() {
    const { structures, structuresCost, structuresSynapse } = this.props

    return (
      <div className='right alien-structures-box'>
        <h2>Structures</h2>
          <div>
            <div className='list-box-structures'>
              <div className='left-column-structures'>
                <span className='top-structures'><h4>Name</h4></span>
                <ul className='right-list'>
                  {structures.map(structure => (
                    <li className='structure'>{structure.structure_name}</li>
                  ))}
                  <li><br /></li>
                  <li><br /></li>
                  <li><br /></li>
                  <li><br /></li>
                  <li><br /></li>
                  <li><br /></li>
                  <li><br /></li>
                  <li><br /></li>
                  <li><br /></li>
                  <li><br /></li>
                  <li><br /></li>
                  <li><br /></li>
                </ul>
              </div>
              <div className='middle-column-structures'>
                <span className='top-structures'><h4>Brood Count</h4></span>
                <ul> 
                  {structures.map(structure => (
                    <li className='structure'>{structure.brood_count}</li>
                  ))}
                </ul>
              </div>
              <div className='right-column-structures'>
                <span className='top-structures'><h4>Constructing</h4></span>
                <ul>
                  {structures.map(structure => (
                    <li className='structure'>{structure.constructing_count}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='bottom-row-structures'>
              <h4>Biomass Cost: {structuresCost}</h4>
              <h4 className='gold'>Synapse Produced: {structuresSynapse}</h4>
            </div>
          </div>
      </div>
    )   
  };
};

export default StructureList;