import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LinearGradientProps from '../../../constants/LinearGradientProps';
import { styles } from '../../../constants/Styles';

export default class ReachComponent extends React.Component {
  _returnPeopleReached() {
    let reach = 0;
    if (this.props.communityEvents.length > 0) {
      this.props.communityEvents.map(event => {
        reach += parseInt(event.number_of_people);
      });
    }

    const style = reach > 0 ? styles.textWhite18B : styles.textGrey18B;

    return (
      <View style={[styles.container, styles.centerAll, style]}>
        <Text style={[styles.componentHeader, style, styles.largeWhiteTextBold]}>{reach}</Text>
      </View>
    );
  }

  render() {
    return (
      <LinearGradient
        {...LinearGradientProps.profileItem}
        style={styles.linearGradientBoxPadded }>
        <TouchableOpacity
          style={ styles.componentContainer }
          onPress={() => this.props.openModal()}
        >
          <View style={ styles.componentContainer }>
            <View style={styles.componentHeader}>
              <Text style={[styles.headerText]}>
                PEOPLE I'VE REACHED
              </Text>
            </View>
            {this._returnPeopleReached()}
          </View>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}
