import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  TouchableWithoutFeedback
} from 'react-native';
import PubSub from 'pubsub-js'
import { styles } from '../../../constants/Styles'
import ZipCodeModal from '../modals/ZipCodeModal';
import NotificationModal from '../modals/NotificationModal'
import WaterModal from '../modals/NotH2OConsumptionModal'
import WasteModal from '../modals/NotWasteReduceModal'
import CarbonModal from '../modals/NotCO2EmissionModal'
import UpdateUserModal from '../modals/UpdateUserModal';
import CommunityEventModal from '../modals/CommunityEventModal';
import GameCompleteModal from '../modals/GameCompleteModal';
import PasswordModal from '../modals/PasswordModal';
import RedirectModal from '../modals/RedirectModal';

export default class ModalComponent extends React.Component {
  constructor(props) {
    super(props)
    this.isMounted = false,
    this.state = {
      component: null,
      showZipCodeModal: false,
      showNotificationModal: false,
      showUpdateUserModal: false,
      showCommunityEventModal: true,
      showWasteModal: false,
      showWaterModal: false,
      showCarbonModal: false,
      showGameCompleteModal: false,
      showPasswordModal: false,
      showRedirectModal: true,
    }
  }
  componentDidMount() {
    this.setState({user: this.props.user})
    this.getComponent()
    PubSub.subscribe('closeCommunityEventModal', data => this.closeCommunityEventModal(data))
    PubSub.subscribe('openCommunityEventModal', data => this.openCommunityEventModal(data))
  }

  componentWillUnmount() {
    this.setState({
      showZipCodeModal: false,
      showWasteModal: false,
      showWaterModal: false,
      showCarbonModal: false,
      showUpdateUserModal: false,
      showNotificationModal: false,
      showCommunityEventModal: false,
      showGameCompleteModal: false,
      showPasswordModal: false,
      showRedirectModal: false,
    })
    this.isMounted = false;
  }

  closeAll() {
    if(this.isMounted){
      this.setState({
        showZipCodeModal: false,
        showUpdateUserModal: false,
        showWasteModal: false,
        showWaterModal: false,
        showCarbonModal: false,
        showNotificationModal: false,
        showCommunityEventModal: false,
        showGameCompleteModal: false,
        showPasswordModal: false,
        showRedirectModal: false,
      })
    }
  }

  openZipCodeModal = (data) => {
    this.closeModal()
    this.setState({ showZipCodeModal: true});
  }

  openWasteModal = (data) => {
    // console.log('openWasteModal', data)
    this.closeModal()
    this.setState({ showWasteModal: true });
  }

  openWaterodal = (data) => {
    // console.log('openWaterodal', data)
    this.closeModal()
    this.setState({ showWaterModal: true});
  }

  openCarbonModal = (data) => {
    // console.log('openCarbonModal', data)
    PubSub.publish('showBlur')
    this.setState({ showCarbonModal: true});
  }

  openGameCompleteModal = (data) => {
    // console.log('showGameCompleteModal', data)
    PubSub.publish('showBlur')
    this.setState({ showGameCompleteModal: true});
  }

  openPasswordModal = (data) => {
    // console.log('showPasswordModal', data)
    PubSub.publish('showBlur')
    this.setState({ showPasswordModal: true});
  }

  openRedirectModal = (data) => {
    // console.log('showPasswordModal', data)
    PubSub.publish('showBlur')
    this.setState({ showRedirectModal: true});
  }

  updateZipCode =(zipcode)=>{
    const { get_user, update_zipcode} = this.props;
    if(zipcode){
      let variables={
        id:get_user.me.id,
        zipcode:zipcode
      }
      update_zipcode({variables}).then(()=>{
        this.setState({showZipCodeModal: false});
      })
    }
  }

  openCommunityEventModal() {
    PubSub.publish('showBlur',
    this.setState({showCommunityEventModal: true}))
  }

