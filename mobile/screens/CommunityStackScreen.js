import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Animated,
  ActivityIndicator,
  PanResponder,
  TouchableOpacity,
} from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { all } from 'rsvp';
import { LinearGradient } from 'expo';

// import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
// import graphql from '../components/hoc/graphql';
import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';
import LinearGradientProps from '../constants/LinearGradientProps';
import navigationService from '../navigation/navigationService';
import FontAwesome from '@expo/vector-icons/FontAwesome';
//import { petitions } from './dummy/community_data.json';
import { community_data } from './dummy/data';
// get the device dimensions
SCREEN_HEIGHT = Dimensions.get('window').height;
SCREEN_WIDTH = Dimensions.get('window').width;

// @graphql(ALL_ACTION_CATEGORIES, {
//   name: 'all_categories',
//   fetchPolicy: 'network-only',
// })
class CommunityStackScreen extends React.Component {
  state = {
    currentIndex: 0,
    petitions: [],
    loading: true,
  };

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

  componentWillMount(){
    
    this.imagePanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: (evt, gs) => {
        if(gs.dx > 150){
          this.props.navigation.navigate('MyActions');
        }
        if(gs.dx < -150){
          this.props.navigation.navigate('Energy');
        }
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
  }

  _handleLoading = () => {
    console.log('handle loading is being called');
    this.setState({ loading: false });
  };
  _renderCards = () => {
    // make sure the size is defined first, ensures the petitions are loaded
    if (
      this.state.size != undefined &&
      this.state.currentIndex === this.state.size
    ) {
      return (
        <View style={styles.headlineViewPlayIcon}>
          <TouchableOpacity onPress={() => this.setState({ currentIndex: 0 })}>
            <FontAwesome name="undo" size={52} color="white" />
          </TouchableOpacity>
        </View>
      );
    }
    const { loading } = this.state;
    const preview = { uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" };
    const petition = this.state.petitions[this.state.currentIndex];
    
    if(!petition){
      return null;
    }
    return <Animated.View
              {...this.imagePanResponder.panHandlers}
              key={petition.id}
              style={[
                this.rotateAndTranslate,
                {
                  height: SCREEN_HEIGHT - 180,
                  width: SCREEN_WIDTH - 60,
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
                  {petition.title}
                </Text>

                <Text style={{ color: 'white' }}>{petition.description}</Text>
              </Animated.View>

              <Image
                style={{
                  flex: 1,
                  height: null,
                  width: null,
                  resizeMode: 'cover',
                  borderRadius: 20,
                }}
                {...{ preview, uri: petition.image }}
              />
              <LinearGradient
            colors={['rgba(255,255,255,0)', '#000000']}
            locations={[0.3, 1]}
            style={{ 
              height: SCREEN_HEIGHT - 180,
              width: SCREEN_WIDTH - 100, 
              ...styles.gradient}}
          />


              <View style={styles.headlineViewPlayIcon}>
                <TouchableOpacity
                  onPress={() =>
                    navigationService.navigate('Petition', {
                      screen: 'Community',
                      image: petition,
                      position: this.state.currentIndex
                    })
                  }
                >
                  <FontAwesome name="play" size={52} color="white" />
                </TouchableOpacity>
              </View>
            </Animated.View>
         
        //   let offset = this.currentIndex * 1 * 15;
        //   return (
        //     <Animated.View
        //       key={petition.id}
        //       style={[
        //         {   
        //           opacity: this.nextCardOpacity,
        //           transform:[{scale:this.nextCardScale}],
        //           height: SCREEN_HEIGHT - 180,
        //           width: SCREEN_WIDTH - 80,
        //           padding: 20,
        //           position: 'absolute',
        //           top: this.nextCardOffset,
        //         },
        //       ]}
        //     >
        //     <Animated.View
        //         style={[
        //           { opacity: this.nextCardOpacity / 1 },
        //           { transform:[{scale:this.nextCardTextScale}]},
        //           {
        //             position: 'absolute',
        //             bottom: 45,
        //             left: 5,
        //             zIndex: 5,
        //             paddingHorizontal: 20,
        //           },
        //         ]}
        //       >
        //         <Text style={{ color: 'white', fontSize: 24 }}>
        //           {petition.title}
        //         </Text>

        //         <Text style={{ color: 'white' }}>{petition.description}</Text>
        //       </Animated.View>
        //       <Image
        //         style={{
        //           flex: 1,
        //           height: null,
        //           width: null,
        //           resizeMode: 'cover',
        //           borderRadius: 20,
        //         }}
        //         {...{preview, uri: petition.image }}
        //       />
        //     </Animated.View>
        //   );
        // }
  };

  async componentDidMount() {
    const petitions = await community_data();
    let revpetitions = petitions.reverse();
    let position = this.props.navigation.getParam('position', 0);
  
    this.setState({
      petitions:revpetitions,
      currentIndex : position
    });
  }
  render() {
    return (
      <LinearGradient {...LinearGradientProps.community} style={{ flex: 1 }}>
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
  gradient: {
    position: 'absolute',
    paddingHorizontal: 10,
    borderRadius: 20,
    left: 20,
    paddingHorizontal: 20,
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
});

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
