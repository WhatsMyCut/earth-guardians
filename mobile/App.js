import React from 'react';
import { AsyncStorage } from 'react-native';
import { StoreProvider } from './store/Store';
import { Font } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import NavigationService from './navigation/navigationService';
import { graphql, ApolloProvider } from 'react-apollo';
import client from './Apollo';

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
