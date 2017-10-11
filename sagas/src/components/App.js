import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'

import Contact from '../reducers'
import rootSaga from '../sagas'
import ContactApp from './Contact'

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  Contact,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ContactApp />
      </Provider>
    );
  }
}

export default App;
