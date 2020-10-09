import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from '../Header/Header';
import MainScreen from '../../routes/MainScreen/MainScreen';
import Login from '../../routes/Login/Login';
import InfoFooter from '../InfoFooter/InfoFooter';
import GameplayScreen from '../../routes/GameplayScreen/GameplayScreen';
import TaskFooter from '../TaskFooter/TaskFooter';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buildMode: false,
      taskMode: false,
    };
  };

  buildModeChange = () => {
    if (this.state.buildMode === true) {
      this.setState({buildMode: false})
    } else if (this.state.buildMode === false) {
      this.setState({buildMode: true})
    };
  };

  taskModeChange = () => {
    if (this.state.taskMode === true) {
      this.setState({taskMode: false})
    } else if (this.state.taskMode === false) {
      this.setState({taskMode: true})
    };
  };

  NewGameplayScreen = props => {
    return (
      <GameplayScreen
        buildMode={this.state.buildMode}
        taskMode={this.state.taskMode}
        buildModeChange={this.buildModeChange}
        taskModeChange={this.taskModeChange}
        {...props}
      /> 
    );
  };

  renderMainRoutes() {
    return (
      <>
        <Route exact path={'/'} component={MainScreen} />
        <Route path={'/login'} component={Login} />
        <Route path={'/gameplay'} render={this.NewGameplayScreen} />
      </>
    );
  };

  renderFooterRoutes() {
    return (
      <>
        <Route exact path={'/'} component={InfoFooter} />
        <Route path={'/login'} component={InfoFooter} />
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