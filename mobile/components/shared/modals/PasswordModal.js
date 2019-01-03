import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  TouchableHighlight,
  KeyboardAvoidingView,
} from 'react-native';
import NavigationService from '../../../navigation/navigationService';
import graphql from '../../hoc/graphql';
import { SIGNUP } from '../../graphql/mutations/signup_mutation';

@graphql(SIGNUP, {
  name: 'signup_mutation',
})
export default class PasswordModal extends React.Component {
  state = { password: '', confirmPassword: '', passwordError: null };

  constructor(props) {
    super(props);
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  signup = () => {
    const { password, confirmPassword } = this.state;
    if (password === confirmPassword) {
      this.props.phone_signup();
      //NavigationService.navigate('Main');
    } else {
      this.setState({ passwordError: 'Passwords do not Match' });
    }
  };

  render() {
    const { goBack } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.isVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            paddingHorizontal: 5,
          }}
        >
          <View
            style={{
              backgroundColor: '#333',
              alignItems: 'center',
              height: '50%',
              width: '75%',
              borderRadius: 15,
              paddingTop: 20,
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
              Create a Password
            </Text>
            {this.state.passwordError && (
              <Text
                style={{
                  color: 'red',
                  marginHorizontal: 20,
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {this.state.passwordError}
              </Text>
            )}
            <TextInput
              style={{
                color: '#fff',
                height: 30,
                width: 200,
                textAlign: 'left',
                marginVertical: 20,
                borderColor: 'gray',
                borderBottomWidth: 1,
              }}
              onChangeText={password =>
                this.setState({ password, passwordError: null })
              }
              placeholder="Password"
              placeholderTextColor="#fff"
              keyboardType="default"
              secureTextEntry={true}
              returnKeyType="done"
              // value={this.state.zipCode}
            />
            <TextInput
              style={{
                color: '#fff',
                height: 30,
                width: 200,
                textAlign: 'left',
                marginTop: 20,
                marginBottom: 10,
                borderColor: 'gray',
                borderBottomWidth: 1,
              }}
              onChangeText={confirmPassword =>
                this.setState({ confirmPassword, passwordError: null })
              }
              placeholder="Confirm Password"
              placeholderTextColor="#fff"
              keyboardType="default"
              secureTextEntry={true}
              returnKeyType="done"
              // value={this.state.zipCode}
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
                marginBottom: 20,
              }}
              onPress={this.signup}
            >
              <Text style={{ color: '#333', fontSize: 18, fontWeight: 'bold' }}>
                SUBMIT
              </Text>
            </TouchableOpacity>

            <TouchableHighlight onPress={this.props.togglePasswordModal}>
              <Text style={{ color: 'white' }}>Go Back</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
}
