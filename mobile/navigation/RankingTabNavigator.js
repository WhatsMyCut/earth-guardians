import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import RankingStackScreen from '../screens/RankingStackScreen';
import WorldRankStackScreen from '../screens/WorldRankStackScreen';

import SocialStackScreen from '../screens/SocialStackScreen';

const Ranking = ({ focused }) => {
  return (
    <Ionicons name="ios-ribbon" size={25} color={focused ? '#fff' : '#3C3B3D'} />
  );
};

const WorldRank = ({ focused }) => {
  return (
    <Ionicons name="ios-globe" size={25} color={focused ? '#fff' : '#3C3B3D'} />
  );
};

const Share = ({ focused }) => {
  return (
    <Entypo
      name="share-alternative"
      size={25}
      color={focused ? '#fff' : '#3C3B3D'}
    />
  );
};

const RankingStack = createStackNavigator({
  Ranking: RankingStackScreen,
});

RankingStack.navigationOptions = {
  tabBarIcon: Ranking,
};

const WorldRankStack = createStackNavigator({
  WorldRank: WorldRankStackScreen,
});

WorldRankStack.navigationOptions = {
  tabBarIcon: WorldRank,
};

const SocialStack = createStackNavigator({
  Social: SocialStackScreen,
});

SocialStack.navigationOptions = {
  tabBarIcon: Share,
};

const routeConfig = {
  RankingStack,
  WorldRankStack,
  SocialStack
};

export default createBottomTabNavigator(routeConfig, {
  animationEnabled: true,
  tabBarOptions: {
    showLabel: false,
    style: {
      justifyContent: 'space-between',
      alignContent: 'center',
      backgroundColor: '#000',
      height: 37,
    },
  },
  lazy: true,
  initialRouteName: 'RankingStack',
});
