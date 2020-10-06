import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  render() {
    return(
    <nav className="nav-style">
      <span className="left"><h3>About</h3></span>
      <span className="center"><h2><a href="/">Martian Brood</a></h2></span>
      <span className="right"><h3>How to Play</h3></span>
    </nav>
    );
  };
};

export default Header;