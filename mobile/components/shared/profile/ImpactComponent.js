import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
export default class ImpactComponent extends React.Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: '#666',
          justifyContent: 'center',
          alignItems: 'center',
          width: SCREEN_WIDTH * 0.9,
          borderRadius: 20,
          height: 120,
          marginVertical: 5,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 18 }}>
          Your Impact | Community
        </Text>
      </View>
    );
  }
}
