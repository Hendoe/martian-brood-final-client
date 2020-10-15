import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AlienSpawner from './AlienSpawner';

it('AlienSpawner renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <AlienSpawner />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
});