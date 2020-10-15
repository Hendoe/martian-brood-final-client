import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import InfoFooter from './InfoFooter';

it('InfoFooter renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <InfoFooter />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
});