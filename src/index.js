import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { BrowserRouter } from 'react-router-dom';
import { ReportProvider } from './contexts/ReportContext';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <ReportProvider>
      <App />
    </ReportProvider>
  </BrowserRouter>,
  document.getElementById('root')
  );