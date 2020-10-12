import React, { Component } from 'react';
import StatusApiService from '../services/status-api-service';

const StatusContext = React.createContext({
  status: [{name: 'woa'}],
  setStatus: () => {
    console.log('setting')
  },
})
export default StatusContext

export class StatusProvider extends Component {
  state = {
    status: [],
  };

  setStatus = () => {
    let status = StatusApiService.getStatus();
    
    this.setState({ status })
  }

  render() {
    const value = {
      status: this.state.status,
      setStatus: this.setStatus,
    }
    return (
      <StatusContext.Provider value={value}>
        {this.props.children}
      </StatusContext.Provider>
    )
  };
};