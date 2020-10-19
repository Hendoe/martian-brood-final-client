import React, { Component } from 'react';
import './Loader.css';

class Reactions extends Component {
  timer = () => {
    setTimeout(() => this.props.handleClick('reactions'), 2000);
  };

  render() {
    return(
      <div className="reaction-box">
        <span>{this.timer()}</span>
        <h2>Loading...</h2>
      </div>
    );
  };
};

export default Reactions;