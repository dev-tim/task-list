import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import DevTools from 'containers/devtools';
import App from 'containers/app';

function initDevtools() {
  // render devtools if no dev tools extension located and we are in dev mode
  return (!window.devToolsExtension && __DEV__) ? <DevTools /> : null;
}

class Root extends React.Component {

  static propTypes = {
    store: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          { initDevtools() }
          <App/>
        </div>
      </Provider>
    );
  }
}

export default Root;

