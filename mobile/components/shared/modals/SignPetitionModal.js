import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { styles } from '../../../constants/Styles';

export default class SignPetitionModal extends React.Component {
  state = { firstName: '', lastName: '', email: '', modalVisible: true };
  toggleModalVisible = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
        style={{
          backgroundColor: '#333',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={[styles.modalView, {
            marginTop: 100,
            marginHorizontal: 20,
          }]}
        >
          <View style={[styles.headerContainer]}>
            <Text style={[styles.headerText]}>
              SIGN THE PETITION
            </Text>
          </View>
          <View style={[styles.container]}>
            <TextInput
              style={[styles.textInput]}
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
              style={[styles.textInput]}
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
              style={[styles.textInput]}
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
              placeholder="email address"
              placeholderTextColor="#fff"
              keyboardType="email-address"
              returnKeyType="done"
            />
            <TouchableOpacity
              style={[styles.buttonContainer]}
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
              <Text style={[styles.textGrey18B]}>
                SUBMIT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
