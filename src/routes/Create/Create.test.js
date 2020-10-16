import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Create from './Create';

it('Create renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <Create />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
});