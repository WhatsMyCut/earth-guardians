import React from 'react';
import { AsyncStorage } from 'react-native'
import { StoreProvider } from './store/Store';

import AppNavigator from './navigation/AppNavigator';
import NavigationService from './navigation/navigationService';
import { graphql, ApolloProvider } from 'react-apollo';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
// For info on how to use navigation service
// https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html#docsNav

const networkInterface = createNetworkInterface({uri: 'localhost:4400'});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    const TOKEN = AsyncStorage.getItem('EARTH_GUARDIANS_TOKEN') || null;
    // Send the login token in the Authorization header
    req.options.headers.authorization = `Bearer ${TOKEN}`;
    next();
  }
}]);

const client = new ApolloClient({
  networkInterface,
});



export default class App extends React.Component {
  // feed the store to the app
  render() {
    return (
      <StoreProvider>
        <ApolloProvider client={client}>
        <AppNavigator
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
        </ApolloProvider>
      </StoreProvider>
    );
  }
}
