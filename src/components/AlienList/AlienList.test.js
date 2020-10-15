import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AlienList from './AlienList';

it('AlienList renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <AlienList />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
});