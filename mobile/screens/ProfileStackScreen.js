import React from 'react';
import { StyleSheet, Text, SafeAreaView, View, Button } from 'react-native';
import NavigationService from '../navigation/navigationService';

export default class ProfileStackScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ fontSize: 30 }}>Profile</Text>
          <Button
            title="Go to your Action"
            onPress={() => NavigationService.navigate('MyActions')}
          />
        </View>
      </SafeAreaView>
    );
  }
}
