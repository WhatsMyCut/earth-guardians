import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
export default class ReachComponent extends React.Component {
  render() {
    return (
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
          260 PEOPLE REACHED
        </Text>
      </View>
    );
  }
}
