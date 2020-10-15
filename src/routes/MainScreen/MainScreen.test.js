import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import MainScreen from './MainScreen';

it('MainScreen renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <MainScreen />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
});