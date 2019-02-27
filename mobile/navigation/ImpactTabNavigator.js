import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import ImpactStackScreen from '../screens/ImpactStackScreen';

import NotificationStackScreen from '../screens/NotificationStackScreen';

import SocialStackScreen from '../screens/SocialStackScreen';

const Stats = ({ focused }) => {
  return (
    <Ionicons name="ios-stats" size={25} color={focused ? '#fff' : '#3C3B3D'} />
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

const ImpactStack = createStackNavigator({
  Impact: ImpactStackScreen,
});

ImpactStack.navigationOptions = {
  tabBarIcon: Stats,
};

const NotificationStack = createStackNavigator({
  Notification: NotificationStackScreen,
});

NotificationStack.navigationOptions = {
  tabBarIcon: Notification,
};

const SocialStack = createStackNavigator({
  Social: SocialStackScreen,
});

SocialStack.navigationOptions = {
  tabBarIcon: Share,
};

const routeConfig = {
  ImpactStack,
  //NotificationStack,
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
  initialRouteName: 'ImpactStack',
});
