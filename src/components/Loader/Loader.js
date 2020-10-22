import React, { Component } from 'react';
import config from '../../config';
import ReportContext from '../../contexts/ReportContext';
import './Loader.css';

//The Loader is responsible for handling the transaction between the Client and Server
//At the end of every turn the API must be updated with information about the player
//Then, when the Component unmounts, the Client needs to make sure it's getting exactly what it should be 
class Loader extends Component {
  static contextType = ReportContext;

  
  componentWillUnmount() {
    this.context.status.map(newStatus => (
      fetch(config.API_ENDPOINT + `/commit/status`, {
        method: 'PATCH',
        body: JSON.stringify(newStatus),
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
      })
      .catch(error => {
        console.error(error)
      })
    ))
    let alienInventory = this.context.alienInventory;
    for (let i = 0; i < alienInventory.length; i++) {
      let alienId = alienInventory[i].id;
      fetch(config.API_ENDPOINT + `/alienInventory/${alienId}`, {
        method: 'PATCH',
        body: JSON.stringify(alienInventory[i]),
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
      })
      .catch(error => {
        console.error(error)
      })
    };
    let structureInventory = this.context.structureInventory;
    for (let i = 0; i < structureInventory.length; i++) {
      let structureId = structureInventory[i].id;
        fetch(config.API_ENDPOINT + `/structureInventory/${structureId}`, {
          method: 'PATCH',
          body: JSON.stringify(structureInventory[i]),
          headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        })
        .then(res => {
          if (!res.ok)
            return res.json().then(error => Promise.reject(error))
        })
        .catch(error => {
          console.error(error)
        })
    };
  };

  //In order to display the 'Loading Screen' we use this timer()
  //Essentially, all it does is act like a 'clicker' after 2 seconds have passed, thereby changing the Conditionals and thus activating the next Component
  timer = () => {
    setTimeout(() => this.props.handleClick('reactions'), 2000);
  };

  render() {
    return(
      <div className="reaction-box">
        <span>{this.timer()}</span>
        <h2>Loading...</h2>
      </div>
    );
  };
};

export default Loader;