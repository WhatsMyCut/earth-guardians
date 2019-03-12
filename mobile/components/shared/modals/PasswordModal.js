import React from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
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
import { StoreData } from '../../../store/AsyncStore';
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
		this.registerForPushNotificationsAsync();
		this._getLocationAsync();
	}

	_getLocationAsync = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
		  return;
		}

		let location = await Location.getCurrentPositionAsync({});
		let address = await Location.reverseGeocodeAsync(location.coords);

		console.log('location', address);
		this.setState({ location: address[0] });
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
		console.log('Token is ', token);

		this.setState({ token: token });
	};

	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}

	signup = async () => {
		const { password, confirmPassword, token, location } = this.state;
		const { signup_mutation, username } = this.props;
		if (password === confirmPassword) {
			signup_mutation({ variables: { username: username, password: password, token: token, country: location ? location.country : null, country_name: location ? location.isoCountryCode : null, state: location ? location.region : null, zipcode: location ? location.postalCode : null } }).then((res) => {
				this.props.setToken(res.data.signup.token);
				this.props.phone_signup();
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
				this.props.phone_signup();
			});
		} else {
			this.setState({ standardError: 'You must enter your username and password...' });
		}
	};

	loadingModalContent() {
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
							Loading ...
						</Text>
					</View>
				</View>
			</Modal>
		);
	}

	_userExistsContent() {
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
							borderRadius: 15,
							paddingTop: 20,
							paddingHorizontal: 15,
							paddingBottom: 10,
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
							Welcome Back!
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
						{this.state.standardError && (
							<Text
								style={{
									color: 'red',
									marginHorizontal: 20,
									fontSize: 18,
									fontWeight: 'bold',
									textAlign: 'center',
								}}
							>
								{this.state.standardError}
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
							onPress={this.signIn}
						>
							<Text style={{ color: '#333', fontSize: 18, fontWeight: 'bold' }}>Sign In</Text>
						</TouchableOpacity>

						<TouchableHighlight
							style={{ paddingTop: 10, paddingBottom: 10 }}
							onPress={() => Linking.openURL('mailto:reachout@earthguardians.org')}
						>
							<Text style={{ color: 'white' }}>Reset Password</Text>
						</TouchableHighlight>
					</View>
				</View>
			</Modal>
		);
	}

	render() {
		const { goBack, user_exists_query } = this.props;
		if (user_exists_query.loading) {
			return this.loadingModalContent();
		}

		if (user_exists_query.user) {
			if (user_exists_query.user.id) {
				return this._userExistsContent();
			}
		}

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
							borderRadius: 15,
							paddingTop: 20,
							paddingHorizontal: 15,
							paddingBottom: 10,
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
						{this.state.standardError && (
							<Text
								style={{
									color: 'red',
									marginHorizontal: 20,
									fontSize: 18,
									fontWeight: 'bold',
									textAlign: 'center',
								}}
							>
								{this.state.standardError}
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
							onChangeText={(password) => this.setState({ password, passwordError: null })}
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
							onChangeText={(confirmPassword) => this.setState({ confirmPassword, passwordError: null })}
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
								borderRadius: 5,
								justifyContent: 'center',
								alignItems: 'center',
								paddingTop: 20,
								paddingBottom: 20,
							}}
							onPress={this.signup}
						>
							<Text style={{ color: '#333', fontSize: 18, fontWeight: 'bold' }}>SUBMIT</Text>
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
