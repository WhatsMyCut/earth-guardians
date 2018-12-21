import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
export default class Profileomponent extends React.Component {
  render() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: SCREEN_WIDTH * 0.9,
        }}
      >
        <Image
          source={require('../../../assets/user_w.png')}
          style={{
            width: 30,
            height: 30,
            borderColor: '#666',
            borderWidth: 1,
            padding: 20,
            borderRadius: 20,
            backgroundColor: '#666',
            marginTop: 10,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: SCREEN_WIDTH * 0.9,
            marginTop: 10,
          }}
        >
          <Text style={{ color: '#fff' }}>Edward</Text>
          <Text style={{ color: '#fff', width: SCREEN_WIDTH * 0.9 * 0.5 }}>
            Manda
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: SCREEN_WIDTH * 0.9,
            marginTop: 10,
          }}
        >
          <Text style={{ color: '#fff' }}>80302</Text>
          <Text style={{ color: '#fff', width: SCREEN_WIDTH * 0.9 * 0.5 }}>
            Crew
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: SCREEN_WIDTH * 0.9,
            marginTop: 10,
          }}
        >
          <Text style={{ color: '#fff' }}>Cell Number</Text>
          <Text style={{ color: '#fff', width: SCREEN_WIDTH * 0.9 * 0.5 }}>
            Email
          </Text>
        </View>
      </View>
    );
  }
}
