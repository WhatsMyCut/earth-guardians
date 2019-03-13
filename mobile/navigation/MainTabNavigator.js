import {
  createStackNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { Text, View } from 'react-native';
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
import { styles } from '../constants/Styles';
import { _pageHit } from '../services/googleAnalytics'
import _ from 'lodash';

const MyActionsStack = createStackNavigator({
  MyActions: MyActionsStackScreen,
});

MyActionsStack.navigationOptions = {
  tabBarLabel: ({ focused }) => returnLabel(focused, 'MY ACTIONS'),
};

function returnLabel(focused, label) {
  if (!focused) {
    return (
      <View style={{ alignItems: 'baseline' }}>
        <Text style={styles.label}>{label}</Text>
      </View>
    );
  }
  const hitLabel = label.toLowerCase().charAt(0,0).toUpperCase() + _.camelCase(label).substr(1,label.length);
  _pageHit(hitLabel, res => console.log(res.page))
  return (
    <View
      style={{
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={focused ? styles.activeLabel : styles.label}>{label}</Text>
      {focused && (
        <Entypo name="dot-single" color="white" size={18} style={styles.icon} />
      )}
    </View>
  );
}

const CommunityStack = createStackNavigator({
  Community: CommunityStackScreen,
});

CommunityStack.navigationOptions = {
  tabBarLabel: ({ focused }) => returnLabel(focused, 'COMMUNITY'),
};

const EnergyStack = createStackNavigator({
  Energy: EnergyStackScreen,
});

EnergyStack.navigationOptions = {
  tabBarLabel: ({ focused }) => returnLabel(focused, 'ENERGY'),
};

const FoodStack = createStackNavigator({
  Food: FoodStackScreen,
});

FoodStack.navigationOptions = {
  tabBarLabel: ({ focused }) => returnLabel(focused, 'FOOD'),
};

const FashionStack = createStackNavigator({
  Fashion: FashionStackScreen,
});

FashionStack.navigationOptions = {
  tabBarLabel: ({ focused }) => returnLabel(focused, 'FASHION'),
};

const WaterStack = createStackNavigator({
  Water: WaterStackScreen,
});

WaterStack.navigationOptions = {
  tabBarLabel: ({ focused }) => returnLabel(focused, 'WATER'),
};

const WasteStack = createStackNavigator({
  Waste: WasteStackScreen,
});

WasteStack.navigationOptions = {
  tabBarLabel: ({ focused }) => returnLabel(focused, 'WASTE'),
};

const ShoppingStack = createStackNavigator({
  Shopping: ShoppingStackScreen,
});

ShoppingStack.navigationOptions = {
  tabBarLabel: ({ focused }) => returnLabel(focused, 'SHOPPING'),
};

const TravelStack = createStackNavigator({
  Travel: TravelStackScreen,
});

TravelStack.navigationOptions = {
  tabBarLabel: ({ focused }) => returnLabel(focused, 'TRAVEL'),
};

const LandStack = createStackNavigator({
  Land: LandStackScreen,
});

LandStack.navigationOptions = {
  tabBarLabel: ({ focused }) => returnLabel(focused, 'LAND'),
};

const routeConfig = {
  MyActionsStack,
  CommunityStack,
  EnergyStack,
  TravelStack,
  //FashionStack,
  WaterStack,
  WasteStack,
  ShoppingStack,
  //LandStack,
  FoodStack,
};


export default createMaterialTopTabNavigator(routeConfig, {
  navigationOptions: {
    headerTitle: <HeaderNavBar />,
  },
  swipeEnabled: true,
  tabBarPosition: 'bottom',
  showIcon: true,
  showLabel: true,
  animationEnabled: false,
  tabBarOptions: {
    labelStyle: styles.textWhite18B,
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
  initialRouteName: 'CommunityStack',
});
