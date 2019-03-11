import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  TouchableHighlight,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import { Dropdown } from 'react-native-material-dropdown';
import { styles } from '../../../constants/Styles';
import Colors from '../../../constants/Colors';

export default class UpdateUserModal extends React.Component {
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
        <TouchableWithoutFeedback style={[styles.container, styles.centerAll]} onPress={() => {
          this.props.onClose()
        }}>
          <KeyboardAvoidingView
            behavior="position"
            style={[styles.container, styles.centerAll, {
              flexDirection: 'column',
            }]}
          >
            <TouchableWithoutFeedback style={[styles.container, styles.coverScreen]} onPress={() => {
              return false
            }}>
              <View style={[styles.modalView, {width: '100%', maxHeight: 500}]}>
                <ScrollView containerStyle={[styles.container]}>
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
                      style={[styles.textInput]}
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
                      value={this.state.zipcode}
                    />
                    <TouchableOpacity
                      style={[styles.buttonContainer]}
                      onPress={() => this.props.saveUser()}
                    >
                      <Text style={[styles.textGrey18B]}>
                        SUBMIT
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}
