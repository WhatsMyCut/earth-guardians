import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default class RedirectModal extends React.Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: '#333',
          justifyContent: 'center',
          alignItems: 'center',
          width: '90%',
          borderRadius: 20,
          padding: 30,
        }}
      >
        <Text
          style={{
            color: '#fff',
            marginHorizontal: 20,
            fontSize: 18,
            fontWeight: 'bold',
          }}
        >
          EARTH GUARDIANS WILL REDIRECT YOU TO WWW.CHOOSE.TODAY
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            width: 130,
            height: 50,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}
          onPress={() => console.log('button pressed')}
        >
          <Text style={{ color: '#333', fontSize: 18, fontWeight: 'bold' }}>
            REDIRECT
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
