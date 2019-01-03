import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import NavigationService from '../../../navigation/navigationService';
//TODO figure out what to do if its a postal code instead of zip code
export default class CommunityImpactModal extends React.Component {
  state = { zipCode: '' };
  render() {
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        behavior="padding"
        enabled
      >
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
            returnKeyType="done"
            maxLength={5}
            value={this.state.zipCode}
            keyboardAppearance="dark"
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
          <TouchableOpacity
            onPress={() => {
              NavigationService.navigate(
                this.props.previousScreen || 'MyActions'
              );
            }}
            hitSlop={{ top: 15, left: 15, right: 15, bottom: 15 }}
            style={{ position: 'absolute', right: -2, top: -5 }}
          >
            <AntDesign
              name="close"
              size={42}
              color="white"
              style={{ padding: 5 }}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
