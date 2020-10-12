import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from '../Header/Header';
import MainScreen from '../../routes/MainScreen/MainScreen';
import Login from '../../routes/Login/Login';
import InfoFooter from '../InfoFooter/InfoFooter';
import GameplayScreen from '../../routes/GameplayScreen/GameplayScreen';
import './App.css';

class App extends Component {
  blankFooter() {
    return (
      <div></div>
    );
  };

  renderMainRoutes() {
    return (
      <>
        <Route exact path={'/'} component={MainScreen} />
        <Route path={'/login'} component={Login} />
        <Route path={'/gameplay'} component={GameplayScreen} />
      </>
    );
  };

  renderFooterRoutes() {
    return (
      <>
        <Route exact path={'/'} component={InfoFooter} />
        <Route path={'/login'} component={InfoFooter} />
        <Route path={'/gameplay'} render={this.blankFooter}/>
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
        <footer>{this.renderFooterRoutes()}</footer>
      </div>
    );
  };
};

export default App;