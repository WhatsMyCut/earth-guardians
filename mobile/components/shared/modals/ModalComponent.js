import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  TouchableWithoutFeedback
} from 'react-native';
import { BlurView } from 'expo';
import { styles } from '../../../constants/Styles'
import ZipCodeModal from '../modals/ZipCodeModal';
import { Modal } from 'react-native-paper';

export default class ModalComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      component: null,
      showZipCodeModal: false,
    }
  }
  componentDidMount() {
    this.getComponent()
  }

  getComponent() {
    switch (this.props.display) {
      case 'ZipCodeModal':
        this.setState({ showZipCodeModal: true })
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
            <ZipCodeModal visible={true} onClose={() => this.props.onClose() } />
          }
        </BlurView>
      </TouchableWithoutFeedback>
    )
  }
}

ModalComponent.propTypes = {
  children: PropTypes.node
}
