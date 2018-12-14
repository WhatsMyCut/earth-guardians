import React from 'react';
import GeneralScreen from './GeneralScreen';
// import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import { data } from './dummy/actions.json';
import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';
import Styles from '../constants/Styles';
export default class CommunityStackScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <HeaderNavBar />,
    headerStyle: { backgroundColor: '#333', height: Styles.headerNavBarHeight },
  };

  state = { primary_photo: '', primary_video: '', actions: [] };
  componentDidMount() {
    const actions = data[0].actions;

    this.setState({ actions: actions });
  }

  render() {
    return <GeneralScreen data={this.state.actions} />;
  }
}

// const styles = StyleSheet.create({
//   container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
// });
