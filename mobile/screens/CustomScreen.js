import React from 'react';

import { all } from 'rsvp';
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableHighlight,
  Text,
} from 'react-native';
import VideoPlayer from '@expo/videoplayer';
import { Ionicons } from '@expo/vector-icons';
import BaseScreen from './BaseScreen';
import { Video } from 'expo';

import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
import graphql from '../components/hoc/graphql';
import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';

import { data } from './dummy/actions.json';
@graphql(ALL_ACTION_CATEGORIES, {
  name: 'all_categories',
  fetchPolicy: 'network-only',
})
class CustomScreen extends BaseScreen {
  render() {
    const COLOR = '#92DCE5';
    const icon = (name, size = 36) => () => (
      <Ionicons
        name={name}
        size={size}
        color={COLOR}
        style={{ textAlign: 'center' }}
      />
    );
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <VideoPlayer
            videoProps={{
              shouldPlay: false,
              resizeMode: Video.RESIZE_MODE_CONTAIN,
              source: {
                uri: 'http://www.streambox.fr/playlists/test_001/stream.m3u8',
              },
              isMuted: false,
            }}
            playIcon={icon('ios-play-outline')}
            pauseIcon={icon('ios-pause-outline')}
            fullscreenEnterIcon={icon('ios-expand-outline', 28)}
            fullscreenExitIcon={icon('ios-contract-outline', 28)}
            trackImage={require('../assets/track.png')}
            thumbImage={require('../assets/thumb.png')}
            textStyle={{
              color: COLOR,
              fontSize: 12,
            }}
            showFullscreenButton={false}
            isPortrait={this.state.isPortrait}
            switchToLandscape={this.switchToLandscape.bind(this)}
            switchToPortrait={this.switchToPortrait.bind(this)}
            playFromPositionMillis={0}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
};

CustomScreen.navigationOptions = {
  headerTitle: HeaderNavBar,
  headerStyle: {
    backgroundColor: '#aaa',
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
};

export default CustomScreen;
