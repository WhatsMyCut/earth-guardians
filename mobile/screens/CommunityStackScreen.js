import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import { Button } from 'react-native-paper';
import { all } from 'rsvp';
import { LinearGradient } from 'expo';

import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
import graphql from '../components/hoc/graphql';
import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';
import LinearGradientProps from '../constants/LinearGradientProps';
import navigationService from '../navigation/navigationService';

import { images } from './dummy/community_data.json';

// get the device dimensions
SCREEN_HEIGHT = Dimensions.get('window').height;
SCREEN_WIDTH = Dimensions.get('window').width;

@graphql(ALL_ACTION_CATEGORIES, {
  name: 'all_categories',
  fetchPolicy: 'network-only',
})
class CommunityStackScreen extends React.Component {
  state = {
    currentIndex: 0,
  };
  position = new Animated.ValueXY();

  rotateAndTranslate = {
    transform: [...this.position.getTranslateTransform()],
  };

  nextCardOpacity = this.position.x.interpolate({
    inputRange: [0, SCREEN_HEIGHT / 2, SCREEN_HEIGHT],
    outputRange: [0.5, 0.8, 1],
    extrapolate: 'clamp',
  });

  nextCardScale = this.position.x.interpolate({
    inputRange: [0, SCREEN_HEIGHT / 2, SCREEN_HEIGHT],
    outputRange: [1, 1, 1],
    extrapolate: 'clamp',
  });

  imagePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,

    onPanResponderMove: (evt, gs) => {
      this.position.setValue({ x: 0, y: gs.dy });
    },

    onPanResponderRelease: (evt, gs) => {
      if (-100 > gs.dy) {
        Animated.spring(this.position, {
          toValue: { x: 0, y: SCREEN_HEIGHT - 2000 },
          tension: 0,
        }).start(() => {
          this.position.setValue({ x: 0, y: 0 });
          this.setState({ currentIndex: this.state.currentIndex + 1 });
        });
      } else {
        Animated.spring(this.position, {
          toValue: { x: 0, y: 0 },
          friction: 1,
        }).start();
      }
    },
  });

  _handleLoading = () => {
    this.setState({ loading: false });
  };
  _renderCards = () => {
    return images
      .map((image, index) => {
        if (index < this.state.currentIndex) {
          return null;
        } else if (index === this.state.currentIndex) {
          return (
            <Animated.View
              {...this.imagePanResponder.panHandlers}
              key={image.id}
              style={[
                this.rotateAndTranslate,
                {
                  height: SCREEN_HEIGHT - 140,
                  width: SCREEN_WIDTH,
                  paddingHorizontal: 20,
                  position: 'absolute',
                },
              ]}
            >
              <Animated.View
                style={[
                  { opacity: this.nextCardOpacity / 1 },
                  {
                    position: 'absolute',
                    bottom: 50,
                    left: 10,
                    zIndex: 1000,
                    paddingHorizontal: 20,
                  },
                ]}
              >
                <Text style={{ color: 'white', fontSize: 24 }}>
                  {image.title}
                </Text>

                <Text style={{ color: 'white' }}>{image.description}</Text>
                <Button
                  onPress={() =>
                    navigationService.navigate('Petition', {
                      screen: 'Community',
                    })
                  }
                  mode="contained"
                  color="lightblue"
                >
                  Take Action
                </Button>
              </Animated.View>

              <Image
                style={{
                  flex: 1,
                  height: null,
                  width: null,
                  resizeMode: 'cover',
                  borderRadius: 20,
                }}
                source={{ uri: image.url }}
                onLoad={this._handleLoading}
              />
            </Animated.View>
          );
        } else {
          let offset = index * 1 * 10;
          return (
            <Animated.View
              key={image.id}
              style={[
                {
                  opacity: this.nextCardOpacity,
                  height: SCREEN_HEIGHT - 120,
                  width: SCREEN_WIDTH,
                  padding: 20,
                  position: 'absolute',
                  top: offset,
                },
              ]}
            >
              <Image
                style={{
                  flex: 1,
                  height: null,
                  width: null,
                  resizeMode: 'cover',
                  borderRadius: 20,
                }}
                source={{ uri: image.url }}
              />
            </Animated.View>
          );
        }
      })
      .reverse();
  };

  render() {
    return (
      <LinearGradient
        {...LinearGradientProps.whiteToBlackcolors}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>{this._renderCards()}</View>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

CommunityStackScreen.navigationOptions = {
  headerTitle: HeaderNavBar,
  headerStyle: {
    backgroundColor: 'rgba(100, 100,100, 0.1)',
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
};

export default CommunityStackScreen;
