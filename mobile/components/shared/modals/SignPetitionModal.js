import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class CommunityEventModal extends React.Component {
  state = { firstName: '', lastName: '', email: '' };
  render() {
    console.log(SCREEN_WIDTH);
    return (
      <KeyboardAvoidingView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        behavior="padding"
        enabled
      >
        <View
          style={{
            backgroundColor: '#333',
            justifyContent: 'center',
            alignItems: 'center',

            borderRadius: 20,
            padding: 30,
            paddingHorizontal: 60,
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
            SIGN THE PETITION
          </Text>
          <TextInput
            style={{
              color: '#fff',
              height: 30,
              width: 200,
              marginTop: 30,
              marginBottom: 20,
              borderColor: 'gray',
              borderBottomWidth: 1,
            }}
            onChangeText={firstName => this.setState({ firstName })}
            value={this.state.firstName}
            placeholder="First Name"
            placeholderTextColor="#fff"
            returnKeyType="next"
            onSubmitEditing={() => {
              this.lName.focus();
            }}
            blurOnSubmit={false}
          />
          <TextInput
            ref={input => {
              this.lName = input;
            }}
            style={{
              color: '#fff',
              height: 30,
              width: 200,
              marginBottom: 20,
              borderColor: 'gray',
              borderBottomWidth: 1,
            }}
            onChangeText={lastName => this.setState({ lastName })}
            value={this.state.lastName}
            placeholder="Last Name"
            placeholderTextColor="#fff"
            returnKeyType="next"
            onSubmitEditing={() => {
              this.tEmail.focus();
            }}
            blurOnSubmit={false}
          />
          <TextInput
            ref={input => {
              this.tEmail = input;
            }}
            style={{
              color: '#fff',
              height: 30,
              width: 200,
              marginBottom: 30,
              borderColor: 'gray',
              borderBottomWidth: 1,
            }}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            placeholder="email address"
            placeholderTextColor="#fff"
            keyboardType="email-address"
            returnKeyType="done"
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
            onPress={() =>
              console.log(
                'Name is ' +
                  this.state.firstName +
                  ' ' +
                  this.state.lastName +
                  ' and the email is  ' +
                  this.state.email
              )
            }
          >
            <Text style={{ color: '#333', fontSize: 18, fontWeight: 'bold' }}>
              SUBMIT
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}