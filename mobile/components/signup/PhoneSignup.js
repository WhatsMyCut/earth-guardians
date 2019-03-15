import React from 'react';
import {  SafeAreaView,
  View,
  Animated,
  ActivityIndicator,
  Text,
  Linking,
  TouchableOpacity,
  PanResponder,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { LinearGradient, Asset, BlurView, Video } from 'expo';

import Logo from '../../constants/Logo'
import PhoneInputComp from '../shared/phone/PhoneInputComp';
import TabBarIcon from '../shared/icons/TabBarIcon';
import PasswordModal from '../shared/modals/PasswordModal';
import { styles, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/Styles'
import _fetchVideoUrl from '../../services/fetchVideoUrl';
import graphql from '../hoc/graphql';
// import registerForPushNotificationsAsync from '../../services/registerForPushNotifications';
export default class PhoneSignup extends React.Component {
  constructor(props) {
    super(props);
  }
  _isMounted = false
  video_id = '309965359'
  state = {
    valid_phone: false,
    username: null,
    phone: null,
    isReady: false,
    showPasswordModal: false,
    dialCode: null,
    token: null,
    video_url: null,
    picture_url: null,
  };

  is_phone_valid = valid => {
    this.setState({
      valid_phone: valid,
    });
  };

  togglePasswordModal = () => {
    this.setState({ showPasswordModal: !this.state.showPasswordModal });
  };

  setToken = token => {
    this.setState({token})
  }

  phone_signup = async () => {
    if (this.state.valid_phone) {
      this.props.authenticate({
        phone: this.state.phone,
        dialCode: this.state.dialCode,
        token: this.state.token
      });
    }
  };

  _setPhone = numberAndCode => {
    const { valid_phone } = this.state;
    // console.log('_setPhone', numberAndCode, valid_phone)
    if (valid_phone) {
      this.setState({
        phone: numberAndCode.number,
        username: numberAndCode.number,
        dialCode: numberAndCode.country_dial_code
      });
    }
  };

  componentWillMount() {
    this.viewResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: (evt, gs) => {
        if (-200 > gs.dy) {
          if(this.state.valid_phone){
            this.setState({ showPasswordModal: true });
          }
        }
      },
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }


  componentDidMount(){
    this._isMounted = true;
    _fetchVideoUrl(this.video_id)
    .then(data => (this._isMounted) ? this.setState({ video_url: data.video_url }) : true)
    .catch(e => console.error(e))
  }

  checkIfUserExists = () => {
    this.user_exists({ variables: { username: this.state.phone } });
  };

  render() {
    const { video_url } = this.state;

    if (!video_url) {
      return (
        <ActivityIndicator />
      );
    }

    return (
        <Animated.View style={[styles.container]} {...this.viewResponder.panHandlers}>
        <SafeAreaView style={[styles.container]}>

         <Video
          source={{uri: this.state.video_url}}
          rate={1.0}
          volume={1.0}
          isMuted={true}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={[styles.container, styles.coverScreen,]}
        />
        <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.9)']}
            locations={[0.4, 1]}
            style={[styles.coverScreen]}
          />
            <View style={[styles.splashLogoContainer]}>
              <Logo beta={ 'true' } />
            </View>
            <View
              style={[styles.container, {
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                padding: 20,
              }]}
            >
              <View style={[styles.container, { marginBottom: 30}]}>
                <Text style={[styles.title]}>WELCOME TO EARTHTRACKS!</Text>
                <Text style={[styles.promo, { fontWeight:'bold', paddingBottom:5 }]}>Fitness Tracker for the Planet</Text>
                <Text style={[styles.promo]}>The change we need for a</Text>
                <Text style={[styles.promo, { paddingBottom:5 }]}>regenerative shift starts with you.</Text>
                <Text style={[styles.promo, { paddingBottom:8 }]}>ARE YOU IN?</Text>
                <View style={[styles.container, { marginTop: 20 }]}>
                  <KeyboardAvoidingView behavior="padding" >
                    <PhoneInputComp
                      updatePhone={this._setPhone}
                      validate_phone={this.is_phone_valid}
                      onChangeUpdatePhone = {this._setPhone}
                    />
                    {this.state.valid_phone && (
                      <Text style={[styles.smallWhiteText]}>By signing up, you confirm that you agree to our Terms of Use and have read and understood our <Text onPress={()=> Linking.openURL('https://app.termly.io/document/privacy-policy-for-website/ad2b059a-ddec-4f69-97a5-4dc346948ac7')}>Privacy Policy</Text>.</Text>
                    )}
                  </KeyboardAvoidingView>
                </View>
              </View>
            </View>
            {this.state.showPasswordModal && (
              <BlurView
              tint="dark"
              intensity={80}
              style={[styles.coverScreen, styles.coverAll]}
              >
                <KeyboardAvoidingView behavior="padding" >
                  <PasswordModal
                    phone_signup={this.phone_signup}
                    setToken={this.setToken}
                    isVisible={this.state.showPasswordModal}
                    username={this.state.phone}
                    togglePasswordModal={this.togglePasswordModal}
                    onClose={this.togglePasswordModal}
                  />
                </KeyboardAvoidingView>
              </BlurView>
             )}

            {this.state.valid_phone ? (
              <TouchableOpacity
                onPress={this.togglePasswordModal}
                style={{
                  color: '#fff',
                  alignSelf: 'center',
                  paddingBottom: 10,
                }}
                hitSlop={{top: 15, left: 15, right:15, bottom:15}}
              >
                <TabBarIcon
                  name={
                    Platform.OS === 'ios' ? `ios-arrow-down` : 'md-arrow-down'
                  }
                />
              </TouchableOpacity>
            ) : null}
          {/* </ImageBackground> */}
        </SafeAreaView>
        </Animated.View>
    );
  }
}
