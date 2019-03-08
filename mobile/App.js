import React from 'react';
import { TouchableWithoutFeedback, Text } from 'react-native';
import { BlurView, Notifications } from 'expo';
import { StoreProvider } from './store/Store';
import { Font } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import NavigationService from './navigation/navigationService';
import { graphql, ApolloProvider } from 'react-apollo';
import client from './Apollo';
import PubSub from 'pubsub-js'
import {
  GameCompleteModal,
  NotificationModal
} from './components/shared/modals/NotificationModal';
import { styles, defaults } from './constants/Styles';
import ModalComponent from './components/shared/modals/ModalComponent';
export default class App extends React.Component {
  // feed the store to the app
  constructor(props) {
    super(props);
    this.openModal = this.openAModal.bind(this);
    this.closeModal = this.closeAModal.bind(this);
  }

  state = {
    fontLoaded: false,
    showGameComplete: false,
    showAModal: false,
    showNotificationModal: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'Proxima Nova': require('./assets/fonts/ProximaNovaReg.ttf'),
      'Proxima Nova Bold': require('./assets/fonts/ProximaNovaBold.ttf'),
    });

    var token = PubSub.subscribe('GameComplete', this.modalHandler);
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
    this.setState({ fontLoaded: true });
  }

  _handleNotification = (notification) => {
    console.log('incoming notification', notification)
    // this.setState({notification: notification});
    this.setState({showNotificationModal: true, notification: notification});
  };

  modalHandler = (msg, data) => {
    this.setState({showGameComplete:true})
  }

  closeGameCompleteModal = () =>{
    this.setState({showGameComplete:false});
  }

  closeNotificationModal = () => {
    this.setState({ showNotificationModal : false, notification: null})
  }

  openAModal() {
    console.log("openAModal", this.state)
    this.setState({showAModal: true, });
  }

  closeAModal = () => {
    console.log('closeAModal', this.state)
    this.setState({showAModal: false, showWaterModal : false, showCarbonModal: false, showZipcodeModal:false});
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

          {this.state.showAModal &&
            <ModalComponent openModal={() => this.openAModal()} closeModal={() => this.closeAModal()}>
              <Text style={[styles.centerAll, styles.textWhiteBold]}>Modal Component</Text>
            </ModalComponent>
          }
          {this.state.showGameComplete && (
            <ModalComponent>
              <GameCompleteModal onClose={this.closeGameCompleteModal}/>
            </ModalComponent>
          )}
          {this.state.showNotificationModal && (
            <ModalComponent>
              <NotificationModal onClose={this.closeNotificationModal} notification={this.state.notification}/>
            </ModalComponent>
          )}
        </ApolloProvider>
      </StoreProvider>
    );
  }
}
