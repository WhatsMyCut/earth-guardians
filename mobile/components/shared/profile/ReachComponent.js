import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
export default class ReachComponent extends React.Component {

  _returnPeopleReached(){
    let reach = 0
    if(this.props.communityEvents.length > 0){
      this.props.communityEvents.map(event=>{
        reach+=parseInt(event.number_of_people);
      })
    }


    return `${reach} PEOPLE REACHED`;
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.props.toggleModal()}>
        <View
          style={{
            backgroundColor: '#666',
            justifyContent: 'center',
            alignItems: 'center',
            width: SCREEN_WIDTH * 0.9,
            borderRadius: 10,
            padding: 10,
            marginVertical: 5,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
            {this._returnPeopleReached()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
