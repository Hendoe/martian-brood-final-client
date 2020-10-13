import React, { Component } from 'react';

const ReportContext = React.createContext({
  status: {},
  setStatus: () => {},
  updateSolarDay: () => {},
  aliens: {},
  setAliens: () => {},
  structures: {},
  setStructures: () => {},
})
export default ReportContext

export class ReportProvider extends Component {
  state = {
    status: {},
    aliens: {},
    structures: {},
  };

  //USED TO ADJUST THE STATES AS NEEDED AND SET INITIAL STATES
  setStatus = status => {
    console.log('SETTING STATUS')
    this.setState({ status });
  };

  setAliens = aliens => {
    console.log('SETTING ALIENS')
    this.setState({ aliens });
  };

  setStructures = structures => {
    console.log('SETTING STRUCTURES')
    this.setState({ structures });
  };

  //UPDATES THE SOLAR DAY
  updateSolarDay = () => {
    console.log('NEW SOLAR DAY', this.state.status[0].solar_day);
    let oldSolarDay = this.state.status[0].solar_day;
    let newSolarDay = (oldSolarDay += 1);
    let newStatus = {
      aliens: this.state.status[0].aliens,
      biomass: this.state.status[0].biomass,
      brood_name: this.state.status[0].brood_name,
      id: this.state.status[0].id,
      solar_day: newSolarDay,
      structures: this.state.status[0].structures,
      synapse_produced: this.state.status[0].synapse_produced,
      synapse_required: this.state.status[0].synapse_required,
    };
    this.setStatus(newStatus);
  };

  render() {
    const value = {
      status: this.state.status,
      setStatus: this.setStatus,
      updateSolarDay: this.updateSolarDay,
      aliens: this.state.aliens,
      setAliens: this.setAliens,
      structures: this.state.structures,
      setStructures: this.setStructures,
    }
    return (
      <ReportContext.Provider value={value}>
        {this.props.children}
      </ReportContext.Provider>
    )
  };
};