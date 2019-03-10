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
import Colors from '../../../constants/Colors';

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
    console.log('UpdateUserComponent', this.props)
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
            backgroundColor: Colors.darkGray,
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
              backgroundColor: Colors.darkGray,
            }}
          >
            <View style={[styles.headerContainer]}>
              <Text style={[styles.headerText]}>
                Update Profile
              </Text>
            </View>
            <View style={[styles.container]}>
              <TextInput
                style={[styles.textInput]}
                onChangeText={phone => this.setState({ phone })}
                placeholder={'Phone'}
                placeholderTextColor={Colors.white}
                keyboardType="default"
                returnKeyType="done"
                value={this.state.phone}
              />
              <TextInput
                style={[styles.textInput]}
                onChangeText={name => this.setState({ name })}
                placeholder={'Name'}
                placeholderTextColor={Colors.white}
                keyboardType="default"
                returnKeyType="done"
                value={this.state.name}
              />
              <TextInput
                style={[styles.textInput]}
                onChangeText={email => this.setState({ email })}
                placeholder={'Email'}
                placeholderTextColor={Colors.white}
                keyboardType="email-address"
                returnKeyType="done"
                value={this.state.email}
              />
              <Dropdown
                label="Affiliation Type"
                data={typesOfCrews}
                containerStyle={{
                  width: 200,
                  marginBottom: 10,
                }}
                baseColor={Colors.white}
                textColor={Colors.white}
                itemColor={Colors.black}
                selectedItemColor="rgba(0, 0, 0, .5)"
                onChangeText={arg => {
                  this.setState({ crew_type: arg });
                }}
              />
              <TextInput
                style={[styles.textInput]}
                onChangeText={crew => this.setState({ crew })}
                placeholder={'Affiliation'}
                placeholderTextColor={Colors.white}
                keyboardType="default"
                returnKeyType="done"
                value={this.state.crew}
              />
              <TextInput
                style={[styles.textInput]}
                onChangeText={zipcode => this.setState({ zipcode })}
                placeholder={'Zipcode'}
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
                <Text style={[styles.textWhite]}>Go Back</Text>
              </TouchableHighlight>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </Modal>
    );
  }
}
