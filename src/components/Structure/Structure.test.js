import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Structure from './Structure';

it('Structure renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <Structure />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
});