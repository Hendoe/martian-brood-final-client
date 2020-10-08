import React, { Component } from 'react';
import './StructureList.css';

class StructureList extends Component {
  render() {
    const { structures } = this.props

    return (
      <div className='list-box'>
        {structures.map(structure => (
          <ul className='left-list'>
            <li className='item'>Name: {structure.alien_name}</li>
            <li className='item'>Count: {structure.brood_count}</li>
            <li className='item'>To Construct: {structure.construct_count}</li>
          </ul>
        ))}
      </div>
    )   
  };
};

export default StructureList;