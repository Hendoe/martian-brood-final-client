import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Continue from './Continue';

it('Continue renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <Continue />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
});