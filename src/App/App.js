import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from '../Header/Header';
import MainScreen from '../MainScreen/MainScreen';
import InfoFooter from '../InfoFooter/InfoFooter';
import GameplayScreen from '../GameplayScreen/GameplayScreen';
import TaskFooter from '../TaskManager/TaskFooter';
import AlienBuilder from '../AlienBuilder/AlienBuilder';
import AlienStructuresBuilder from '../AlienStructuresBuilder/AlienStructuresBuilder';
import TaskManager from '../TaskManager/TaskManager';
import Reactions from '../Reactions/Reactions';
import './App.css';

class App extends Component {

  renderMainRoutes() {
    return (
      <>
        <Route exact path={'/'} component={MainScreen} />
        <Route path={'/gameplay'} component={GameplayScreen} />
      </>
    );
  };

  renderFooterRoutes() {
    return (
      <>
        <Route exact path={'/'} component={InfoFooter} />
        <Route path={'/gameplay'} component={TaskFooter} />
        <Route exact path={'/gameplay/build-aliens'} component={AlienBuilder} />
        <Route exact path={'/gameplay/build-structures'} component={AlienStructuresBuilder} />
        <Route path={'/gameplay/task-manager'} component={TaskManager} />
        <Route path={'/gameplay/reaction'} component={Reactions} />
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