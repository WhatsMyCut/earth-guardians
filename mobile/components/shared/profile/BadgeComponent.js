import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo';
import LinearGradientProps from '../../../constants/LinearGradientProps';
import { styles } from '../../../constants/Styles'

export default class BadgeComponent extends React.Component {
  render() {
    return (
      <LinearGradient
        {...LinearGradientProps.profileItem}
        style={[styles.linearGradientBoxPadded]}>
        <View style={[styles.componentContainer, styles.centerAll]}>
          <View style={[styles.componentHeader]}>
            <Text style={[styles.headerText]}>MY BADGES</Text>
          </View>
          <View style={[styles.container, {flexDirection: 'row', marginBottom: 20}]}>
            {this.props.points === 0 &&
              <Text style={[styles.textWhite]}>Take action and earn your first badge!</Text>
            }
            {this.props.points > 0 &&
              <Image
              style={[styles.badgeImage]}
              source={require('../../../assets/badge-first.png')} />
            }
            {this.props.showEGBadge &&
              <Image
              style={[styles.badgeImage]}
              source={require('../../../assets/badge-EG.png')} />
            }
          </View>
        </View>
      </LinearGradient>
    );
  }
}

