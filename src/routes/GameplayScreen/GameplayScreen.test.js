import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import GameplayScreen from './GameplayScreen';

it('GameplayScreen renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <GameplayScreen />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
});