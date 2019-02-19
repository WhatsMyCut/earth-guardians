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
    return (
      <View style={[styles.splashLogoContainer]}>
        <Image source={require('../assets/eye_w.png')}/>
        { this.props.beta === 'true' &&
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
