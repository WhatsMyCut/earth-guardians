import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import { all } from 'rsvp';
import { LinearGradient } from 'expo';

import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
import graphql from '../components/hoc/graphql';
import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';
import LinearGradientProps from '../constants/LinearGradientProps';

import { images } from './dummy/community_data.json';
@graphql(ALL_ACTION_CATEGORIES, {
  name: 'all_categories',
  fetchPolicy: 'network-only',
})
class CommunityStackScreen extends React.Component {
  state = { images: [], imageIndex: 0 };

  // get the device dimensions
  height = Dimensions.get('window').height;
  width = Dimensions.get('window').width;
  imageYPos = new Animated.Value(0);

  async componentDidMount() {
    this.setState({
      images,
    });
  }

  imagePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gs) => {
      //determine which direct you are swipping, only take action if the swipe is up
      const direction = Math.sign(gs.dy);
      if (direction < 0) {
        this.imageYPos.setValue(gs.dy);
      }
    },
    onPanResponderRelease: (evt, gs) => {
      if (Math.abs(gs.dy) > this.height * 0.3) {
        // 20% swipped, finish the swipping
        // completed the animation

        //determine which direct you are swipping
        // -1 === swipe up, +1 === swipe down
        const direction = Math.sign(gs.dy);
        Animated.timing(this.imageYPos, {
          toValue: direction * this.height,
          duration: 250,
        }).start(() => this.handleSwipe(-1 * direction));
      } else {
        Animated.timing(this.imageYPos, {
          toValue: 0,
          duration: 250,
        }).start();
      }
    },
  });

  handleSwipe = direction => {
    // do a quick check for the swipes
    if (!this.state.images[this.state.imageIndex + direction]) {
      Animated.spring(this.imageYPos, {
        toValue: 0,
      }).start();
      return;
    }

    // change the index to the new image, then animate the entrance of the new image
    this.setState(
      prevState => ({ imageIndex: prevState.imageIndex + direction }),
      () => {
        this.imageYPos.setValue(direction * this.height);
        Animated.spring(this.imageYPos, {
          toValue: 0,
        }).start();
      }
    );
  };

  renderImages = () => (
    <Animated.View style={[{ flex: 1, padding: 10, top: this.imageYPos }]}>
      <Image
        {...this.imagePanResponder.panHandlers}
        style={{
          flex: 1,
          width: null,
          height: null,
          resizeMode: 'cover',
          borderRadius: 20,
        }}
        source={{ uri: this.state.images[this.state.imageIndex].url }}
      />
    </Animated.View>
  );

  render() {
    return (
      <LinearGradient {...LinearGradientProps.default} style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <View style={{ flex: 1 }}>
              {this.state.images.length ? this.renderImages() : null}
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: this.height - 120, 
    width: this.width, 
    padding: 10 , 
  },
});

CommunityStackScreen.navigationOptions = {
  headerTitle: HeaderNavBar,
  headerStyle: {
    backgroundColor: LinearGradientProps.default.colors[0],
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
};

export default CommunityStackScreen;
