import React, { Component } from 'react';
import Alien from '../Alien/Alien';
import './AlienList.css';

class AlienList extends Component {
  render() {
    const aliens = this.props.aliens

    return (
      <div>
    <ul>
      {aliens.map(alien =>
        <li key={alien.alienid}>
          <Alien
            id={alien.alienid}
            name={alien.alien_name}
          />
       </li>
      )}
    </ul>
      </div>
    );
  };
};

export default AlienList;