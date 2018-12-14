import React from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo';

import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';
import Layout from '../constants/Layout';
import Styles from '../constants/Styles';
import LinearGradientProps from '../constants/LinearGradientProps';
import ActionCardSmall from '../components/shared/card';
const width = Layout.window.width - 2 * Styles.marginHorizontal;
const primaryHeight = Styles.primaryHeight;
export default class CommunityStackScreen extends React.Component {
  renderPrimaryImage = () => {
    return (
      <Image
        source={{ uri: this.props.primary_image }}
        style={styles.primaryMedia}
      />
    );
  };

  renderPrimaryVideo = () => {
    return (
      <Image
        source={{ uri: this.props.primary_video }}
        style={styles.primaryMedia}
      />
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
    // uri  can't be empty so, we give it a none string
    const primary_image = this.props.primary_image
      ? this.props.primary_image
      : 'none';
    const primary_video = this.props.primary_video
      ? this.props.primary_video
      : null;
    return (
      <LinearGradient
        {...LinearGradientProps.lightGrayToDarkGraycolors}
        style={styles.linearGradient}
      >
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
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1
  },
  container: { 
    flex: 1,
    paddingTop: 30
  },
  headlineView: {
    height: primaryHeight,
    borderWidth: 1,
    width: width,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,

    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: Styles.borderRadius,
  },
  primaryMedia: {
    width: width,
    height: primaryHeight,
    borderRadius: Styles.borderRadius,
  },
});
