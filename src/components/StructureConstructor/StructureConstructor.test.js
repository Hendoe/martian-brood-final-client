import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import StructureConstructor from './StructureConstructor';

it('StructureConstructor renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <StructureConstructor />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
});