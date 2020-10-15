import React, { Component } from 'react';
import { StructureInventory } from '../../stores/ConstructionOrders';
import ReportContext from '../../contexts/ReportContext';
import './StructureList.css';
import { Conditionals } from '../../stores/Conditionals';

class StructureList extends Component {
  static contextType = ReportContext

  renderStructureList() {
    if (Conditionals.reactionMode === false) {
      const { structureInventory } = this.context
      return (
        <div className='list-box-structures'>
          <div className='left-column-structures'>
            <span className='top-structures'><h4>Name</h4></span>
            <ul className='right-list'>
              {structureInventory.map(structure => (
                <li key={structure.id} className='structure'>{structure.structure_name}</li>
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
              {structureInventory.map(structure => (
                <li key={structure.id} className='structure'>{structure.brood_count}</li>
              ))}
            </ul>
          </div>
          <div className='right-column-structures'>
            <span className='top-structures'><h4>Constructing</h4></span>
            <ul>
              {StructureInventory.map(structure => (
                <li key={structure.id} className='structure'>{structure.constructing_count}</li>
              ))}
            </ul>
          </div>
        </div>
      )
    } else {
      return (
        <ul className='right-list'>
          <li><br /></li>
          <li>CONSTRUCTING<br /></li>
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
          <li><br /></li>
          <li><br /></li>
          <li><br /></li>
          <li><br /></li>
          <li><br /></li>
      </ul>
      )
    };
  };


  render() {
    const { structuresCost, structuresSynapse } = this.props
    const { structureInventory } = this.context
    let structure = ""
    if (!structureInventory) {
      alert('no structures')
    } else {
      structure = structureInventory;
    }

    return (
      <div className='right alien-structures-box'>
        <h2>Structures</h2>
          <div>
            {this.renderStructureList()}
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