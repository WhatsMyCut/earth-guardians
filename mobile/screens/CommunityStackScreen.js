import React from 'react';
import GeneralScreen from './GeneralScreen';
// import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import { data } from './actions.json';
import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';
import Styles from '../constants/Styles';
export default class CommunityStackScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <HeaderNavBar />,
    headerStyle: { backgroundColor: '#333', height: Styles.headerNavBarHeight },
  };

  render() {
    return <GeneralScreen data={data} />;
  }
}

// const styles = StyleSheet.create({
//   container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
// });
