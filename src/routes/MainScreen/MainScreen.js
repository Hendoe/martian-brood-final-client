import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MainScreen.css';
import config from '../../config';

class MainScreen extends Component {
  //Before anything else can happen, we'll need to make sure the database is where we want it for Quickplay
  //To accomplish this, we use an basic state here
  constructor(props) {
    super(props);
    this.state = {
      status: [{
        id: 1,
        brood_name: 'Grongs',
        solar_day: 1,
        biomass: 50,
        synapse_produced: 5,
        synapse_required: 1,
      }],
      alienInventory: [
        {
          id: 1,
          alien_name: 'Worker Drone',
          spawning_count: 0,
          brood_count: 0,
        },
        {
          id: 2,
          alien_name: 'Brood Master',
          spawning_count: 0,
          brood_count: 1,
        },
      ],
      structureInventory: [
        {   
          id: 1,
          structure_name: 'Spawning Pit',
          constructing_count: 0,
          brood_count: 0,

        },
        {   
          id: 2,
          structure_name: 'Synapse Clusters',
          constructing_count: 0,
          brood_count: 0,
        },
      ],
    };
  };
  
  //Then, once the component mounts, we patch our database with all of our beginner values
  componentDidMount() {
    this.state.status.map(newStatus => (
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
    let alienInventory = this.state.alienInventory;
    for (let i = 0; i < alienInventory.length; i++) {
      let alienId = alienInventory[i].id;
      fetch(config.API_ENDPOINT + `/alienInventory/${alienId}`, {
        method: 'PATCH',
        body: JSON.stringify(this.state.alienInventory[i]),
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
    let structureInventory = this.state.structureInventory;
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

  render() {
    return(
      <section className='main-style'>
        <Link to='/create'><h1>Create</h1></Link>
        <br />
        <Link to='/continue'><h1>Continue</h1></Link>
        <br />
        <Link to='/gameplay'><h1>Quickplay</h1></Link>
      </section>
    );
  };
};

export default MainScreen;