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
import _fetchVideoUrl from '../services/fetchVideoUrl';
import LinearGradientProps from '../constants/LinearGradientProps';
import ActionCardSmall from '../components/shared/card';
import Ionicons from '@expo/vector-icons/Ionicons';
import PrimaryImage from '../constants/PrimaryImage'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { styles, defaults } from '../constants/Styles';

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
      _fetchVideoUrl(this.props.primary_video)
      .then(data => {
        this.setState({
          picture_url: data.picture_url,
          video_url: data.video_url,
        })
      });
    }
  }

  componentWillUnmount() {
    this.props.primary_video = null
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
          source={{preview, uri: this.props.primary_image }}
        />
      </TouchableOpacity>
    );
  };

  renderPrimaryVideo = () => {
    if (!this.state.picture_url && !this.state.video_url) {
      return null;
    }
    const preview = {
      uri: PrimaryImage,
    };

    return (
      <TouchableOpacity
        onPress={() =>
          navigationService.navigate('Video', {
            screen: this.props.screen,
            video: this.state.video_url,
          })
        }
        style={[styles.container, { marginLeft: 20}]}
      >
        <View style={styles.container}>
          <Image
            style={styles.primaryMedia}
            {...{ preview, uri: this.state.picture_url }}
          />
          <LinearGradient
            locations={[0, 1.0]}
            colors={['rgba(0,0,0,0.08)', 'rgba(0,0,0,0.85)']}
            style={styles.container}
          />
        </View>
        <View style={[styles.videoPlayIcon, { position: 'absolute', top: 50 }]}>
          <FontAwesome name="play" size={52} color="white" />
          <Text style={[styles.smallWhiteText]}>Click to Play</Text>
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
        <SafeAreaView style={[styles.container]}>
          <View style={[styles.container]}>
            <Text>Nothing available!</Text>
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={[styles.container]}>
        <ScrollView style={[styles.container, {flexDirection: 'column'}]}>
          <View style={[styles.container]}>{this.primaryView()}</View>
          <View style={[styles.container, {
              marginLeft: 10,
              marginRight: defaults.marginHorizontal,
              marginTop: 20,
            }]}
          >
            <FlatList
              style={[styles.container]}
              numColumns={2}
              style={{
                paddingRight: defaults.paddingRight,
                paddingBottom: 20
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
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

