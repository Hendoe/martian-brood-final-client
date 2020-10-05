import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  render() {
    return(
    <nav class="nav-style">
      <span class="left"><h3>About</h3></span>
      <span class="center"><h2><a href="/">Martian Brood</a></h2></span>
      <span class="right"><h3>How to Play</h3></span>
    </nav>
    );
  };
};

export default Header;