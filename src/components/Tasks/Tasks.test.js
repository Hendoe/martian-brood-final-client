import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Tasks from './Tasks';

it('Tasks renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <Tasks />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
});