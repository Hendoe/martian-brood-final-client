import React, { Component } from 'react';

const ConditionalsContext = React.createContext({
  disableButtons: false,
  spawnMode: false,
  constructMode: false,
  taskMode: false,
})

export default ConditionalsContext;

export class ConditionalsProvider extends Component {
  state = {
    disableButtons: false,
    spawnMode: false,
    constructMode: false,
    taskMode: false,
  };

  test() {
    console.log('okay man')
  };

  //ALL HANDLERS FOR CONDITIONAL CHANGES
  handleBuildModeChange() {
    this.props.buildModeChange();
  };

  handleTaskModeChange() {
    this.props.taskModeChange();
  };

  handleBuildAliensModeChange = () => {
    // this.setState(prevState => ({
    //   buildAliensMode: !prevState.buildAliensMode
    // }));
    this.setState({buildAliensMode: true})
  };

  render() {
    const values = {
      buildAliens: this.state.buildAliens,
      buildStructures: this.state.buildStructures,
      handleBuildAliensModeChange: this.handleBuildAliensModeChange,
      test: this.test,
      // error: null,
    }
    return (
      <ConditionalsContext.Provider values={values}>
        {this.props.children}
      </ConditionalsContext.Provider>
    )
  };
};