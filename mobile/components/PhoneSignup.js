import React from 'react';
import { StyleSheet, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { View, Text, TextInput } from 'react-native-ui-lib';
import { LinearGradient } from 'expo';

import PhoneInputComp from './PhoneInputComp';
export default class PhoneSignup extends React.Component {
  state = {
    areaCode: {
      US: '+1',
    },
    number: '',
    info: 'This contains extra infomation',
    displayInfo: false,
    validPhone: false,
  };

  handleNumberCHange = number => {
    this.setState({
      number,
    });
  };
  render() {
    return (
      <LinearGradient
        colors={['#ffffff', '#000000']}
        locations={[0.7, 1]}
        style={styles.linearGradient}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View flex bottom style={styles.container}>
            <Text text30 white style={{ fontWeight: 'bold' }}>
              Take Action
            </Text>
            <Text text80 white>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet
              veritatis consectetur
            </Text>
            <KeyboardAvoidingView behavior="height">
              <PhoneInputComp
                number={this.state.number}
                changedNumber={this.handleNumberCHange}
              />
            </KeyboardAvoidingView>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingBottom: 30,
    paddingRight: 130,
  },
  linearGradient: {
    flex: 1,
  },
  heading: {
    color: 'red',
  },
});
