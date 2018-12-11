import React from 'react';

import { StoreProvider } from './store/Store';

import AppNavigator from './navigation/AppNavigator';
import NavigationService from './navigation/navigationService';


// For info on how to use navigation service
// https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html#docsNav

export default class App extends React.Component {
  // feed the store to the app
  render() {
    console.log('this is working');
    return (
      <StoreProvider>
        <AppNavigator ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }} />
      </StoreProvider>
    );
  }
}
