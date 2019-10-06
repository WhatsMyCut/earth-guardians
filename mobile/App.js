import React from 'react';
import { TouchableWithoutFeedback, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import { Notifications } from 'expo';
import { StoreProvider } from './store/Store';
import * as Font from 'expo-font';
import AppNavigator from './navigation/AppNavigator';
import NavigationService from './navigation/navigationService';
import { ApolloProvider } from 'react-apollo';
import client from './Apollo';
import PubSub from 'pubsub-js'
import { styles, defaults } from './constants/Styles';
import ModalComponent from './components/shared/modals/ModalComponent';
export default class App extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    fontLoaded: false,
    showGameComplete: false,
    showNotificationModal: false,
    showBlur: false,
    showCarbonModal: false,
    showWasteModal: false,
    showWaterModal: false,
    showUpdateProfileModal: false,
    showRedirectModal: false,
    redirect_url: null,
    showGameCompleteModal: false,
    showCongratulationsModal: false,
    notification: {
      data: {
        message: 'Here I am. Rock me like a hurricane.'
      }
    }
  };

  async componentDidMount() {
    await Font.loadAsync({
      'Proxima Nova': require('./assets/fonts/ProximaNovaReg.ttf'),
      'Proxima Nova Bold': require('./assets/fonts/ProximaNovaBold.ttf'),
    });

    PubSub.subscribe('showUpdateProfileModal', data => this.openUpdateUserModal(data));
    PubSub.subscribe('showRedirectModal', (msg, data) => this.openRedirectModal(msg, data));
    PubSub.subscribe('closeModal', this.closeModal);
    PubSub.subscribe('openBlur', this.openBlur);
    PubSub.subscribe('closeBlur', this.closeBlur);
    PubSub.subscribe('showNotificationModal', (msg, data) => this.showNotificationModal(msg, data));
    PubSub.subscribe('closeNotificationModal', (msg, data) => this.closeNotificationModal(msg, data));
    PubSub.subscribe('showWasteModal', (msg, data) => this.openWasteModal((msg, data)))
    PubSub.subscribe('showWaterModal', (msg, data) => this.openWaterModal((msg, data)));
    PubSub.subscribe('openCarbonModal', (msg, data) => this.openCarbonModal((msg, data)));
    PubSub.subscribe('openGameCompleteModal', (msg, data) => this.openGameCompleteModal((msg, data)));
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
    this.setState({ fontLoaded: true });
  }

  _handleNotification = (notification) => {
    console.log('incoming notification', notification)
    this.setState({ showBlur: true, showNotificationModal: true, notification: notification });
  };

  openBlur = () => {
    this.setState({ showBlur: true })
  }

  closeBlur = () => {
    this.setState({ showBlur: false, })
  };

  closeGameCompleteModal = () =>{
    this.closeModal()
    this.setState({ showGameComplete:false });
  }

  closeNotificationModal = () => {
    this.closeBlur()
    this.setState({ showNotificationModal: false, notification: null })
  }

  openCarbonModal = (data) => {
    console.log('App.openCarbonModal', data)
    this.setState({ carbon_dioxide: data, showCarbonModal: true, showBlur: true })
  }

  openWaterModal = (data) => {
    console.log('App.openWaterModal', data)
    this.setState({ water: data, showWaterModal: true, showBlur: true })
  }

  openWasteModal = (data) => {
    console.log('App.openWasteModal', data)
    this.setState({ waste: data, showWasteModal: true, showBlur: true })
  }

  openGameCompleteModal = (data) => {
    console.log('App.openGameCompleteModal', data)
    this.setState({ showGameCompleteModal: true, showBlur: true })
  }

  openRedirectModal = (msg, data) => {
    console.log('openRedirectModal', msg, data)
    this.closeAll()
    this.setState({ showRedirectModal: true, redirect_url: data });
  }

  closeActionModal = () => {
    this.setState({
      showBlur: false,
      showCarbonModal: false,
      showWasteModal: false,
      showWaterModal: false,
      showCongratulationsModal: false,
      showGameCompleteModal: false,
      showRedirectModal: false,
      redirect_url: null
    })
  }

  render() {
    // console.disableYellowBox = true;
    const {
      fontLoaded,
      showBlur,
      showNotificationModal,
      showCarbonModal,
      showWaterModal,
      showWasteModal,
      showGameCompleteModal,
      water,
      waste,
      carbon_dioxide,
    } = this.state;
    if (!fontLoaded) {
      return null;
    }

    const showBlurred = (showBlur || showNotificationModal);
    let display = '';
    if (showCarbonModal) display = 'CarbonModal'
    else if (showWaterModal) display = 'WaterModal'
    else if (showWasteModal) display = 'WasteModal'
    else if (showGameCompleteModal) display = 'GameCompleteModal'
    const showActionModal = display !== '';
    return (
      <StoreProvider>
        <ApolloProvider client={client}>
          <AppNavigator
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
          {showBlurred &&
            <BlurView
              tint="dark"
              intensity={80}
              style={[
                styles.container,
                styles.coverScreen,
                styles.coverAll,
                {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 20
                }
              ]}
              onPress={() => {
              this.closeBlur()
            }}
            />
          }
          {this.state.showNotificationModal &&
            <ModalComponent
              display={'NotificationModal'}
              visible={this.state.showNotificationModal}
              onClose={() => this.closeBlur}
              notification={this.state.notification}
              notificationClose={this.closeNotificationModal}
            />
          }
          {showActionModal && (
            <ModalComponent
              display={display}
              visible={showActionModal}
              onClose={() => this.closeActionModal()}
              water={water}
              waste={waste}
              carbon_dioxide={carbon_dioxide}
            />
          )}
        </ApolloProvider>
      </StoreProvider>
    );
  }
}
