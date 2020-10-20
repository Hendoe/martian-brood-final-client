import React, { Component } from 'react';
import { Reactor, Story } from '../../stores/Reactor';
import './Reactions.css';
import ReportContext from '../../contexts/ReportContext';
import config from '../../config';

class Reactions extends Component {
  static contextType = ReportContext

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

  //Everytime the Reactions Screen appears, there are a few things it must take into consideration
  //First, what unique string's about the Story to generate based on the Solar Day
  renderReactions() {
    let report = ""
    if (this.context.status[0]) {
      report = this.context.status[0]
    };
    if (report.solar_day === 1) {
      return <p>{Story.day1}</p>
    } else if (report.solar_day === 2) {
        return <p>{Story.day2}</p>
    } else if (report.solar_day === 3) {
      return <p>{Story.day3}</p>
    } else if (report.solar_day === 4) {
      return <p>{Story.day4}</p>
    } else if (report.solar_day === 5) {
      return <p>{Story.day5}</p>
    } else {
      return <p>Another day passes for the {report.brood_name}</p>
    };
  };

  //Second, a sentence about the Spawning situation
  renderSpawning() {
    let report = ""
    if (this.context.status[0]) {
      report = this.context.status[0]
    };
    if (report.solar_day === 1) {
      return <p>There are not many Aliens in the Brood</p>
    } else {
      if (Reactor.total_spawning_count === 0 ) {
        return <p>The Brood didn't spawn any aliens</p>
      } else if (Reactor.total_spawning_count === 1 ) {
        return <p>The Brood spawned {Reactor.total_spawning_count} alien</p>
      } else {
        return <p>The Brood spawned {Reactor.total_spawning_count} aliens</p>
      };
    };
  };

  //Third, another sentence, this time about the Constructing situation
  renderConstructing() {
    let report = ""
    if (this.context.status[0]) {
      report = this.context.status[0]
    };
    if (report.solar_day === 1) {
      return <p>The Brood has few Structures</p>
    } else {
      if (Reactor.total_constructing_count === 0 ) {
        return <p>The Brood didn't construct any structures</p>
      } else if (Reactor.total_constructing_count === 1 ) {
        return <p>The Brood constructed {Reactor.total_constructing_count} structure</p>
      } else {
        return <p>The Brood constructed {Reactor.total_constructing_count} structures</p>
      };
    };
  };  

  render() {
    const { status } = this.context
    let report = ""
    if (status[0]) {
      report = status[0]
    };

    return(
      <div className="reaction-box">
        <p>End of Solar Day {(report.solar_day - 1)}</p>
        {this.renderReactions()}
        {this.renderSpawning()}
        {this.renderConstructing()}
        <button className='reaction-button' onClick={() => this.props.handleClick('cancel')}>OK</button>
      </div>
    );
  };
};

export default Reactions;