import React, { Component } from 'react';

const ConditionalsContext = React.createContext({
  buildAliens: false,
  buildStructures: false,


  // article: nullArticle,
  // comments: [],
  // error: null,
  // setError: () => {},
  // clearError: () => { },
  // setArticle: () => {},
  // clearArticle: () => {},
  // setComments: () => {},
  // addComment: () => {},
})

export default ConditionalsContext;

export class ConditionalsProvider extends Component {
  state = {
    buildAliensMode: false,
    buildStructuresMode: false,
    // error: null,
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
      handleBuildAliensModeChange: this.handleBuildAliensModeChange
      // error: null,
    }
    return (
      <ConditionalsContext.Provider values={values}>
        {this.props.children}
      </ConditionalsContext.Provider>
    )
  };
};