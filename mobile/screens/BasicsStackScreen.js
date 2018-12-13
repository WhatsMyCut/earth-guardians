import React from 'react';
import { SafeAreaView, Image, StyleSheet, Text, View } from 'react-native';

export default class BasicsStackScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ fontSize: 30 }}>Basics</Text>
        </View>
      </SafeAreaView>
    );
  }
}
