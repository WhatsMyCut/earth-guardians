import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';

export default class CommunityStackScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <HeaderNavBar navigation={navigation} />,

      headerStyle: { backgroundColor: '#333' },
    };
    //title: 'hello',
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ fontSize: 30 }}>Community</Text>
        </View>
      </SafeAreaView>
    );
  }
}
