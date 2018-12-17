import {
  createStackNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import React from 'react';
import MyActionsStackScreen from '../screens/MyActionsStackScreen';
import CommunityStackScreen from '../screens/CommunityStackScreen';
import EnergyStackScreen from '../screens/EnergyStackScreen';
import FoodStackScreen from '../screens/FoodStackScreen';
import FashionStackScreen from '../screens/FashionStackScreen';
import WaterStackScreen from '../screens/WaterStackScreen';
import WasteStackScreen from '../screens/WasteStackScreen';
import ShoppingStackScreen from '../screens/ShoppingStackScreen';
import TravelStackScreen from '../screens/TravelStackScreen';
import LandStackScreen from '../screens/LandStackScreen';
import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';
import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
import { all } from 'rsvp';

const MyActionsStack = createStackNavigator({
  MyActions: MyActionsStackScreen,
});

MyActionsStack.navigationOptions = props => {
  return {
    tabBarLabel: 'My Actions',
  };
};

const CommunityStack = createStackNavigator({
  Community: CommunityStackScreen,
});

CommunityStack.navigationOptions = {
  tabBarLabel: 'Community',
};

const EnergyStack = createStackNavigator({
  Energy: EnergyStackScreen,
});

EnergyStack.navigationOptions = {
  tabBarLabel: 'Energy',
};

const FoodStack = createStackNavigator({
  Food: FoodStackScreen,
});

FoodStack.navigationOptions = {
  tabBarLabel: 'Food',
};

const FashionStack = createStackNavigator({
  Fashion: FashionStackScreen,
});

FashionStack.navigationOptions = {
  tabBarLabel: 'Fashion',
};

const WaterStack = createStackNavigator({
  Water: WaterStackScreen,
});

WaterStack.navigationOptions = {
  tabBarLabel: 'Water',
};

const WasteStack = createStackNavigator({
  Waste: WasteStackScreen,
});

WasteStack.navigationOptions = {
  tabBarLabel: 'Waste',
};

const ShoppingStack = createStackNavigator({
  Shopping: ShoppingStackScreen,
});

ShoppingStack.navigationOptions = {
  tabBarLabel: 'Shopping',
};

const TravelStack = createStackNavigator({
  Travel: TravelStackScreen,
});

TravelStack.navigationOptions = {
  tabBarLabel: 'Travel',
};

const LandStack = createStackNavigator({
  Land: LandStackScreen,
});

LandStack.navigationOptions = {
  tabBarLabel: 'Land',
};

const routeConfig = {
  MyActionsStack,
  CommunityStack,
  EnergyStack,
  TravelStack,
  FashionStack,
  WaterStack,
  WasteStack,
  ShoppingStack,
  LandStack,
  FoodStack,
};

export default createMaterialTopTabNavigator(routeConfig, {
  navigationOptions: {
    headerTitle: <HeaderNavBar />,
  },
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
      height: 40,
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