  closeCommunityEventModal() {
    PubSub.publish('closeBlur',
    this.setState({showCommunityEventModal: false}))
  }

  getComponent() {
    const notification = this.props.notification || { data: { message: 'Here 2'}}
    // console.log('getComponent', this.props.display)
    switch (this.props.display) {
      case 'ZipCodeModal':
        this.setState({ showZipCodeModal: true })
        break;
      case 'UpdateUserModal':
        this.setState({ showUpdateUserModal: true })
        break;
      case 'NotificationModal':
        const notification = this.props.notification || { data: { message: 'Here 2'}}
        this.setState({ showNotificationModal: true, notification: notification })
        break;
      case 'WaterModal':
        this.setState({ showWaterModal: true })
        break;
      case 'WasteModal':
        this.setState({ showWasteModal: true })
        break;
      case 'CarbonModal':
        this.setState({ showCarbonModal: true })
        break;
      case 'CommunityEventModal':
        this.setState({ showCommunityEventModal: true })
        break;
      case 'GameCompleteModal':
        this.setState({ showGameCompleteModal: true })
        break;
      case 'PasswordModal':
        this.setState({ showPasswordModal: true })
        break;
      case 'RedirectModal':
        this.setState({ showRedirectModal: true })
        break;
      default:
        this.setState({ showPasswordModal: true })
        break;
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.props.onClose()
        }}
      >
        <View
          style={[
            styles.container,
            styles.coverScreen,
            styles.coverAll,
            {
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 2000
            }
          ]}
        >
          { this.state.showZipCodeModal &&
            <ZipCodeModal
              zipcode={this.state.zipcode}
              onClose={() => this.props.onClose()}
              visible={this.state.showZipCodeModal}
              updateZipCode={this.props.updateZipCode}
            />
          }
          { (this.state.showNotificationModal && this.props.notification) &&
            <NotificationModal notification={this.props.notification} onClose={() => this.props.notificationClose()} visible={this.state.showNotificationModal}/>
          }
          { this.state.showUpdateUserModal &&
            <UpdateUserModal my_user={this.props.user} saveUser={this.props.updateUser} onClose={() => this.props.onClose()} visible={this.state.showUpdateUserModal}/>
          }
          { this.state.showWasteModal &&
            <WasteModal waste={this.props.waste} onClose={() => this.props.onClose()} visible={this.state.showWasteModal}/>
          }
          { this.state.showWaterModal &&
            <WaterModal water={this.props.water} onClose={() => this.props.onClose()} visible={this.state.showWaterModal}/>
          }
          { this.state.showCarbonModal &&
            <CarbonModal carbon_dioxide={this.props.carbon_dioxide} onClose={() => this.props.onClose()} visible={this.state.showCarbonModal}/>
          }
          { this.state.showGameCompleteModal &&
            <GameCompleteModal onClose={() => this.props.onClose()} visible={this.state.showGameCompleteModal}/>
          }
          { this.state.showRedirectModal &&
            <RedirectModal
              onClose={() => this.props.onClose()}
              external_url={
                this.props.redirectModalPetition ? this.props.redirectModalPetition : null
              }
            />
          }
          { this.state.showPasswordModal &&
            <PasswordModal
              phone_signup={this.props.phone_signup}
              setToken={this.props.setToken}
              isVisible={this.state.showPasswordModal}
              username={this.props.phone}
              togglePasswordModal={this.props.togglePasswordModal}
              onClose={this.props.onClose}
              visible={this.state.showPasswordModal}
              setLocation={this.props.setLocation}
            />
          }
          { this.state.showCommunityEventModal &&
            <CommunityEventModal
              onClose={() => this.closeCommunityEventModal()}
              visible={this.state.showCommunityEventModal}
              submitEvent={() => this.props.submitEvent()}
            />
          }
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

ModalComponent.propTypes = {
  children: PropTypes.node
}
