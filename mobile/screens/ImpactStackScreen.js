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
import graphql from '../components/hoc/graphql';
import NavigationService from '../navigation/navigationService';
import GraphComponent from '../components/shared/profile/GraphComponent';
import ImpactComponent from '../components/shared/profile/ImpactComponent';
import ReachComponent from '../components/shared/profile/ReachComponent';
import PointsComponent from '../components/shared/profile/PointsComponent';
import ModalComponent from '../components/shared/modals/ModalComponent';
import { ALL_MY_METRICS } from '../components/graphql/queries/all_my_metrics_query';
import { GET_USER } from '../components/graphql/queries/get_user';
import { CREATE_COMMUNITY_EVENT } from '../components/graphql/mutations/create_community_mutation';
import { styles, defaults } from '../constants/Styles'
import BadgeComponent from '../components/shared/profile/BadgeComponent';
import { _eventHit } from '../services/googleAnalytics';

@graphql(ALL_MY_METRICS, {
  name: 'all_metrics',
  fetchPolicy: 'network_only',
  options: {
    pollingInterval: 2000,
  }
})
@graphql(CREATE_COMMUNITY_EVENT, {
  name: 'community_mutation',
})

@graphql(GET_USER, {
  name: 'my_user',
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

  _submitCommunityEvent(data) {
    const { community_mutation } = this.props;
    const { me } = this.props.my_user;
    if (me.id) {
      let variables = {
        id: me.id,
        type: data.typeOfEvent,
        number_of_people: parseInt(data.numberOfPeople),
      };

      community_mutation({ variables }).then(response => {
        this.closeModal(response);
      });
    }
  }
  openModal() {
    PubSub.publish('openBlur', this.setState({ openModal: true }));
  }

  closeModal = () => {
    PubSub.publish('closeBlur', this.setState({ openModal: false }))
  };

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount = () => {
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
    let total_points = points != newPoints ? newPoints + additionalPoints : points
    let swater = water != newWater ?newWater : water;
    let swaste = waste != newWaste ? newWaste : waste
    let sco2 = carbon_dioxide != newCarbonDioxide ? newCarbonDioxide: carbon_dioxide;
    this.setState({
      points: Math.round(parseFloat(total_points)).toFixed(0),
      water:  Math.round(parseFloat(swater)).toFixed(2),
      waste: Math.round(parseFloat(swaste)).toFixed(2),
      carbon_dioxide: Math.round(parseFloat(sco2)).toFixed(2),
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
    // Petition ID for EG Badge : cjr111ekt1qk0088479se0aue
    const showEGBadge = this.props.all_metrics.me.recent_actions.filter(id => id === 'cjr111ekt1qk0088479se0aue')
    return (
      <SafeAreaView style={[styles.greyCard]}>
        <ScrollView contentContainerStyle={[]}>
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
            <PointsComponent points={this.state.points} aggregate={this.state.aggregateObj}/>
            <ReachComponent
              communityEvents={this.state.communityEvents}
              openModal={() => this.openModal()}
              closeModal={() => this.closeModal()}
            />
            <BadgeComponent points={this.state.points} showEGBadge={showEGBadge}/>
          </View>
          {this.state.openModal &&
            <ModalComponent
              display={'CommunityEventModal'}
              showModal={this.state.openModal}
              onClose={() => this.closeModal()}
              submitEvent={this._submitCommunityEvent}
            />
          }
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
      onPress={() => {
        _eventHit('ImpactStackScreen', { action: 'Profile', event: 'click'}, res => console.log(res.event, res.params.action))
        NavigationService.navigate('Profile')
      }}
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
