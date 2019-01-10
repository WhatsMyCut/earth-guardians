import React from 'react';
//import { all } from 'rsvp';
import {
  SafeAreaView,
  View,
  Animated,
  PanResponder,
  TouchableHighlight,
  TouchableOpacity,
  Text,
} from 'react-native';
//import { Video } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import VideoPlayer from '@expo/videoplayer';
import BaseScreen from './BaseScreen';


// import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';

// import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';

// import { data } from './dummy/actions.json';
// import navigationService from '../navigation/navigationService';

class DefaultScreen extends BaseScreen {
  
  
  async componentWillMount(){

    const screen = this.props.navigation.getParam('screen', 'MyActions');
    const petition = this.props.navigation.getParam('petition');


    this.viewResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: (evt, gs) => {
        if( 200 < gs.dy){
          console.log('navigate back')
          if(petition){
            this.props.navigation.navigate(screen, {screen:"CommunityStack", image:petition, petitionTitle:petition.title});
          } else{
            this.props.navigation.navigate(screen)
          }
        }
        if( -100 > gs.dy){
          console.log('navigate back')
          if(petition){
            this.props.navigation.navigate(screen, {screen:"CommunityStack", image:petition, petitionTitle:petition.title});
          } else{
            this.props.navigation.navigate(screen)
          }
        }
      }
    })
  }
  changeRate(rate) {
    this._playbackInstance.setStatusAsync({
      rate: rate,
      shouldCorrectPitch: true,
    });
  }

  _mountVideo = component => {
    this.video = component;
  };

  render() {
    const RateButton = ({ rate }) => (
      <TouchableHighlight
        style={{
          marginLeft: 10,
          borderRadius: 5,
          padding: 5,
          borderWidth: 1,
          borderColor: 'black',
        }}
        onPress={this.changeRate.bind(this, rate)}
      >
        <Text>{rate + 'x'}</Text>
      </TouchableHighlight>
    );

    const screen = this.props.navigation.getParam('screen', 'MyActions');
    const petition = this.props.navigation.getParam('petition');

    const videoUrl = this.props.navigation.getParam(
      'video',
      'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
    );

    console.ignoredYellowBox = ['Warning:'];
    return (
      <Animated.View {...this.viewResponder.panHandlers} style={{ flex: 1 }}>
        <View style={styles.container}>
         
          <View
            style={[
              styles.container,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
          >
            <VideoPlayer
              ref={this._mountVideo}
              style={{
                justifyContent: 'flex-start',
              }}
              videoProps={{
                shouldPlay: true,
                resizeMode: 'cover',
                source: {
                  uri: videoUrl,
                },
                isMuted: false,
                ref: component => {
                  this._playbackInstance = component;
                },
              }}
              showControlsOnLoad={true}
              isPortrait={this.state.isPortrait}
              switchToLandscape={this.switchToLandscape.bind(this)}
              switchToPortrait={this.switchToPortrait.bind(this)}
              playFromPositionMillis={0}
            />
            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignContent: 'center',
              }}
            >
              <Text style={{ color: '#ffffff' }}> Change Default Rate </Text>
              <RateButton rate={1} style={{ color: '#ffffff' }} />
              <RateButton rate={2} style={{ color: '#ffffff' }} />
              <RateButton rate={4} style={{ color: '#ffffff' }} />
            </View> */}
          </View>
        </View>
      </Animated.View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  topBackNav: {
    flex: 1,
    justifyContent: 'flex-start',
    maxHeight: 30,
    paddingHorizontal: 5,
  },
};

DefaultScreen.navigationOptions = {
  headerStyle: {
    backgroundColor: '#000000',
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
};

export default DefaultScreen;
