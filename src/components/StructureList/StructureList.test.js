import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import StructureList from './StructureList';

it('StructureList renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <StructureList />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
});