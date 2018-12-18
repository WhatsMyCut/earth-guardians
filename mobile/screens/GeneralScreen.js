import React from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo';

import navigationService from '../navigation/navigationService';
import Layout from '../constants/Layout';
import Styles from '../constants/Styles';
import LinearGradientProps from '../constants/LinearGradientProps';
import ActionCardSmall from '../components/shared/card';
import Ionicons from '@expo/vector-icons/Ionicons';

import FontAwesome from '@expo/vector-icons/FontAwesome';
const width = Layout.window.width - 2 * Styles.marginHorizontal;
const primaryHeight = Styles.primaryHeight;
export default class CommunityStackScreen extends React.Component {
  renderPrimaryImage = () => {
    return (
      <TouchableOpacity
        style={{
          shadowOffset: { width: 10, height: 10 },
          shadowColor: 'transparent',
          shadowOpacity: 1.0,
        }}
      >
        <Image
          source={{ uri: this.props.primary_image }}
          style={styles.primaryMedia}
        />
      </TouchableOpacity>
    );
  };

  renderPrimaryVideo = () => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigationService.navigate('Video', { screen: 'Community' })
        }
      >
        <Image
          source={{ uri: this.props.primary_video }}
          style={styles.primaryMedia}
        />
        <View style={styles.imageLinearGradient}>
          <LinearGradient
            locations={[0, 1.0]}
            colors={['rgba(0,0,0,0.00)', 'rgba(0,0,0,0.70)']}
            style={styles.imageLinearGradient}
          />
        </View>
        <View style={styles.headlineViewPlayIcon}>
          <FontAwesome name="play" size={52} color="white" />
        </View>
      </TouchableOpacity>
    );
  };
  primaryView = () => {
    if (this.props.primary_video) {
      return this.renderPrimaryVideo();
    } else if (this.props.primary_image) {
      return this.renderPrimaryImage();
    } else {
      // do nothing
      return null;
    }
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.headlineView}>{this.primaryView()}</View>
            <FlatList
              style={styles.container}
              numColumns={2}
              data={this.props.data}
              renderItem={({ item, index }) => (
                <ActionCardSmall item={item} index={index} />
              )}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headlineView: {
    height: primaryHeight,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 1,
    borderColor: 'transparent',
    borderRadius: Styles.borderRadius,
  },
  headlineViewPlayIcon: {
    position: 'absolute',
    opacity: 0.8,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLinearGradient: {
    position: 'absolute',
    width: width,
    height: primaryHeight,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: Styles.borderRadius,
  },
  primaryMedia: {
    width: width,
    height: primaryHeight,
    borderRadius: Styles.borderRadius,
  },
});