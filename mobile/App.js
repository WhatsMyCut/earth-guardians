import React from 'react';

import { StoreProvider } from './store/Store';

import LandingPage from './components/LandingPage';

export default class App extends React.Component {
  // feed the store to the app
  render() {
    return (
      <StoreProvider>
        <LandingPage />
      </StoreProvider>
    );
  }
}
