import {Provider} from 'react-redux';
import configureStore, {history} from './store/configureStore';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Initialize store
const store = configureStore();

const render = () => {
  ReactDOM.render(
    <Provider store={ store }>
      <App history={ history } />
    </Provider>,
    document.getElementById('content')
  );
};

render();
