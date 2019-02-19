import React from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo';
import { Image } from 'react-native-expo-image-cache';
import navigationService from '../navigation/navigationService';
import { styles } from '../constants/Styles';
import LinearGradientProps from '../constants/LinearGradientProps';
import ActionCardSmall from '../components/shared/card';
import Ionicons from '@expo/vector-icons/Ionicons';
import PrimaryImage from '../constants/PrimaryImage'
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default class GeneralScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    video_url: null,
    picture_url: null,
  };

  componentDidMount() {
    if (this.props.primary_video) {
      fetch(`https://api.vimeo.com/videos/${this.props.primary_video}`, {
        headers: {
          authorization: 'Bearer 5af014003bea7ca29ec721cc5a7bd34d',
        },
      })
        .then(response => response.json())
        .then(data => {
          this.setState({
            picture_url: data.pictures.sizes[4].link,
            video_url: data.download[data.download.length - 2].link,
          });
        });
    }
  }
  renderPrimaryImage = () => {
    const preview = {
      uri: PrimaryImage,
    };

    return (
      <TouchableOpacity
        style={{
          shadowOffset: { width: 10, height: 10 },
          shadowColor: 'transparent',
          shadowOpacity: 1.0,
        }}
      >
        <Image
          style={styles.primaryMedia}
          {...{ preview, uri: this.props.primary_image }}
        />
      </TouchableOpacity>
    );
  };

  renderPrimaryVideo = () => {
    if (!this.state.picture_url && !this.state.video_url) {
      return null;
    }
    const preview = {
      uri:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    };

    return (
      <TouchableOpacity
        onPress={() =>
          navigationService.navigate('Video', {
            screen: this.props.screen,
            video: this.state.video_url,
          })
        }
      >
        <Image
          style={styles.primaryMedia}
          {...{ preview, uri: this.state.picture_url }}
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
    if (!this.props.data) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <Text>Nothing available!</Text>
          </View>
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.headlineView}>{this.primaryView()}</View>
            <FlatList
              style={styles.container}
              numColumns={2}
              style={{
                paddingRight:10
              }}
              data={this.props.data[0].actions}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item, index }) => (
                <ActionCardSmall
                  item={item}
                  index={index}
                  currScreen={this.props.screen}
                />
              )}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

