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
import { Notifications, Permissions} from 'expo';
import { Dropdown } from 'react-native-material-dropdown';
import { styles, defaults } from '../../../constants/Styles';
import Colors from '../../../constants/Colors';

export default class UpdateUserModal extends React.Component {
  state = {
    phone: null,
    zipcode: null,
    crew: null,
    name: null,
    email: null,
    crew_type: null,
    token: null
  };

  constructor(props) {
    super(props);
  }


  componentDidMount() {
    const { my_user } = this.props
    if (!my_user) return
    this.setState({
      phone: my_user.me.phone || my_user.me.username,
      zipcode: my_user.me.zipcode,
      crew: my_user.me.crew,
      name: my_user.me.name,
      email: my_user.me.email,
      crew_type: my_user.me.crew_type,
      token: my_user.me.token
    })

    this.registerForPushNotificationsAsync();
  }

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    let token = await Notifications.getExpoPushTokenAsync();
    console.log('token', token);
    // console.log('Token is ', token);

    this.setState({token});
  };

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
            <TouchableWithoutFeedback style={[styles.container, styles.coverScreen]} onPress={() => {
              return false
            }}>
              <View style={[styles.modalView, styles.centerAll, {
                marginVertical: (defaults.primaryHeight / 2) - 225,
              }]}>
          <KeyboardAvoidingView
            behavior="position"
            style={[styles.container, styles.centerAll, {
              flexDirection: 'column',
            }]}
          >
                <ScrollView containerStyle={[styles.container]}>
                  <View style={[styles.headerContainer]}>
                    <Text style={[styles.headerText]}>
                      UPDATE PROFILE
                    </Text>
                  </View>
                  <View style={[styles.container]}>
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
                      onChangeText={zipcode => this.setState({zipcode})}
                      placeholder={'Zipcode'}
                      placeholderTextColor={Colors.white}
                      keyboardType="numeric"
                      secureTextEntry={false}
                      returnKeyType="done"
                      value={this.state.zipcode}
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
                      itemColor={Colors.errorText}
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
                    <TouchableOpacity
                      style={[styles.buttonContainer]}
                      onPress={() => this.props.saveUser(this.state)}
                    >
                      <Text style={[styles.textGrey18B]}>
                        SUBMIT
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
                </KeyboardAvoidingView>
              </View>
            </TouchableWithoutFeedback>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}
