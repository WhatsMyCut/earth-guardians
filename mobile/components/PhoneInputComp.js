import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, Components } from 'react-native-ui-lib';
import PhoneInput from 'react-native-phone-input';

export default class PhoneInputComp extends React.Component {
  render() {
    return (
      <PhoneInput ref="phone" />
      // <TextInput
      //   text80
      //   placeholder={'Phone number'}
      //   value={props.number}
      //   style={{ color: '#fff', paddingTop: 10 }}
      //   placeholderTextColor={'#fff'}
      //   onTextChange={number => props.changedNumber(number)}
      //   textContentType="telephoneNumber"
      // />
    );
  }
}
