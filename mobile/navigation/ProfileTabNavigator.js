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

const Stats = ({ focused, tintColor }) => {
  return (
    <Ionicons
      name="ios-stats"
      size={25}
      color={focused ? tintColor : '#3C3B3D'}
      style={styles.icon}
    />
  );
};
const Notification = ({ focused, tintColor }) => {
  return (
    <Ionicons
      name="ios-notifications"
      size={25}
      color={focused ? tintColor : '#3C3B3D'}
      style={styles.icon}
    />
  );
};

const Share = ({ focused, tintColor }) => {
  return (
    <Entypo
      name="share-alternative"
      size={25}
      color={focused ? tintColor : '#3C3B3D'}
      style={styles.icon}
    />
  );
};

const ImpactStack = createStackNavigator({
  Profile: ImpactStackScreen,
});

ImpactStack.navigationOptions = {
  tabBarIcon: Stats,
};

const NotificationStack = createStackNavigator({
  Profile: NotificationStackScreen,
});

NotificationStack.navigationOptions = {
  tabBarIcon: Notification,
};

const SocialStack = createStackNavigator({
  Profile: SocialStackScreen,
});

SocialStack.navigationOptions = {
  tabBarIcon: Share,
};

const routeConfig = {
  ImpactStack,
  NotificationStack,
  SocialStack,
};

const styles = {
  activeLabel: {
    fontFamily: 'Proxima Nova Bold',
    fontSize: 15,
    color: '#ffffff',
    textAlignVertical: 'center',
    paddingBottom: 0,
  },
  label: {
    textAlignVertical: 'bottom',
    fontFamily: 'Proxima Nova Bold',
    fontSize: 13,
    color: '#ffffff',
    paddingBottom: 0,
  },
  icon: {
    lineHeight: 15,
  },
};

export default createBottomTabNavigator(routeConfig, {
  swipeEnabled: true,
  showIcon: true,
  showLabel: false,
  animationEnabled: true,
  tabBarOptions: {
    labelStyle: {
      fontFamily: 'Proxima Nova Bold',
      fontSize: 13,
    },
    style: {
      justifyContent: 'space-between',
      alignContent: 'center',
      backgroundColor: '#000',
      height: 37,
    },
    scrollEnabled: true,
    tabStyle: {
      // maxWidth: tabWidth,
    },
    indicatorStyle: {
      width: 0,
    },
  },
  lazy: true,
  //initialRouteName: 'ImpackStack',
});
