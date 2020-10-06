import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from '../Header/Header';
import MainScreen from '../MainScreen/MainScreen';
import InfoFooter from '../InfoFooter/InfoFooter';
import GameplayScreen from '../GameplayScreen/GameplayScreen';
import TaskFooter from '../TaskManager/TaskFooter';
import TaskFooterDisabled from '../TaskManager/TaskFooterDisabled';
import TaskMaster from '../TaskManager/TaskMaster';
import Reactions from '../Reactions/Reactions';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buildMode: false,
    };
  };

  buildModeChange = () => {
    if (this.state.buildMode === true) {
      this.setState({buildMode: false})
    } else if (this.state.buildMode === false) {
      this.setState({buildMode: true})
    };
  };

  NewGameplayScreen = props => {
    return (
      <GameplayScreen
        buildMode={this.state.buildMode}
        buildModeChange={this.buildModeChange}
        {...props}
      /> 
    );
  };

  NewTaskScreen = props => {
    return (
      <TaskFooter
        buildMode={this.state.buildMode}
        {...props}
      /> 
    );
  };

  renderMainRoutes() {
    return (
      <>
        <Route exact path={'/'} component={MainScreen} />
        <Route path={'/gameplay'} render={this.NewGameplayScreen} />
        <Route path={'/task-master'} component={TaskMaster} />
        <Route path={'/reaction'} component={Reactions} />
      </>
    );
  };

  renderFooterRoutes() {
    return (
      <>
        <Route exact path={'/'} component={InfoFooter} />
        <Route path={'/gameplay'} component={this.NewTaskScreen} />
        <Route path={'/task-master'} component={TaskFooterDisabled} />
        <Route path={'/reaction'} component={TaskFooterDisabled} />
      </>
    );
  };

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <Header />
        </header>
        <main className='App-Main'>{this.renderMainRoutes()}</main>
        <footer className='App-Footer'>{this.renderFooterRoutes()}</footer>
      </div>
    );
  };
};

export default App;