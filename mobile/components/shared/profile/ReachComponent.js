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

    return  reach > 0 ?  <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>{reach} PEOPLE REACHED</Text> :<Text style={{ color: 'rgba(255,255,255,0.3)', fontSize: 18, fontWeight: 'bold' }}>{reach} PEOPLE REACHED</Text> ;
  }

  render() {
    return (
      <LinearGradient
        {...LinearGradientProps.profileItem}
        style={styles.linearGradientBox }>
        <TouchableOpacity onPress={() => this.props.toggleModal()}>
          <View style={ styles.reachComponent }>
              {this._returnPeopleReached()}
          </View>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}
