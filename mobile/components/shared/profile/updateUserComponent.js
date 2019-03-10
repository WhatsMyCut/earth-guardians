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
  ScrollView,
} from 'react-native';

import { Dropdown } from 'react-native-material-dropdown';
import { styles } from '../../../constants/Styles';

export default class UpdateUserComponent extends React.Component {
  state = {
    phone: null,
    zipcode: null,
    crew: null,
    name: null,
    email: null,
    crew_type: null,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { goBack, my_user } = this.props;

    const typesOfCrews = [
      { value: 'School' },
      { value: 'Business' },
      { value: 'Crew' },
    ];


    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <ScrollView
          contentContainerStyle={[styles.container, styles.centerAll, {
            flexDirection: 'column',
            borderRadius: 15,
            backgroundColor: '#333',
          }]}
        >
          <KeyboardAvoidingView
            behavior="padding"
            style={{
              flex: 1,
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: 15,
              backgroundColor: '#333',
            }}
          >
            <View style={[styles.headerContainer]}>
              <Text style={[styles.headerText]}>
                Update Profile
              </Text>
            </View>
            <View style={[styles.container]}>
              <TextInput
                style={{
                  color: '#fff',
                  height: 30,
                  width: 200,
                  textAlign: 'left',
                  marginVertical: 10,
                  borderColor: 'gray',
                  borderBottomWidth: 1,
                }}
                onChangeText={phone => this.setState({ phone })}
                placeholder={my_user.me.username || 'Phone'}
                placeholderTextColor="#fff"
                keyboardType="default"
                returnKeyType="done"
                value={this.state.phone}
              />
              <TextInput
                style={{
                  color: '#fff',
                  height: 30,
                  width: 200,
                  textAlign: 'left',
                  marginTop: 10,
                  marginBottom: 10,
                  borderColor: 'gray',
                  borderBottomWidth: 1,
                }}
                onChangeText={name => this.setState({ name })}
                placeholder={my_user.me.name || 'Name'}
                placeholderTextColor="#fff"
                keyboardType="default"
                returnKeyType="done"
                value={this.state.name}
              />
              <TextInput
                style={{
                  color: '#fff',
                  height: 30,
                  width: 200,
                  textAlign: 'left',
                  marginTop: 5,
                  marginBottom: 8,
                  borderColor: 'gray',
                  borderBottomWidth: 1,
                }}
                onChangeText={email => this.setState({ email })}
                placeholder={my_user.me.email || 'Email'}
                placeholderTextColor="#fff"
                keyboardType="email-address"
                returnKeyType="done"
                value={this.state.email}
              />
              <Dropdown
                label="Affiliation Type"
                data={typesOfCrews}
                containerStyle={{
                  // height: 10,
                  width: 200,
                  marginBottom: 10,
                }}
                baseColor={'#ffffff'}
                textColor={'#ffffff'}
                itemColor={'#000000'}
                selectedItemColor="rgba(0, 0, 0, .87)"
                onChangeText={arg => {
                  this.setState({ crew_type: arg });
                }}
              />
              <TextInput
                style={{
                  color: '#fff',
                  height: 30,
                  width: 200,
                  textAlign: 'left',
                  marginTop: 10,
                  marginBottom: 10,
                  borderColor: 'gray',
                  borderBottomWidth: 1,
                }}
                onChangeText={crew => this.setState({ crew })}
                placeholder={my_user.me.crew || 'Affiliation'}
                placeholderTextColor="#fff"
                keyboardType="default"
                returnKeyType="done"
                value={this.state.crew}
              />
              <TextInput
                style={[styles.textWhite]}
                onChangeText={zipcode => this.setState({ zipcode })}
                placeholder={my_user.me.zipcode || 'Zipcode'}
                placeholderTextColor={styles.placeholderTextColor}
                keyboardType="numeric"
                secureTextEntry={false}
                returnKeyType="done"
                value={this.state.zipCode}
              />

              <TouchableOpacity
                style={[styles.buttonContainer]}
                onPress={() => this.updateUser()}
              >
                <Text style={[styles.textGrey18B]}>
                  SUBMIT
                </Text>
              </TouchableOpacity>
              <TouchableHighlight onPress={() => this.props.onClose()}>
                <Text style={{ color: 'white' }}>Go Back</Text>
              </TouchableHighlight>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </Modal>
    );
  }
}
