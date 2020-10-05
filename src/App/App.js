import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from '../Header/Header';
import MainScreen from '../MainScreen/MainScreen';
import InfoFooter from '../InfoFooter/InfoFooter';
import GameplayScreen from '../GameplayScreen/GameplayScreen';
import AlienBuilder from '../GameplayScreen/AlienBuilder/AlienBuilder';
import AlienStructuresBuilder from '../GameplayScreen/AlienStructuresBuilder/AlienStructuresBuilder';
import TaskFooter from '../TaskManager/TaskFooter';
import TaskFooterDisabled from '../TaskManager/TaskFooterDisabled';
import TaskMaster from '../TaskManager/TaskMaster';
import Reactions from '../Reactions/Reactions';
import './App.css';

class App extends Component {

  renderMainRoutes() {
    return (
      <>
        <Route exact path={'/'} component={MainScreen} />
        <Route path={'/gameplay'} component={GameplayScreen} />
        <Route path={'/build-aliens'} component={AlienBuilder} />
        <Route path={'/build-structures'} component={AlienStructuresBuilder} />
        <Route path={'/task-master'} component={TaskMaster} />
        <Route path={'/reaction'} component={Reactions} />
      </>
    );
  };

  renderFooterRoutes() {
    return (
      <>
        <Route exact path={'/'} component={InfoFooter} />
        <Route path={'/gameplay'} component={TaskFooter} />
        <Route path={'/build-aliens'} component={TaskFooterDisabled} />
        <Route path={'/build-structures'} component={TaskFooterDisabled} />
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