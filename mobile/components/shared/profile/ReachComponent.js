import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo';
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

    const style = reach > 0 ? styles.componentHeader : styles.reachGrey;

    return (
      <View style={[styles.centerAll, style]}>
        <Text style={style}>PEOPLE REACHED</Text>
        <Text style={[style, { fontSize: 22 }]}>{reach}</Text>
      </View>
    );
  }

  render() {
    return (
      <LinearGradient
        {...LinearGradientProps.profileItem}
        style={styles.linearGradientBox }>
        <TouchableOpacity style={ styles.componentContainer } onPress={() => this.props.toggleModal()}>
          <View style={ styles.componentHeader }>
            {this._returnPeopleReached()}
          </View>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}
