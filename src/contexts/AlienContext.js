import React, { Component } from 'react';

export const nullAlien = {
  alien: {},
}

const AlienContext = React.createContext({
 alien: nullAlien,
 error: null,
});

export default AlienContext;

export class AlienProvider extends Component {
  state = {
    alien: nullAlien,
    error: null,
  };

  setError = error => {
    console.log(error)
    this.setState({ error })
  };

  clearError = () => {
    this.setState({ error: null })
  };

  setAlien = alien => {
    this.setState({ alien })
  };

  clearAlien = () => {
    this.setAlien(nullAlien)
  };



  render() {
    const values = {
      alien: this.state.alien,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setAlien: this.setAlien,
    }
    return (
      <AlienContext.Provider values={values}>
        {this.props.children}
      </AlienContext.Provider>
    )
  };
};