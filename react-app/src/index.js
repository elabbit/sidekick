import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal'
import CalendarWrapper from './context/CalendarWrapper';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <CalendarWrapper>
          <App />
        </CalendarWrapper>
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
