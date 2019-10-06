import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Animated,
  ActivityIndicator,
  PanResponder,
  TouchableOpacity,
} from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Icon, MaterialCommunityIcons } from '@expo/vector-icons';
import { ALL_PETITIONS } from '../components/graphql/queries/all_petitions';
import graphql from '../components/hoc/graphql';
import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';
import LinearGradientProps from '../constants/LinearGradientProps';
import NavigationService from '../navigation/navigationService';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import client from '../Apollo';
import PubSub from 'pubsub-js';
import { PrimaryImage } from '../constants/PrimaryImage';
import { styles, SCREEN_HEIGHT, SCREEN_WIDTH, SAFE_WIDTH } from '../constants/Styles';
import _fetchVideoUrl from '../services/fetchVideoUrl';

//import { petitions } from './dummy/community_data.json';
import { community_data } from './dummy/data';

@graphql(ALL_PETITIONS, {
  name: 'all_petitions',
  fetchPolicy: 'network-only',
})
class CommunityStackScreen extends React.Component {
  state = {
    currentIndex: 0,
    petitions: [],
    currentPetition: null,
    loading: true,
    video_url: null,
  };

  async componentDidMount() {
    const all_petitions = await client.query({ query: ALL_PETITIONS });
    const previousPosition = this.props.navigation.getParam('position');
    let all_available_petitions = all_petitions.data.petitions;
    if (previousPosition) {
      let formerLength = all_available_petitions.length;
      for (var i = 0; i < formerLength - 1; i++) {
        if (all_available_petitions[i].id !== previousPosition) {
          let item = all_available_petitions.shift();
          all_available_petitions[petitions.length] = item;
        }
      }
    }
    if (all_available_petitions[0] !== null && all_available_petitions[0].video_url) {
      await _fetchVideoUrl(all_available_petitions[0].video_url)
      .then(data => {
        console.log(data);
        return this._setInitialState(all_available_petitions, data.video_url)
      })
      .catch(e => console.error(e))
    } else {
      this._setInitialState(all_available_petitions, '')
    }
  }

  constructor(props) {
    super(props);

    this.position = new Animated.ValueXY();

    this.rotateAndTranslate = {
      transform: [...this.position.getTranslateTransform()],
    };

    this.nextCardOpacity = this.position.y.interpolate({
      inputRange: [-SCREEN_HEIGHT, -SCREEN_HEIGHT / 2, 0],
      outputRange: [1, 0.8, 0.6],
      extrapolate: 'clamp',
    });

    this.nextCardScale = this.position.y.interpolate({
      inputRange: [-SCREEN_HEIGHT, -SCREEN_HEIGHT / 2, 0],
      outputRange: [1.09, 0.95, 0.9],
      extrapolate: 'clamp',
    });

    this.nextCardTextScale = this.position.y.interpolate({
      inputRange: [-SCREEN_HEIGHT, -SCREEN_HEIGHT / 2, 0],
      outputRange: [0.95, 0.9, 0.85],
      extrapolate: 'clamp',
    });

    this.nextCardOffset = this.position.y.interpolate({
      inputRange: [-SCREEN_HEIGHT, -SCREEN_HEIGHT / 2, 0],
      outputRange: [40, 80, 100],
      extrapolate: 'clamp',
    });
  }

