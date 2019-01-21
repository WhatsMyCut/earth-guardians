import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo';
import LinearGradientProps from '../../../constants/LinearGradientProps';
const SCREEN_WIDTH = Dimensions.get('window').width;
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
        style={{
          flex: 1,
          borderRadius: 5,
          elevation: 1,

          marginVertical: 5,
          shadowColor: "#000",
          shadowRadius: 2,
          shadowOpacity: 0.35,
          shadowOffset: {
            width: 0,
            height: 2
          }, 
        }}
      >
        <TouchableOpacity onPress={() => this.props.toggleModal()}>
          <View
            style={{
              //backgroundColor: '#666',
              justifyContent: 'center',
              alignItems: 'center',
              width: SCREEN_WIDTH * 0.9,

              padding: 10,
            }}
          >
              {this._returnPeopleReached()}
          </View>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}
