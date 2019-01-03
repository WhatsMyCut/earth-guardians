import React from 'react';
import { AsyncStorage } from 'react-native';
import { StoreProvider } from './store/Store';
import { Font } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import NavigationService from './navigation/navigationService';
import { graphql, ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getFragmentDefinitions, getMainDefinition } from 'apollo-utilities';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';

import { RetrieveData } from './store/AsyncStore';

const httpLink = new HttpLink({
  uri: `https://egdemobackend.herokuapp.com/`
});

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(
        'multiple errors',
        JSON.stringify({ message, locations, path })
      );
      return message;
    });
  }

  if (networkError) {
    console.log(`Network error: ${networkError}`);
  }
});

const authLink = setContext((_, context) => {
  const headers = { ...context.headers };
  const token = RetrieveData('EARTH_GUARDIANS_TOKEN'); // retrieve from asyncstorage
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  return {
    ...context,
    headers,
  };
});

// For info on how to use navigation service
// https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html#docsNav

const client = new ApolloClient({
  ssrForceFetchDelay: 100,
  link: ApolloLink.from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default class App extends React.Component {
  // feed the store to the app
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'Proxima Nova': require('./assets/fonts/ProximaNovaReg.ttf'),
      'Proxima Nova Bold': require('./assets/fonts/ProximaNovaBold.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    // console.disableYellowBox = true;
    const { fontLoaded } = this.state;
    if (!fontLoaded) {
      return null;
    }
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
