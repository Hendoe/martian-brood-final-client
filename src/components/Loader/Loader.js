import React, { Component } from 'react';
import config from '../../config';
import ReportContext from '../../contexts/ReportContext';
import { StatusApiService } from '../../services/report-api-services';
import './Loader.css';

//The Loader is responsible for handling the transaction between the Client and Server
//At the end of every turn the API must be updated with information about the player
//Then, when the Component unmounts, the Client needs to make sure it's getting exactly what it should be 
class Loader extends Component {
  static contextType = ReportContext;

  //REDO THIS COMMENT
  //Once the Component Mounts the game will need access to all the information about the player
  //Thus, we call on 3 GET requests to fetch the info from the server
  //An attempt is being made to simplify this process with Promise.all
  //Lastly, the page updates to be sure it's displaysing proper data
  componentDidMount() {
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

  //Once the Component Mounts the game will need access to all the information about the player
  //Thus, we call on 3 GET requests to fetch the info from the server
  //An attempt is being made to simplify this process with Promise.all
  //Lastly, the page updates to be sure it's displaying proper data
  componentWillMount() {
    StatusApiService.getStatus()
      .then(this.context.setStatus)
    StatusApiService.getAliens()
      .then(this.context.setAliens)
    StatusApiService.getAlienInventory()
      .then(this.context.setAlienInventory)
    StatusApiService.getStructures()
      .then(this.context.setStructures)
    StatusApiService.getStructureInventory()
      .then(this.context.setStructureInventory)
    // StatusApiService.GETmaster()
      // .then(this.context.setStatus)
      // .then(this.context.setAliens)
      // .then(this.context.setStructures) 
    this.forceUpdate();
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