import React, { Component } from 'react';
import './Alien.css';

class Alien extends Component {
  render() {
    const { name, hp, atk, cost, synapse, desc, features } = this.props
    console.log(this.props)
    return (
      <section>
        <div className='Alien'>
          <p className='Alien__name'>
            {name}
          </p>
        </div>
        <div className='Alien'>
          <p className='Alien__hp'>
            {hp}
          </p>
        </div>
        <div className='Alien'>
          <p className='Alien__atk'>
            {atk}
          </p>
        </div>
        <div className='Alien'>
          <p className='Alien__cost'>
            {cost}
          </p>
        </div>
        <div className='Alien'>
          <p className='Alien__synapse'>
            {synapse}
          </p>
        </div>
        <div className='Alien'>
          <p className='Alien__desc'>
            {desc}
          </p>
        </div>
        <div className='Alien'>
          <p className='Alien__features'>
            {features}
          </p>
        </div>
      </section>
    );
  };
};

export default Alien;