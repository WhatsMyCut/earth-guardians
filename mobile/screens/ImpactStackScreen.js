import React from 'react';
//import { LinearGradient, AppLoading } from 'expo';

import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { BlurView } from 'expo';
import { Analytics, PageHit } from 'expo-analytics';
import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
import graphql from '../components/hoc/graphql';
import NavigationService from '../navigation/navigationService';
import GraphComponent from '../components/shared/profile/GraphComponent';
import ImpactComponent from '../components/shared/profile/ImpactComponent';
import ReachComponent from '../components/shared/profile/ReachComponent';
import PointsComponent from '../components/shared/profile/PointsComponent';
import CommunityEventModal from '../components/shared/modals/CommunityEventModal';
import { ALL_MY_METRICS } from '../components/graphql/queries/all_my_metrics_query';
import { styles, defaults } from '../constants/Styles'
import BadgeComponent from '../components/shared/profile/BadgeComponent';

@graphql(ALL_MY_METRICS, {
  name: 'all_metrics',
})
class ImpactStackScreen extends React.Component {
  state = {
    openModal: false,
    points: 0,
    waste: 0,
    water: 0,
    carbon_dioxide: 0,
    loading: true,
    communityEvents: 0,
  };

  interval;
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
          .hit(new PageHit('ImpactScreen'))
          .then(() => console.log('success '))
          .catch(e => console.log(e.message));
      } catch (e) {
        console.log(e);
      }
    };

    this.interval = setInterval(()=>{
      this.props.all_metrics.refetch();
    }, 2000)

  }

  componentWillUnmount = ()=>{
    clearInterval(this.interval);
  }

  componentWillReceiveProps= () => {
    if(!this.props.all_metrics.loading){
      console.log('this.props.all_metrics.loading', this.props.all_metrics.me)
      this._aggregateImpact(
        this.props.all_metrics.me ? this.props.all_metrics.me.recent_actions : 0,
        this.props.all_metrics.me? this.props.all_metrics.me.community_events : 0
      );
    }
  }

  async _aggregateImpact(recent_actions, community_events) {
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
        newPoints += parseFloat(item.action.points).toFixed(2);
        newWater += parseFloat(item.action.water).toFixed(2);
        newWaste += parseFloat(item.action.waste).toFixed(2);
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
      points: points != newPoints ? parseFloat(newPoints + additionalPoints).toFixed(2) : parseFloat(points).toFixed(2),
      water: water != newWater ? parseFloat(newWater).toFixed(2) : parseFloat(water).toFixed(2),
      waste: waste != newWaste ? parseFloat(newWaste).toFixed(2) : parseFloat(waste).toFixed(2),
      carbon_dioxide:
        carbon_dioxide != newCarbonDioxide ? parseFloat(newCarbonDioxide).toFixed(2) : parseFloat(carbon_dioxide).toFixed(2),
      communityEvents: community_events,
      loading: false,
      aggregateObj: aggregateObj
    });
  }

  render() {
    //console.log('this.props', this.props);
    if (this.props.all_metrics.loading) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={ styles.containerGrey }>
            <ActivityIndicator size={'large'} />
          </View>
        </SafeAreaView>
      );
    } else if(this.props.all_metrics.me.recent_actions){
      //console.log('this.props.all_metrics.loading', this.props.all_metrics.me)

      if (this.props.all_metrics.me.recent_actions.length !== 0) {
        this._aggregateImpact(
          this.props.all_metrics.me.recent_actions,
          this.props.all_metrics.me.community_events
        );
      }
    }

    return (
      <SafeAreaView style={[styles.greyCard]}>
        <ScrollView contentContainerStyle={[{}]}>
          <View style={[styles.containerGrey, defaults.SCREEN_HEIGHT]}>
            <GraphComponent
              carbon_dioxide={this.state.carbon_dioxide}
              water={this.state.water}
              waste={this.state.waste}
            />
            <ImpactComponent
              carbon_dioxide={this.state.carbon_dioxide}
              water={this.state.water}
              waste={this.state.waste}
            />
            <ReachComponent
              toggleModal={this.toggleModal}
              communityEvents={this.state.communityEvents}
            />
            <PointsComponent points={this.state.points} aggregate={this.state.aggregateObj}/>
            <BadgeComponent points={this.state.points}/>
          </View>

          {this.state.openModal ? (
            <BlurView
              tint="dark"
              intensity={80}
              style={[styles.container, styles.coverScreen, {
                height: defaults.primaryHeight - 150,

              }]}
            >
              <CommunityEventModal
                onClose={() => {
                  this.setState({ openModal: false, loading: true });
                }}
              />
            </BlurView>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
ImpactStackScreen.navigationOptions = {
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
    <View style={ styles.headerContainer }>
      <Text style={ styles.headerText }>
        MY IMPACT
      </Text>
    </View>
  ),
  headerRight: (
    <TouchableOpacity
      onPress={() => NavigationService.navigate('Profile')}
      hitSlop={{top: 15, left: 15, right:15, bottom:15}}
      style={[styles.container, {paddingRight: defaults.padding}]}
    >
      <FontAwesome
        name="gear"
        size={25}
        color={'white'}
      />
    </TouchableOpacity>

  ),
  headerStyle: styles.greyCardHeader,
};

export default ImpactStackScreen;
