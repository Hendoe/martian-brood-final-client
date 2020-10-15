import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Reactions from './Reactions';

it('Reactions renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <Reactions />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
});