  componentWillMount() {
    this.imagePanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: (evt, gs) => {
        if (gs.dx > 150) {
          this.props.navigation.navigate('MyActions');
        }
        if (gs.dx < -150) {
          this.props.navigation.navigate('Energy');
        }
        this.position.setValue({ x: 0, y: gs.dy });
      },

      onPanResponderRelease: (evt, gs) => {
        if (-200 > gs.dy) {
          let { petitions } = this.state;

          Animated.spring(this.position, {
            toValue: { x: 0, y: SCREEN_HEIGHT - 2000 },
            tension: 0,
          }).start();

          let item = petitions.shift();
          petitions[petitions.length] = item;

          this.position.setValue({ x: 0, y: 0 });
          this.setState({ petitions: petitions });
          _fetchVideoUrl(petitions[0].video_url)
          .then(data => this.setState({ video_url: data.video_url }));
        } else if (200 < gs.dy) {
          let { petitions } = this.state;

          Animated.spring(this.position, {
            toValue: { x: 0, y: SCREEN_HEIGHT + 2000 },
            tension: 0,
          }).start();

          let item = petitions.pop();
          petitions.unshift(item);

          this.position.setValue({ x: 0, y: 0 });
          this.setState({ petitions: petitions });
          _fetchVideoUrl(petitions[0].video_url)
          .then(data => this.setState({ video_url: data.video_url }));
        } else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            speed: 2,
            bounciness:2
          }).start();
        }
      },
    });
  }


  _setInitialState = (petitions, video_url) => {
    this.setState(
      {
        video_url: video_url,
        petitions: petitions,
        currentPetition: petitions[0],
        loading: false,
      }
    );
  }

  _handleLoading = () => {
    this.setState({ loading: false });
  };
  _renderOtherCard = (petition, index) => {
    // make sure the size is defined first, ensures the petitions are loaded
    if (
      this.state.size != undefined &&
      this.state.currentIndex === this.state.size
    ) {
      return (
        <View style={styles.videoPlayIcon}>
          <TouchableOpacity style={ { width: '100%' } } onPress={() => this.setState({ currentIndex: 0 })}>
            <FontAwesome name="undo" size={52} color="red" />
          </TouchableOpacity>
        </View>
      );
    }

    const preview = {
      uri: PrimaryImage,
    };

    if (!petition) {
      return <View />;
    }
    // Under Card
    return (
      <Animated.View
        key={petition.id}
        style={[styles.petitionCard, {
          top: 20 + 20 / index,
          zIndex: index * 10,
        }]}
      >
        <View style={[styles.petitionDetails ]}>
          <Text style={styles.title}>
            {petition.title}
          </Text>
          <Text style={[styles.petitionText]}>
            {petition.short_description}
          </Text>
        </View>
        <Image
          style={[styles.petitionCardImage]}
          {...{ preview, uri: petition.primary_image }}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.85)']}
          locations={[0.5, 1]}
          style={[styles.gradientContainer, {
            height: SCREEN_HEIGHT - 180,
            width: SCREEN_WIDTH - 40,
          }]}
        />

        <View style={styles.videoPlayIcon}>
          <TouchableOpacity
            onPress={() => {
              NavigationService.navigate('Petition', {
                screen: 'Community',
                image: petition,
              });
            }}
          >
            <FontAwesome name="play" size={52} color="white" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  _openRedirectWithUrl = url => {
    PubSub.publish('openRedirectModal', url)
  };

  _renderCard = petition => {
    // make sure the size is defined first, ensures the petitions are loaded
    if (
      this.state.size != undefined &&
      this.state.currentIndex === this.state.size
    ) {
      return (
        <View style={[styles.videoPlayIcon]}>
          <TouchableOpacity style={[styles.container]} onPress={() => this.setState({ currentIndex: 0 })}>
            <FontAwesome name="undo" size={52} color="white" />
          </TouchableOpacity>
        </View>
      );
    }
    const preview = {
      uri: PrimaryImage,
    };

    if (!petition) {
      return null;
    }

    return (
      <Animated.View {...this.imagePanResponder.panHandlers}
        key={petition.id}
        style={[
          this.rotateAndTranslate,
          styles.petitionCard,
          styles.petitionCardUnder,
        ]}>
        <Image
          style={[styles.petitionCardImage]}
          {...{ preview, uri: petition.primary_image }}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.85)']}
          locations={[0.5, 1]}
          style={[styles.gradientContainer, styles.petitionDimensions ]}
        />
        <Animated.View style={{opacity: 1 }}>
          <View style={[styles.petitionDetails ]}>
            <Text style={styles.title}>
              {petition.title}
            </Text>
            <Text style={[styles.petitionText]}>
              {petition.short_description}
            </Text>
          </View>
        </Animated.View>

        <View style={styles.videoPlayIcon}>
        <View style={[styles.container, styles.centeredRow, { position: 'absolute', top: 20, flexDirection: 'column' }]}>
          <MaterialCommunityIcons
            name={'gesture-swipe-vertical'}
            style={[styles.centerText, styles.textWhite, { fontSize: 30 }]}
          />
          <Text style={[styles.textWhite]}>(Swipe up or down for more)</Text>
        </View>
          <TouchableOpacity
            onPress={() => {
              NavigationService.navigate('Video', {
                screen: 'Petition',
                video: this.state.video_url,
                petition: petition,
              });
            }}
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
            style={[styles.centerAll]}
          >
            <FontAwesome name="play" size={52} color="white" />
            <Text style={[styles.smallWhiteText, {paddingTop: 10}]}>Learn More</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );

  };

  _setPetitionsInitial(petitions) {
    this.setState({ petitions: petitions, loading: false });
  }

  render() {
    const {
      petitions,
      loading,
    } = this.state;

    if (!petitions) {
      return (
        <View>
          <Text>There are currently no community items!</Text>
        </View>
      );
    }

    if (loading) {
      return (
        <LinearGradient {...LinearGradientProps.community} style={{ flex: 1 }}>
          <SafeAreaView style={[styles.container, styles.centerAll]}>
            <ActivityIndicator size="large" />
          </SafeAreaView>
        </LinearGradient>
      );
    }
    return (
      <LinearGradient {...LinearGradientProps.community} style={[styles.container]}>
        <View style={[styles.container]}>
          <View styles={[styles.container, styles.centerAll]}>
            {this._renderCard(petitions[0])}
            {this._renderOtherCard(petitions[1], 2)}
            {this._renderOtherCard(petitions[2], 1)}
          </View>
        </View>
      </LinearGradient>
    );
  }
}

CommunityStackScreen.navigationOptions = {
  headerTitle: HeaderNavBar,
  headerStyle: {
    backgroundColor: LinearGradientProps.community.colors[0],
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
};

export default CommunityStackScreen;
