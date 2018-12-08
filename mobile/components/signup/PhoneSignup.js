import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, Button } from 'react-native';
import { LinearGradient } from 'expo';

import PhoneInputComp from '../shared/phone/PhoneInputComp';
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
          <View
            flex
            bottom
            style={[
              styles.container,
              { justifyContent: 'flex-end', alignItems: 'flex-start' },
            ]}
          >
            <Text style={styles.title}>Take Action</Text>
            <Text style={styles.promo}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet
              veritatis consectetur
            </Text>

            <PhoneInputComp
              updatePhone={this.props.updatePhone}
              validate_phone={this.is_phone_valid}
            />
          </View>
          {this.state.valid_phone ? (
            <Button
              onPress={this.phone_signup}
              style={{ color: '#fff', alignSelf: 'center', paddingBottom: 10 }}
              title="Login In " //TODO: replace with a downward point arrow
            />
          ) : null}
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingBottom: 20,
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
