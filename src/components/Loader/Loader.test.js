import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Loader from './Loader';

it('Loader renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <Loader />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
});