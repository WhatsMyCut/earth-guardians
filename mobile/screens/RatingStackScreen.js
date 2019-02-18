import React from 'react';
//import { LinearGradient, AppLoading } from 'expo';

import {
  Animated,
  PanResponder,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo';
import { Analytics, PageHit } from 'expo-analytics';
import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
import graphql from '../components/hoc/graphql';
import NavigationService from '../navigation/navigationService';
import GraphComponent from '../components/shared/profile/GraphComponent';
import RatingComponent from '../components/shared/profile/RatingComponent';
import ReachComponent from '../components/shared/profile/ReachComponent';
import PointsComponent from '../components/shared/profile/PointsComponent';
import ProfileComponent from '../components/shared/profile/ProfileComponent';
import CommunityEventModal from '../components/shared/modals/CommunityEventModal';
import { ALL_MY_METRICS } from '../components/graphql/queries/all_my_metrics_query';
import UpdateUserModal from '../components/shared/modals/updateUserModal';
import client from '../Apollo';
import { StoreData } from '../store/AsyncStore';
import navigationService from '../navigation/navigationService';
import { styles } from '../constants/Styles'

@graphql(ALL_MY_METRICS, {
  name: 'all_metrics',
})
class RatingStackScreen extends React.Component {
  state = {
    openModal: false,
    points: 0,
    waste: 0,
    water: 0,
    carbon_dioxide: 0,
    loading: true,
    openUserModal: false,
    communityEvents: 0,
  };

  //interval;
  static navigationOptions = {
    header: null,
  };

  toggleModal = () => {
    this.setState({
      openModal: !this.state.openModal,
    });
  };

  componentWillMount() {
    // this.viewResponder = PanResponder.create({
    //   onStartShouldSetPanResponder: () => true,
    //   onPanResponderMove: (evt, gs) => {
    //     if (200 < gs.dy) {
    //       NavigationService.navigate('CommunityStack');
    //     }
    //   },
    // });
  }

  componentDidMount() {
    () => {
      try {
        const analytics = new Analytics('UA-131896215-1');
        analytics
          .hit(new PageHit('RatingScreen'))
          .then(() => console.log('success '))
          .catch(e => console.log(e.message));
      } catch (e) {
        console.log(e);
      }
    };

    // this.interval = setInterval(()=>{
    //   this.props.all_metrics.refetch();
    // }, 2000)

  }

  componentWillUnmount = ()=>{
    // clearInterval(this.interval);
  }

  componentWillReceiveProps= () => {
    if(!this.props.all_metrics.loading){
      this._aggregateRating(
        this.props.all_metrics.me.recent_actions,
        this.props.all_metrics.me.community_events
      );
    }
  }

  async _aggregateRating(recent_actions, community_events) {
    const { points, water, waste, carbon_dioxide, loading } = this.state;
    if (!loading) {
      return;
    }
    let newPoints = 0;
    let newWater = 0;
    let newWaste = 0;
    let newCarbonDioxide = 0;
    let aggregateObj = {};

    await Promise.all([
      recent_actions.map(item => {
        newPoints += item.action.points;
        newWater += item.action.water;
        newWaste += item.action.waste;
        newCarbonDioxide += item.action.carbon_dioxide;
          if(aggregateObj.hasOwnProperty(`${item.action.category.name}`)){
            aggregateObj[`${item.action.category.name}`] += item.action.points;
          } else{
            aggregateObj[`${item.action.category.name}`] = item.action.points;
          }
      }),

    ]);




    let additionalPoints = community_events.length * 100;
    this.setState({
      points: points != newPoints ? newPoints + additionalPoints : points,
      water: water != newWater ? newWater : water,
      waste: waste != newWaste ? newWaste : waste,
      carbon_dioxide:
        carbon_dioxide != newCarbonDioxide ? newCarbonDioxide : carbon_dioxide,
      communityEvents: community_events,
      loading: false,
      aggregateObj: aggregateObj
    });
  }

  render() {
    // const { all_categories } = this.props;
    // if (all_categories.loading) {
    //   return (
    //     <LinearGradient {...LinearGradientProps.food} style={{ flex: 1 }}>
    //       <AppLoading />
    //     </LinearGradient>
    //   );
    // }

    // const actions = all_categories.actionCategories;
    // if (!this.state.primary_video && !this.state.primary_image) {
    //   return null;
    // }
    if (this.props.all_metrics.loading) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#333',
            }}
          >
            <ActivityIndicator size={'large'} />
          </View>
        </SafeAreaView>
      );
    } else {
      if (this.props.all_metrics.me.recent_actions.length !== 0) {
        this._aggregateRating(
          this.props.all_metrics.me.recent_actions,
          this.props.all_metrics.me.community_events
        );
      }
    }

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#333' }}>
        <ScrollView contentContainerStyle={{}}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#333',
            }}
          >
            <Text style={ styles.containerTitle }>National Rating</Text>

            <RatingComponent
              carbon_dioxide={this.state.carbon_dioxide}
              water={this.state.water}
              waste={this.state.waste}
            />
            <PointsComponent points={this.state.points} aggregate={this.state.aggregateObj}/>
          </View>

          {this.state.openModal ? (
            <BlurView
              tint="dark"
              intensity={80}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,.1)',
                position: 'absolute',
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <CommunityEventModal
                onClose={() => {
                  this.setState({ openModal: false, loading: true });
                }}
              />
            </BlurView>
          ) : null}
          {this.state.openUserModal ? (
            <BlurView
              tint="dark"
              intensity={80}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,.1)',
                position: 'absolute',
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <UpdateUserModal
                onClose={() =>
                  this.setState({
                    openUserModal: false,
                  })
                }
              />
            </BlurView>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
RatingStackScreen.navigationOptions = {
  headerLeft: (
    <TouchableOpacity onPress={() => navigationService.navigate('MyActions')}>
      <Ionicons
        name="ios-arrow-round-back"
        size={42}
        color="white"
        style={{ paddingLeft: 15, opacity: 0.7 }}
      />
    </TouchableOpacity>
  ),
  headerTitle: (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text
        style={{
          color: '#ffffff',
          fontSize: 24,
          fontFamily: 'Proxima Nova Bold',
          textAlign: 'center',
        }}
      >
        MY RATING
      </Text>
    </View>
  ),
  headerRight: (
    <TouchableOpacity
      onPress={async () => {
        await StoreData('phone', null);
        await StoreData('country_dial_code', null);
        await StoreData('EARTH_GUARDIANS_TOKEN', null);
        client.resetStore();
        navigationService.navigate('AuthLoading');
      }}
    >
      <MaterialCommunityIcons
        name="logout"
        size={22}
        color="white"
        style={{ paddingRight: 10, opacity: 0.7 }}
      />
    </TouchableOpacity>
  ),
  headerStyle: {
    backgroundColor: '#333',
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
};

export default RatingStackScreen;
