import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import RatingStackScreen from '../screens/RatingStackScreen';

import NotificationStackScreen from '../screens/NotificationStackScreen';

import SocialStackScreen from '../screens/SocialStackScreen';

const Stats = ({ focused }) => {
  return (
    <Ionicons name="ios-stats" size={25} color={focused ? '#fff' : '#3C3B3D'} />
  );
};
const Rating = ({ focused }) => {
  return (
    <Ionicons name="ios-ribbon" size={25} color={focused ? '#fff' : '#3C3B3D'} />
  );
};
const Notification = ({ focused }) => {
  return (
    <Ionicons
      name="ios-notifications"
      size={25}
      color={focused ? '#fff' : '#3C3B3D'}
    />
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

const RatingStack = createStackNavigator({
  Rating: RatingStackScreen,
});

RatingStack.navigationOptions = {
  tabBarIcon: Rating,
};

const SocialStack = createStackNavigator({
  Social: SocialStackScreen,
});

SocialStack.navigationOptions = {
  tabBarIcon: Share,
};

const routeConfig = {
  RatingStack,
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
  initialRouteName: 'RatingStack',
});
