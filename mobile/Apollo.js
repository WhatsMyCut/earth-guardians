import React from 'react';
import { AsyncStorage } from 'react-native'
import { StoreProvider } from './store/Store';

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

const httpLink = new HttpLink({
  uri: `https://us1.prisma.sh/daniel-ashcraft-a99d55/earth_guardians/dev?headers={"Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDQ4MDY3MTYsIm5iZiI6MTU0NDcyMDMxNn0.gbuXTavijNiDgW_A9U5grNMdqzUlpfS8qzCWQm1naKI"}`
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
  const token = AsyncStorage.getItem('EARTH_GUARDIANS_TOKEN');
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  return {
    ...context,
    headers
  };
});


// For info on how to use navigation service
// https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html#docsNav


export default Client = new ApolloClient({
  ssrForceFetchDelay: 100,
  link : ApolloLink.from([
    authLink,
    errorLink,
    httpLink
  ]),
  cache: new InMemoryCache()
});

