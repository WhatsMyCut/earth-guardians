import React from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Linking,
  Alert,
  TouchableHighlight,
  KeyboardAvoidingView,
} from 'react-native';
import NavigationService from '../../../navigation/navigationService';
import graphql from '../../hoc/graphql';
import { SIGNUP } from '../../graphql/mutations/signup_mutation';
import { LOGIN } from '../../graphql/mutations/login_mutation';
import { USER_EXISTS_QUERY } from '../../graphql/queries/UserExistsQuery';
import { styles, defaults } from '../../../constants/Styles';
import { Permissions, Notifications, Location } from 'expo';


@graphql(SIGNUP, {
  name: 'signup_mutation',
})
@graphql(LOGIN, {
  name: 'login_mutation',
})
@graphql(USER_EXISTS_QUERY, {
  name: 'user_exists_query',
  options: (props) => {
    const username = props.username ? props.username : null;
    return {
      variables: {
        username,
      },
    };
  },
})
export default class PasswordModal extends React.Component {
  state = {
    password: '',
    confirmPassword: '',
    passwordError: null,
    existsPassword: null,
    standardError: null,
    token: null,
    location: null
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Promise.all([
      this.registerForPushNotificationsAsync(),
      this._getLocationAsync()
    ])
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let address = await Location.reverseGeocodeAsync(location.coords);

    // console.log('location', location, address[0]);
    this.setState({location: address[0]});
    // this.props.setLocation(address[0]);
  };


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
    // console.log('Token is ', token);

    this.props.setToken(token);
  };

  signup = async () => {
    const { password, confirmPassword, token, location } = this.state;
    const { signup_mutation, username } = this.props;
    let vars = {
      username: username,
      password: password,
      token: token,
      country: location ? location.country : null,
      country_name: location ? location.isoCountryCode : null,
      state: location ? location.region : null,
      zipcode: location ? location.postalCode : null
    };

    if (vars.password === confirmPassword) {
      signup_mutation({ variables: vars })
      .then((res) => {
        this.props.setToken(res.data.signup.token);
        this.props.phone_signup(vars);
      });
      //NavigationService.navigate('Main');
    } else {
      this.setState({ passwordError: 'Passwords do not Match' });
    }
  };

  signIn = () => {
    const { login_mutation, username } = this.props;
    const { existsPassword } = this.state;
    if (existsPassword && username) {
      login_mutation({ variables: { username: username, password: existsPassword } }).then((res) => {
        this.props.setToken(res.data.login.token);
        this.props.phone_signup(this.state);
      });
    } else {
      this.setState({ standardError: 'You must enter your username and password...' });
    }
  };

  _userExistsContent() {
    return (
      <View style={[styles.container]}>
        <Text style={[styles.headerText, {marginBottom: 30,}]}>
          WELCOME BACK!
        </Text>
        {this.state.passwordError && (
          <Text style={[styles.error]}>
            {this.state.passwordError}
          </Text>
        )}
        {this.state.standardError && (
          <Text style={[style.error]}>
            {this.state.standardError}
          </Text>
        )}
        <TextInput
          style={[styles.textInput, { alignSelf: 'center', }]}
          onChangeText={(password) =>
            this.setState({ existsPassword: password, passwordError: null, standardError: null })}
          placeholder="Password"
          placeholderTextColor="#fff"
          keyboardType="default"
          secureTextEntry={true}
          returnKeyType="done"
          // value={this.state.zipCode}
        />
        <TouchableOpacity
          style={[styles.buttonContainer]}
          onPress={this.signIn}
        >
          <Text style={[styles.textGrey18B]}>Sign In</Text>
        </TouchableOpacity>

        <TouchableHighlight
          style={[styles.centerText, { paddingVertical: 10, }]}
          onPress={() => Linking.openURL('mailto:reachout@earthguardians.org')}
        >
          <Text style={[styles.textWhite, styles.centerText]}>Reset Password</Text>
        </TouchableHighlight>
      </View>
    );
  }

  _userNotExistsContent() {
    return (
      <View style={[styles.container]}>
        <View style={[styles.headerContainer]}>
          <Text style={[styles.headerText]}>
            CREATE A PASSWORD
          </Text>
        </View>
        <TextInput
          style={[styles.textInput]}
          onChangeText={(password) => this.setState({ password, passwordError: null })}
          placeholder="Password"
          placeholderTextColor="#fff"
          keyboardType="default"
          secureTextEntry={true}
          returnKeyType="done"
          // value={this.state.zipCode}
        />
        <TextInput
          style={[styles.textInput, {marginTop: 10}]}
          onChangeText={(confirmPassword) => this.setState({ confirmPassword, passwordError: null })}
          placeholder="Confirm Password"
          placeholderTextColor="#fff"
          keyboardType="default"
          secureTextEntry={true}
          returnKeyType="done"
          // value={this.state.zipCode}
        />
        <View style={[styles.container]}>
          <TouchableOpacity
            style={[styles.buttonContainer]}
            onPress={this.signup}
          >
            <Text style={[styles.textGrey18B]}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    const { goBack, user_exists_query } = this.props;
    let content;
    if (user_exists_query.loading) {
      content = <ActivityIndicator size={'large'} style={[styles.textWhite]} />
    }

    if (user_exists_query.user) {
      content = this._userExistsContent();
    } else {
      content = this._userNotExistsContent();
    }

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.isVisible}
      >
        <TouchableWithoutFeedback style={[styles.container, styles.coverScreen]} onPress={() => {
          this.props.onClose()
        }}>
          <KeyboardAvoidingView style={[styles.container]}>
            <View style={[styles.container]}>
              <TouchableWithoutFeedback style={[styles.container, styles.coverScreen]} onPress={() => {
                  return false
                }}>
                <View style={[styles.modalView, {
                  marginVertical: (defaults.primaryHeight / 2) - 150,
                  marginHorizontal: 20 }]}
                >
                  {this.state.passwordError && (
                    <Text style={[styles.error]}>
                      {this.state.passwordError}
                    </Text>
                  )}
                  {this.state.standardError && (
                    <Text style={[styles.error]}>
                      {this.state.standardError}
                    </Text>
                  )}
                  {
                    content
                  }
                </View>
              </TouchableWithoutFeedback>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}
