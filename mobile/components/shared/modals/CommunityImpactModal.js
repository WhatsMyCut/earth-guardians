import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import { styles } from '../../../constants/Styles';

import NavigationService from '../../../navigation/navigationService';
//TODO figure out what to do if its a postal code instead of zip code
export default class CommunityImpactModal extends React.Component {
  state = { zipCode: '' };
  render() {
    return (
      <KeyboardAvoidingView
        style={[styles.container, styles.centerAll, styles.modalView]}
        behavior="padding"
        enabled
      >
        <View style={[styles.header]}>
          <Text style={[styles.headerText]}>
            WANT TO SEE YOUR COMMUNITY'S IMPACT?
          </Text>
        </View>
        <View style={[styles.container]}>
          <TextInput
            style={[styles.textInput]}
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
            style={[styles.buttonContainer]}
            onPress={() => console.log('zip code is', this.state.zipCode)}
          >
            <Text style={[styles.textGrey18B]}>
              SUBMIT
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
