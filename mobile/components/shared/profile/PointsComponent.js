import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo';
import LinearGradientProps from '../../../constants/LinearGradientProps';

const SCREEN_WIDTH = Dimensions.get('window').width;
export default class PointsComponent extends React.Component {
  render() {
    return (
      <LinearGradient
        {...LinearGradientProps.profileItem}
        style={{
          flex: 1,
          borderRadius: 5,
          elevation: 1,

          marginVertical: 5,
        }}
      >
        <View
          style={{
            //backgroundColor: '#666',
            justifyContent: 'center',
            alignItems: 'center',
            width: SCREEN_WIDTH * 0.9,

            padding: 20,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 30, fontWeight: 'bold' }}>
            {this.props.points} Points
          </Text>
        </View>
      </LinearGradient>
    );
  }
}
