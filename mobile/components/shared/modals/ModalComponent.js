import React from 'react'
import {
  TouchableWithoutFeedback,
} from 'react-native';
import {BlurView} from 'expo';
import { styles } from '../../../constants/Styles'

export default class ModalComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.props.closeModal()
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
          {this.props.children}
        </BlurView>
      </TouchableWithoutFeedback>
    )
  }
}
