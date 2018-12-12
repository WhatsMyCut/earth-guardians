import React from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';

export default class TransportationStackScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ fontSize: 30 }}>Transportation</Text>
        </View>
      </SafeAreaView>
    );
  }
}
