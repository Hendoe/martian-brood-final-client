import React, { Component } from 'react';

const AliensContext = React.createContext({
  aliens: [],
  error: null,
});

export default AliensContext;

export class AliensProvider extends Component {
  state = {
    aliens: [],
    error: null,
  };

  setError = error => {
    console.log(error)
    this.setState({ error })
  };

  clearError = () => {
    this.setState({ error: null })
  };
  
  setAliens = aliens => {
    this.setState({ aliens })
  };

  render() {
    const values = {
      aliens: this.state.aliens,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setAliens: this.setAliens,
    }
    return (
      <AliensContext.Provider values={values}>
        {this.props.children}
      </AliensContext.Provider>
    )
  };
};