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

  state = { primary_image: '', primary_video: '', actions: [] };
  componentDidMount() {
    const actions = data[0].actions;
    const primary_image = data[0].primary.image;
    const primary_video = data[0].primary.video_url;

    this.setState({ actions, primary_image, primary_video });
  }

  render() {
    return (
      <GeneralScreen
        data={this.state.actions}
        primary_image={this.state.primary_image}
        primary_video={this.state.primary_video}
      />
    );
  }
}

// const styles = StyleSheet.create({
//   container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
// });
