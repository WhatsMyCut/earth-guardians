import {
  createStackNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import React from 'react';
import MyActionsStackScreen from '../screens/MyActionsStackScreen';
import CommunityStackScreen from '../screens/CommunityStackScreen';
import BasicsStackScreen from '../screens/BasicsStackScreen';
import TransportationStackScreen from '../screens/TransportationStackScreen';
import FashionStackScreen from '../screens/FashionStackScreen';
import SportsStackScreen from '../screens/SportsStackScreen';
import ArtsStackScreen from '../screens/ArtsStackScreen';
import ShoppingStackScreen from '../screens/ShoppingStackScreen';
import OceansStackScreen from '../screens/OceansStackScreen';
import LandStackScreen from '../screens/LandStackScreen';
import PoliticsStackScreen from '../screens/ShoppingStackScreen';
import FinanceStackScreen from '../screens/FinanceStackScreen';
import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';
import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
import { all } from 'rsvp';



const MyActionsStack = createStackNavigator({
  MyActions: MyActionsStackScreen,
  
});

MyActionsStack.navigationOptions = (props) =>{
  console.log('props', props)
  return {
    tabBarLabel: 'My Actions'
  }
};

const CommunityStack = createStackNavigator({
  Community: CommunityStackScreen,
});

CommunityStack.navigationOptions = {
  tabBarLabel: 'Community',
};

const BasicsStack = createStackNavigator({
  Basics: BasicsStackScreen,
});

BasicsStack.navigationOptions = {
  tabBarLabel: 'Energy',
};

const TransportationStack = createStackNavigator({
  Transportation: TransportationStackScreen,
});

TransportationStack.navigationOptions = {
  tabBarLabel: 'Food',
};

const FashionStack = createStackNavigator({
  Fashion: FashionStackScreen,
});

FashionStack.navigationOptions = {
  tabBarLabel: 'Fashion',
};

const SportsStack = createStackNavigator({
  Sports: SportsStackScreen,
});

SportsStack.navigationOptions = {
  tabBarLabel: 'Water',
};

const ArtsStack = createStackNavigator({
  Arts: ArtsStackScreen,
});

ArtsStack.navigationOptions = {
  tabBarLabel: 'Waste',
};

const ShoppingStack = createStackNavigator({
  Shopping: ShoppingStackScreen,
});

ShoppingStack.navigationOptions = {
  tabBarLabel: 'Shopping',
};

const OceansStack = createStackNavigator({
  Oceans: OceansStackScreen,
});

OceansStack.navigationOptions = {
  tabBarLabel: 'Travel',
};

const LandStack = createStackNavigator({
  Land: LandStackScreen,
});

LandStack.navigationOptions = {
  tabBarLabel: 'Land',
};

const PoliticsStack = createStackNavigator({
  Politics: PoliticsStackScreen,
});

PoliticsStack.navigationOptions = {
  tabBarLabel: 'Transportation',
};

// const FinanceStack = createStackNavigator({
//   Finance: FinanceStackScreen,
// });

// FinanceStack.navigationOptions = {
//   tabBarLabel: 'Finance',
// };

const routeConfig = {
  MyActionsStack,
  CommunityStack,
  BasicsStack,
  TransportationStack,
  FashionStack,
  SportsStack,
  ArtsStack,
  ShoppingStack,
  OceansStack,
  LandStack,
  PoliticsStack,
};

export default createMaterialTopTabNavigator(routeConfig, {
  swipeEnabled: true,
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    labelStyle: {
      fontWeight: 'bold',
      fontSize: 13,
    },
    style: {
      justifyContent: 'space-between',
      alignContent: 'center',
      backgroundColor: '#000',
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
  initialRouteName: 'MyActionsStack',
});
