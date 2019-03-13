import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  TouchableWithoutFeedback
} from 'react-native';
import PubSub from 'pubsub-js'
import { BlurView } from 'expo';
import { styles } from '../../../constants/Styles'
import ZipCodeModal from '../modals/ZipCodeModal';
import NotificationModal from '../modals/NotificationModal'
import WaterModal from '../modals/NotH2OConsumptionModal'
import WasteModal from '../modals/NotWasteReduceModal'
import CarbonModal from '../modals/NotCO2EmissionModal'
import UpdateUserModal from '../modals/UpdateUserModal';
import CommunityEventModal from '../modals/CommunityEventModal';

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
    }
  }
  componentDidMount() {
    this.setState({user: this.props.user})
    this.getComponent()
    PubSub.subscribe('showZipCodeModal', data => this.openZipCodeModal(data));
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
    })
    this.isMounted = false;
  }

  closeAll() {
    if(this.isMounted){
      this.setState({
        showZipCodeModal: false,
        showWasteModal: false,
        showWaterModal: false,
        showCarbonModal: false,
        showUpdateUserModal: false,
        showNotificationModal: false,
        showCommunityEventModal: false,
      })
    }
  }

  openZipCodeModal = (data) => {
    this.closeModal()
    this.setState({ showZipCodeModal: true});
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

  onActionModalClose = () => {
    this._takeAction()
    .then(() => this.closeAll())
    .then(this.props.onClose());
  }

  _takeAction = () => {
    const { take_action, item, canDelete } = this.props;
    const { currScreen, user } = this.state;
      let variables = {
        id: user.me.id,
        action : item.action ? item.action.id : item.id
      }
      take_action({variables})
      .then(response => {
        if(item.related_actions){
          if(item.related_actions.length > 0){
            NavigationService.navigate('Game',{ previousScreen: currScreen, games:item.related_actions, game_title:item.game_title ? item.game_title : null});
          }
        }
        this.flipCard();
      })
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
    console.log('getComponent', this.props.display)
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
        this.setState({ showWasteModal: true })
        break;
      case 'CommunityEventModal':
        this.setState({ showCommunityEventModal: true })
        break;
      default:
        this.setState({ showCarbonModal: true })
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
            <UpdateUserModal my_user={this.props.user} saveUser={() => this.props.updateUser() } onClose={() => this.props.onClose()} visible={this.state.showUpdateUserModal}/>
          }
          { this.state.showWasteModal &&
            <WasteModal waste={this.state.waste} onClose={() => this.onActionModalClose()} visible={this.state.showWasteModal}/>
          }
          { this.state.showWaterModal &&
            <WaterModal water={this.props.water} onClose={() => this.onActionModalClose()} visible={this.state.showWaterModal}/>
          }
          { this.state.showCarbonModal &&
            <CarbonModal carbon_dioxide={this.state.carbon_dioxide} onClose={() => this.onActionModalClose()} visible={this.state.showCarbonModal}/>
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
