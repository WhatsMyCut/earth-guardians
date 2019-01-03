import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import { LinearGradient, Asset, AppLoading } from 'expo';

import PhoneInputComp from '../shared/phone/PhoneInputComp';
import TabBarIcon from '../shared/icons/TabBarIcon';
import PasswordModal from '../shared/modals/PasswordModal';
import graphql from '../hoc/graphql';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export default class PhoneSignup extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    valid_phone: false,
    username: null,
    phone: null,
    isReady: false,
    showPasswordModal: false,
    dialCode: null,
    token: null
  };

  is_phone_valid = valid => {
    this.setState({
      valid_phone: valid,
    });
  };

  togglePasswordModal = () => {
    this.setState({ showPasswordModal: !this.state.showPasswordModal });
  };

  setToken = (token) => {
    this.setState({token})
  }

  phone_signup = () => {
    if (this.state.valid_phone) {
      this.props.authenticate({
        phone: this.state.phone,
        dialCode: this.state.dialCode,
        token: this.state.token
      });
    }
  };

  // _setPhone = (number) =>{
  //   const {valid_phone, phone} = this.state;
  //   console.log('number', number);
  //     this.setState({phone: number.number});
  // }
  _setPhone = numberAndCode => {
    const { valid_phone } = this.state;
    if (valid_phone) {
      this.setState({
        phone: numberAndCode.number,
        username: numberAndCode.number,
        dialCode: numberAndCode.country_dial_code,
      });
    }
  };

  async _cacheResourcesAsync() {
    const images = [require('../../assets/earth_guardians_main.gif')];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  }

  checkIfUserExists = () => {
    this.user_exists({ variables: { username: this.state.phone } });
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <LinearGradient
        colors={['#ffffff', '#000000']}
        locations={[0.7, 1]}
        style={styles.linearGradient}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ImageBackground
            source={require('../../assets/earth_guardians_main.gif')}
            style={{
              flex: 1,
              width: WIDTH,
              height: HEIGHT,
              position: 'absolute',
            }}
            resizeMode="cover"
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                paddingBottom: 60,

                paddingLeft: 30,
                paddingRight: 130,
              }}
            >
              <Text style={styles.title}>Take Action</Text>
              <Text style={styles.promo}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Eveniet veritatis consectetur
              </Text>

              <PhoneInputComp
                updatePhone={this._setPhone}
                validate_phone={this.is_phone_valid}
                onChangeUpdatePhone = {this._setPhone}
              />
            </View>
            {this.state.showPasswordModal && (
              <PasswordModal phone_signup={this.phone_signup} setToken={this.setToken} isVisible={this.state.showPasswordModal} username={this.state.phone} togglePasswordModal={this.togglePasswordModal}/>
            )}

            {this.state.valid_phone ? (
              <TouchableOpacity
                onPress={this.togglePasswordModal}
                style={{
                  color: '#fff',
                  alignSelf: 'center',
                  paddingBottom: 10,
                }}
              >
                <TabBarIcon
                  name={
                    Platform.OS === 'ios' ? `ios-arrow-down` : 'md-arrow-down'
                  }
                />
              </TouchableOpacity>
            ) : null}
          </ImageBackground>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 130,
  },
  linearGradient: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    color: '#ffffff',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  promo: { fontSize: 16, color: '#ffffff' },
});
