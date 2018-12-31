import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
export default class PointsComponent extends React.Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: '#666',
          justifyContent: 'center',
          alignItems: 'center',
          width: SCREEN_WIDTH * 0.9,
          borderRadius: 10,
          padding: 20,
          marginVertical: 5,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 30, fontWeight: 'bold' }}>
          3,807 POINTS
        </Text>
      </View>
    );
  }
}