import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import TaskFooter from './TaskFooter';

it('TaskFooter renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <TaskFooter />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
});