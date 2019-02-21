import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Animated,
  Text,
  Linking,
  ImageBackground,
  TouchableOpacity,
  PanResponder,
  Platform,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import { LinearGradient, Asset, AppLoading, BlurView, Video } from 'expo';

import Logo from '../../constants/Logo'
import PhoneInputComp from '../shared/phone/PhoneInputComp';
import TabBarIcon from '../shared/icons/TabBarIcon';
import PasswordModal from '../shared/modals/PasswordModal';
import { styles } from '../../constants/Styles'
import graphql from '../hoc/graphql';
// import registerForPushNotificationsAsync from '../../services/registerForPushNotifications';
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
    token: null,
    video_url: null
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

  phone_signup = async () => {
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


  componentDidMount(){
    fetch(`https://api.vimeo.com/videos/309965359`, {
      headers: {
        authorization: 'Bearer 5af014003bea7ca29ec721cc5a7bd34d',
      },
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          picture_url: data.pictures.sizes[4].link,
          video_url: data.download[data.download.length - 2].link,
        });
      });
  }

  checkIfUserExists = () => {
    this.user_exists({ variables: { username: this.state.phone } });
  };

  render() {
    const { video_url } = this.state;

    if (!video_url) {
      return (
        <AppLoading
        />
      );
    }





    return (
        <Animated.View style={{flex:1}} {...this.viewResponder.panHandlers}>
        <SafeAreaView style={{ flex: 1 }}>

         <Video
          source={{uri: video_url}}
          rate={1.0}
          volume={1.0}
          isMuted={true}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ flex: 1,
            width: WIDTH,
            height: HEIGHT,
            position: 'absolute', }}
        />
        <LinearGradient
            colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.9)']}
            locations={[0.4, 1]}
            style={{
              position: 'absolute',
              width: WIDTH,
              height: HEIGHT,
            }}
          />
          <Logo beta={ 'true' } />

          {/* <ImageBackground
            source={require('../../assets/earth_guardians_main.gif')}
            style={{
              flex: 1,
              width: WIDTH,
              height: HEIGHT,
              position: 'absolute',
            }}
            resizeMode="cover"
          > */}
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                paddingBottom: 60,

                paddingLeft: 30,
                paddingRight: 70,
              }}
            >
              <Text style={styles.title}>Welcome to EarthTracks!</Text>
              <Text style={{...styles.promo, fontWeight:'bold',paddingBottom:5}}>Fitness Tracker for the Planet</Text>
              <Text style={styles.promo}>The change we need for a</Text>
              <Text style={{...styles.promo,paddingBottom:5}}>regenerative shift starts with you.</Text>
              <Text style={{...styles.promo,paddingBottom:8}}>ARE YOU IN?</Text>




              <PhoneInputComp
                updatePhone={this._setPhone}
                validate_phone={this.is_phone_valid}
                onChangeUpdatePhone = {this._setPhone}
              />
              {this.state.valid_phone && (
                <Text style={{fontSize:10, color:'#ffffff', paddingTop:3}}>By signing up, you confirm that you agree to our Terms of Use and have read and understood our <Text onPress={()=> Linking.openURL('https://app.termly.io/document/privacy-policy-for-website/ad2b059a-ddec-4f69-97a5-4dc346948ac7')}>Privacy Policy</Text>.</Text>
              )}

            </View>
            {this.state.showPasswordModal && (
              <BlurView
              tint="dark"
              intensity={80}
              style={{height:HEIGHT, width:WIDTH, position:"absolute"}}
              >
              <KeyboardAvoidingView behavior="padding" >
                <PasswordModal phone_signup={this.phone_signup} setToken={this.setToken} isVisible={this.state.showPasswordModal} username={this.state.phone} togglePasswordModal={this.togglePasswordModal}/>
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
