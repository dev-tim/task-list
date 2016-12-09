import React from 'react';
import {render} from 'react-dom';
import configureStore from './redux/store';
import {AppContainer} from 'react-hot-loader';
import Root from './containers/root';

const WunderApp = window.WunderApp || {};
const store = configureStore(WunderApp.data || {});

let entryComponent;

if (__DEV__) {
  console.log('boo', __DEV__)
  entryComponent = <AppContainer>
    <Root store={store}/>
  </AppContainer>
} else {
  entryComponent = <Root store={store}/>
}

render(
  entryComponent,
  document.getElementById('root')
);

if (module.hot && __DEV__) {
  module.hot.accept('./containers/root', () => {
     console.log('Foo', __DEV__);
    const NewRoot = require('./containers/root');
    console.log('New', NewRoot);
    render(
      <AppContainer>
        <NewRoot store={store}/>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
