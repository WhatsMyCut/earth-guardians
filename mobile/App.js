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
    showWasteModal: false,
    showWaterModal: false,
    showCarbonModal:false,
    showZipCodeModal: false,
    showUpdateProfileModal: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'Proxima Nova': require('./assets/fonts/ProximaNovaReg.ttf'),
      'Proxima Nova Bold': require('./assets/fonts/ProximaNovaBold.ttf'),
    });

    PubSub.subscribe('setUser', data => this.setUser(data))
    PubSub.subscribe('showZipCodeModal', data => this.openZipCodeModal(data));
    PubSub.subscribe('showUpdateProfileModal', data => this.openUpdateUserModal(data));
    PubSub.subscribe('closeModal', this.closeModal);
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
    this.setState({ fontLoaded: true });
  }

  _handleNotification = (notification) => {
    console.log('incoming notification', notification)
    // this.setState({notification: notification});
    this.setState({showNotificationModal: true, notification: notification});
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

  modalHandler = (msg, data) => {
    this.setState({showGameComplete:true})
  }

  closeGameCompleteModal = () =>{
    this.closeAll()
    this.setState({showGameComplete:false});
  }

  closeNotificationModal = () => {
    this.closeAll()
    this.setState({ showNotificationModal : false, notification: null})
  }

  openZipCodeModal = (data) => {
    this.closeAll()
    this.setState({ showZipCodeModal: true});
  }

  openUpdateUserModal = (data) => {
    this.closeAll()
    this.setState({ showUpdateProfileModal: true });
  }

  setUser = (data) => {
    console.log('setUser', data)
    this.setState({ user: data.user })
  }

  closeAll = () => this.setState({
    showNotificationModal: false,
    showWasteModal: false,
    showWaterModal: false,
    showCarbonModal:false,
    showZipCodeModal: false,
    showUpdateProfileModal: false,
  });

  render() {
    // console.disableYellowBox = true;
    const { fontLoaded, showZipCodeModal } = this.state;
    if (!fontLoaded) {
      return null;
    }

    const showModal = this.state.showZipCodeModal ||
    this.state.showCarbonModal ||
    this.state.showWasteModal ||
    this.state.showWaterModal ||
    this.state.showUpdateProfileModal ||
    this.state.showNotificationModal
    let displayModal;
    if (showModal) {
      if (this.state.showZipCodeModal) {
        displayModal = 'ZipCodeModal'
      } else if (this.state.showCarbonModal) {
        displayModal = 'NotC02EmissionModal'
      } else if (this.state.showWasteModal) {
        displayModal = 'NotWasteReduceModal'
      } else if (this.state.showWaterModal) {
        displayModal = 'NotH2OConsumptionModal'
      } else if (this.state.showUpdateProfileModal) {
        displayModal = 'UpdateUserModal'
      } else if (this.state.showNotificationModal) {
        displayModal = 'NotificationModal'
      }
    }

    return (
      <StoreProvider>
        <ApolloProvider client={client}>
          <AppNavigator
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />

          {showModal &&
            <ModalComponent
              display={displayModal}
              onClose={() => this.closeModal()}
              onActionModalClose={() => this.onActionModalClose() }
              updateZipCode={() => this.updateZipCode() }
              my_user={this.props.user}
            />
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
