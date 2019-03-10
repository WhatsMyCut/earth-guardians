import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  TouchableWithoutFeedback
} from 'react-native';
import { BlurView } from 'expo';
import { styles } from '../../../constants/Styles'
import ZipCodeModal from '../modals/ZipCodeModal';
import UpdateUserModal from '../profile/updateUserComponent';
import UpdateUserComponent from '../profile/updateUserComponent';

export default class ModalComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      component: null,
      showZipCodeModal: false,
      showWasteModal: false,
      showWaterModal: false,
      showCarbonModal: false,
    }
  }
  componentDidMount() {
    this.getComponent()
  }

  closeAll() {
    this.setState({
      showZipCodeModal: false,
      showWasteModal: false,
      showWaterModal: false,
      showCarbonModal: false,
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
          this.onModalClose();
      })
    }
  }

  getComponent() {
    console.log('getComponent', this.props.display)
    this.closeAll()
    switch (this.props.display) {
      case 'ZipCodeModal':
        this.setState({ showZipCodeModal: true })
        break;
      case 'UpdateUserModal':
        this.setState({ showUpateUserModal: true })
        break;
      default:
        this.setState({ showZipCodeModal: true })
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
          { this.state.showUpateUserModal &&
            <UpdateUserComponent my_user={this.props.my_user} onClose={() => this.onModalClose()} visible={this.state.showUpdateUser}/>
          }
          { this.state.showWasteModal &&
            <WasteModal waste={this.state.waste} onClose={() => this.onActionModalClose()} visible={this.state.showWasteModal}/>
          }
          { this.state.showWaterModal &&
            <WaterModal water={this.state.water} onClose={() => this.onActionModalClose()} visible={this.state.showWaterModal}/>
          }
          { this.state.showCarbonModal &&
            <CarbonModal carbon_dioxide={this.state.carbon_dioxide} onClose={() => this.onActionModalClose()} visible={this.state.showCarbonModal}/>
          }
        </BlurView>
      </TouchableWithoutFeedback>
    )
  }
}

ModalComponent.propTypes = {
  children: PropTypes.node
}
