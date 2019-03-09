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
  NotificationModal,
  ZipCodeModal
} from './components/shared/modals/';
import { styles, defaults } from './constants/Styles';
import ModalComponent from './components/shared/modals/ModalComponent';
export default class App extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    fontLoaded: false,
    showGameComplete: false,
    showZipCodeModal: false,
    showNotificationModal: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'Proxima Nova': require('./assets/fonts/ProximaNovaReg.ttf'),
      'Proxima Nova Bold': require('./assets/fonts/ProximaNovaBold.ttf'),
    });

    PubSub.subscribe('showZipCodeModal', data => this.openZipCodeModal(data));
    PubSub.subscribe('closeModal', this.closeModal);
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

  openZipCodeModal = (data) => {
    console.log('here2', data)
    this.setState({ showZipCodeModal: true});
  }

  closeModal = () => this.setState({ showZipCodeModal : false });

  render() {
    // console.disableYellowBox = true;
    const { fontLoaded, showZipCodeModal } = this.state;
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

          {showZipCodeModal &&
            <ModalComponent display={'ZipCodeModal'} onClose={() => this.closeModal()} />
          }
          {/* {this.state.showGameComplete && (
            <ModalComponent>
              <GameCompleteModal onClose={this.closeGameCompleteModal}/>
            </ModalComponent>
          )}
          {this.state.showNotificationModal && (
            <ModalComponent>
              <NotificationModal onClose={this.closeNotificationModal} notification={this.state.notification}/>
            </ModalComponent>
          )} */}
        </ApolloProvider>
      </StoreProvider>
    );
  }
}
