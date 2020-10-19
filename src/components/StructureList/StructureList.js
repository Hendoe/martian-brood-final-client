import React, { Component } from 'react';
import { StructureInventory } from '../../stores/ConstructionOrders';
import ReportContext from '../../contexts/ReportContext';
import './StructureList.css';
import { Conditionals } from '../../stores/Conditionals';

class StructureList extends Component {
  static contextType = ReportContext

  filterInBrood = () => {
    const { structureInventory } = this.context;
    let filteredStructures = structureInventory.filter(structure => structure.brood_count > 0);
    return filteredStructures
  };

  renderStructureList = (filteredStructures) => {
    if (Conditionals.loadMode === false) {
      return (
        <div className='list-box-structures'>
          <div className='left-column-structures'>
            <span className='top-structures'><h4>Name</h4></span>
            <ul className='right-list'>
              {filteredStructures.map(structure => (
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
              {filteredStructures.map(structure => (
                <li key={structure.id} className='structure'>{structure.brood_count}</li>
              ))}
            </ul>
          </div>
          <div className='right-column-structures'>
            <span className='top-structures'><h4>Constructing</h4></span>
            <ul>
              {filteredStructures.map(structure => (
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
    let filteredStructures = this.filterInBrood();

    return (
      <div className='right alien-structures-box'>
        <h2>Structures</h2>
          <div className='lower-left'>
            {this.renderStructureList(filteredStructures)}
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