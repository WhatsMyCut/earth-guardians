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
import { Analytics, PageHit } from 'expo-analytics';
import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
import graphql from '../components/hoc/graphql';
import NavigationService from '../navigation/navigationService';
import WorldRankComponent from '../components/shared/profile/WorldRankComponent';
import { ALL_MY_METRICS } from '../components/graphql/queries/all_my_metrics_query';
import client from '../Apollo';
import { StoreData } from '../store/AsyncStore';
import { styles } from '../constants/Styles'

@graphql(ALL_MY_METRICS, {
  name: 'all_metrics',
})
class WorldRankStackScreen extends React.Component {
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
  }

  componentDidMount() {
    () => {
      try {
        const analytics = new Analytics('UA-131896215-1');
        analytics
          .hit(new PageHit('WorldRankScreen'))
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
      this._aggregateWorldRank(
        this.props.all_metrics.me.recent_actions,
        this.props.all_metrics.me.community_events
      );
    }
  }

  async _aggregateWorldRank(recent_actions, community_events) {
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
    if (this.props.all_metrics.loading) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={ styles.containerGrey }>
            <ActivityIndicator size={'large'} />
          </View>
        </SafeAreaView>
      );
    } else {
      if (this.props.all_metrics.me.recent_actions.length !== 0) {
        this._aggregateWorldRank(
          this.props.all_metrics.me.recent_actions,
          this.props.all_metrics.me.community_events
        );
      }
    }

    return (
      <SafeAreaView style={ styles.greyCard }>
        <ScrollView contentContainerStyle={{}}>
          <View style={ styles.containerGrey }>
            <Text style={ styles.containerTitle }>Worldwide Rank</Text>
            <WorldRankComponent
              carbon_dioxide={this.state.carbon_dioxide}
              water={this.state.water}
              waste={this.state.waste}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
WorldRankStackScreen.navigationOptions = {
  headerLeft: (
    <TouchableOpacity onPress={() => NavigationService.navigate('MyActions')}>
      <Ionicons
        name="ios-arrow-round-back"
        size={42}
        color="white"
        style={{ paddingLeft: 15, opacity: 0.7 }}
      />
    </TouchableOpacity>
  ),
  headerTitle: (
    <View style={ styles.headerContainer}>
      <Text style={ styles.headerText }>
        MY RANK
      </Text>
    </View>
  ),
  headerRight: (''),
  headerStyle: styles.greyCardHeader,
};

export default WorldRankStackScreen;
