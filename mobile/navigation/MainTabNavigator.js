import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/shared/icons/TabBarIcon';
import HomeStackScreen from '../screens/HomeStackScreen';
import MyActionsStackScreen from '../screens/MyActionsStackScreen';
import CommunityStackScreen from '../screens/CommunityStackScreen';
import EssentialsStackScreen from '../screens/EssentialsStackScreen';

HomeStack = createStackNavigator({
  Home: HomeStackScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `md-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const MyActionsStack = createStackNavigator({
  MyActions: MyActionsStackScreen,
});

MyActionsStack.navigationOptions = {
  tabBarLabel: 'MyActions',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-checkmark-circle${focused ? '' : '-outline'}`
          : 'md-checkmark-circle'
      }
    />
  ),
};

const CommunityStack = createStackNavigator({
  CommunityStack: CommunityStackScreen,
});

CommunityStack.navigationOptions = {
  tabBarLabel: 'CommunityStack',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const EssentialsStack = createStackNavigator({
  EssentialsStack: EssentialsStackScreen,
});
const OneStack = createStackNavigator({
  One: EssentialsStackScreen,
});
const TwoStack = createStackNavigator({
  Two: EssentialsStackScreen,
});
const ThreeStack = createStackNavigator({
  Three: EssentialsStackScreen,
});

EssentialsStack.navigationOptions = {
  tabBarLabel: 'EssentialsStack',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};


export default createMaterialTopTabNavigator({
  HomeStack,
  MyActionsStack,
  CommunityStack,
  EssentialsStack,
  OneStack,
  TwoStack,
  ThreeStack
}, {
  swipeEnabled : true,
  tabBarPosition:'bottom',
  animationEnabled: true,
  tabBarOptions:{
    scrollEnabled:true,
    tabStyle: {
      width: 100
    },
    indicatorStyle: {
      width: 0
    }
  },
  lazy:true,
  initialRouteName:'HomeStack'
});
