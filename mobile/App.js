import React from 'react';
import { TouchableWithoutFeedback, Text } from 'react-native';
import { BlurView, Notifications } from 'expo';
import { StoreProvider } from './store/Store';
import { Font } from 'expo';
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
    showModal: false,
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

    PubSub.subscribe('showZipCodeModal', data => this.openZipCodeModal(data));
    PubSub.subscribe('showNotificationModal', data => this.showNotificationModal(data));
    PubSub.subscribe('closeBlur', this.closeBlur);
    PubSub.subscribe('closeNotificationModal', this.closeNotificationModal);
    PubSub.subscribe('openBlur', this.openBlur);
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
    this.setState({ fontLoaded: true });
  }

  _handleNotification = (notification) => {
    console.log('incoming notification', notification)
    // this.setState({notification: notification});
    this.setState({ showNotificationModal: true, notification: notification });
  };

  updateZipCode =(zipcode)=>{
    const { get_user, update_zipcode} = this.props;
    if(zipcode){
      let variables={
        id:get_user.me.id,
        zipcode:zipcode
      }
      update_zipcode({variables}).then(()=>{
          this.onModalClose();
      })
    }
  }

  openBlur = () => {
    this.setState({showModal:true})
  }

  closeBlur = () => {
    console.log('App.closeModal')
    this.setState({
      showNotificationModal: false,
      showModal: false,
    })
  };

  closeGameCompleteModal = () =>{
    this.closeModal()
    this.setState({showGameComplete:false});
  }

  closeNotificationModal = () => {
    this.closeBlur()
    this.setState({ notification: null})
  }

  openZipCodeModal = (data) => {
    this.closeModal()
    this.setState({ showZipCodeModal: true});
  }

  render() {
    // console.disableYellowBox = true;
    const { fontLoaded, showZipCodeModal } = this.state;
    if (!fontLoaded) {
      return null;
    }

    const showBlur = (this.state.showModal || this.state.showNotificationModal)
    return (
      <StoreProvider>
        <ApolloProvider client={client}>
          <AppNavigator
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
          {showBlur &&
            <TouchableWithoutFeedback
              onPress={() => {
                this.closeBlur()
              }}
            >
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
              />
            </TouchableWithoutFeedback>
          }
          {this.state.showNotificationModal && (
            <ModalComponent
              showModal={'NotificationModal'}
              display={showBlur}
              onClose={() => this.closeBlur}
              notification={this.state.notification}
              notificationClose={this.closeNotificationModal}
            />
          )}

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
