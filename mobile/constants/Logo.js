import React from 'react';
import PropTypes from 'prop-types'
import {
  View,
  Text,
  Image
} from 'react-native'
import { styles } from '../constants/Styles'
export default class Logo extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { style } = this.props
    return (
      <View style={[styles.container]}>
        <Image source={require('../assets/eye_w.png')} style={[style, { resizeMode: 'contain',}]}/>
        {this.props.beta === 'true' &&
          <View style={[styles.container]}>
            <Text style={styles.headerText}>BETA</Text>
          </View>
        }
      </View>
    )
  }
}

Logo.propTypes = {
  beta: PropTypes.string
}

Logo.defaultProps = {
  beta: 'false'
}
