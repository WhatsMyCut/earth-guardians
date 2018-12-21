import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo';

import PhoneInputComp from '../shared/phone/PhoneInputComp';
import TabBarIcon from '../shared/icons/TabBarIcon';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;


export default class PhoneSignup extends React.Component {
  state = {
    valid_phone: false,
  };

  is_phone_valid = valid => {
    this.setState({
      valid_phone: valid,
    });
  };
  phone_signup = () => {
    if (this.state.valid_phone) {
      this.props.authenticate();
    }
  };
  render() {
    return (
      <LinearGradient
        colors={['#ffffff', '#000000']}
        locations={[0.7, 1]}
        style={styles.linearGradient}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ImageBackground
            source={require('../../assets/bg.png')}
            style={{ flex: 1, width: WIDTH, height: HEIGHT, position:'absolute' }}
            resizeMode
          />
          <KeyboardAvoidingView behavior="padding" style={[
              styles.container,
              { justifyContent: 'flex-end', alignItems: 'flex-start' },
            ]}>
          
            <Text style={styles.title}>Take Action</Text>
            <Text style={styles.promo}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet
              veritatis consectetur
            </Text>

            <PhoneInputComp
              updatePhone={this.props.updatePhone}
              validate_phone={this.is_phone_valid}
            />
          
          {this.state.valid_phone ? (
            <TouchableOpacity
              onPress={this.phone_signup}
              style={{ color: '#fff', alignSelf: 'center', paddingBottom: 10 }}
            >
              <TabBarIcon
                name={
                  Platform.OS === 'ios' ? `ios-arrow-down` : 'md-arrow-down'
                }
              />
            </TouchableOpacity>
          ) : null}
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingLeft: 30,
    marginBottom: 80,
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
