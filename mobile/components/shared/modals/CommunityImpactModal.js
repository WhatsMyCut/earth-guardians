import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default class CommunityImpactModal extends React.Component {
  state = { zipCode: '' };
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
            textAlign: 'center',
          }}
        >
          WANT TO SEE YOUR COMMUNITY'S IMPACT?
        </Text>
        <TextInput
          style={{
            color: '#fff',
            height: 30,
            width: 200,
            textAlign: 'center',
            marginVertical: 30,
            borderColor: 'gray',
            borderBottomWidth: 1,
          }}
          onChangeText={zipCode => this.setState({ zipCode })}
          placeholder="Zip Code"
          placeholderTextColor="#fff"
          keyboardType="numeric"
          value={this.state.zipCode}
        />
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
          onPress={() => console.log('zip code is', this.state.zipCode)}
        >
          <Text style={{ color: '#333', fontSize: 18, fontWeight: 'bold' }}>
            SUBMIT
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
