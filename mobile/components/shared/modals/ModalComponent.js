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
      showCommunityEventModal: false,
      showWasteModal: false,
      showWaterModal: false,
      showCarbonModal: false,
    }
  }
  componentDidMount() {
    this.getComponent()
    PubSub.subscribe('closeCommunityEventModal', () => this.closeCommunityEventModal())
    PubSub.subscribe('openCommunityEventModal', () => this.openCommunityEventModal())
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
  }

  closeAll() {
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
    .then(() => this.setState({showWasteModal: false, showWaterModal : false, showCarbonModal: false, showZipcodeModal:false}))
    .then(this.props.onClose());
  }

  _takeAction = () => {
    const { take_action, item, get_user, canDelete } = this.props;
    const { currScreen } = this.state;
      let variables = {
        id: get_user.me.id,
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
  }

  closeCommunityEventModal() {
    console.log('closeCommunityEventModal: closing')
    PubSub.publish('closeBlur')
    this.setState({showCommunityEventModal: false})
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
      case 'CommunityEventModal':
        this.setState({ showCommunityEventModal: true })
        break;
      default:
        this.setState({ showNotificationModal: true })
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
