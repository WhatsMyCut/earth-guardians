import React from 'react';

import { StoreProvider } from './store/Store';

import AppNavigator from './navigation/AppNavigator';

export default class App extends React.Component {
  // feed the store to the app
  render() {
    return (
      <StoreProvider>
        <AppNavigator />
      </StoreProvider>
    );
  }
}
