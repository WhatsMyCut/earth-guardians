import React from 'react';
import { AsyncStorage, Dimensions } from 'react-native';
import { BlurView } from 'expo';
import { StoreProvider } from './store/Store';
import { Font } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import NavigationService from './navigation/navigationService';
import { graphql, ApolloProvider } from 'react-apollo';
import client from './Apollo';
import PubSub from 'pubsub-js'
import GameCompleteModal from './components/shared/modals/GameCompleteModal';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class App extends React.Component {
  // feed the store to the app
  state = {
    fontLoaded: false,
    showGameComplete: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      'Proxima Nova': require('./assets/fonts/ProximaNovaReg.ttf'),
      'Proxima Nova Bold': require('./assets/fonts/ProximaNovaBold.ttf'),
    });

    var token = PubSub.subscribe('GameComplete', this.modalHandler);

    this.setState({ fontLoaded: true });
  }

  modalHandler = (msg, data) => {
    this.setState({showGameComplete:true})
  }

  closeGameCompleteModal = () =>{
    this.setState({showGameComplete:false});
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
          {this.state.showGameComplete && (
             <BlurView
             tint="dark" 
             intensity={80}
             style={{height:SCREEN_HEIGHT, width:SCREEN_WIDTH, position:"absolute"}}
             >
            <GameCompleteModal onClose={this.closeGameCompleteModal}/>
            </BlurView>
          )}
        </ApolloProvider>
      </StoreProvider>
    );
  }
}
