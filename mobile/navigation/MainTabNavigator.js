import {
  createStackNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';

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

const MyActionsStack = createStackNavigator({
  MyActions: MyActionsStackScreen,
});

MyActionsStack.navigationOptions = {
  tabBarLabel: 'My Actions',
  title: 'My Actions',
};

const CommunityStack = createStackNavigator({
  CommunityStack: CommunityStackScreen,
});

CommunityStack.navigationOptions = {
  tabBarLabel: 'Community',
};

const BasicsStack = createStackNavigator({
  BasicsStack: BasicsStackScreen,
});

BasicsStack.navigationOptions = {
  tabBarLabel: 'Basics',
};

const TransportationStack = createStackNavigator({
  TransportationStack: TransportationStackScreen,
});

TransportationStack.navigationOptions = {
  tabBarLabel: 'Transportation',
};

const FashionStack = createStackNavigator({
  FashionStack: FashionStackScreen,
});

FashionStack.navigationOptions = {
  tabBarLabel: 'Fashion',
};

const SportsStack = createStackNavigator({
  SportsStack: SportsStackScreen,
});

SportsStack.navigationOptions = {
  tabBarLabel: 'Sports',
};

const ArtsStack = createStackNavigator({
  ArtsStack: ArtsStackScreen,
});

ArtsStack.navigationOptions = {
  tabBarLabel: 'Arts',
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

const ShoppingStack = createStackNavigator({
  ShoppingStack: ShoppingStackScreen
});

ShoppingStack.navigationOptions = {
  tabBarLabel: 'Shopping',
};

const OceansStack = createStackNavigator({
  OceansStack: OceansStackScreen,
});

OceansStack.navigationOptions = {
  tabBarLabel: 'Oceans',
};

const LandStack = createStackNavigator({
  LandStack: LandStackScreen,
});

LandStack.navigationOptions = {
  tabBarLabel: 'Land',
};

const PoliticsStack = createStackNavigator({
  PoliticsStack: PoliticsStackScreen,
});

PoliticsStack.navigationOptions = {
  tabBarLabel: 'Politics',
};

const FinanceStack = createStackNavigator({
  FinanceStack: FinanceStackScreen,
});

FinanceStack.navigationOptions = {
  tabBarLabel: 'Finance',
};
export default createMaterialTopTabNavigator(
  {
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
    FinanceStack,
  },
  {
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
      labelStyle: {
        fontWeight: 'bold',
        fontSize: 13,
      },
      style: {
        backgroundColor: '#000',
      },
      scrollEnabled: true,
      tabStyle: {
        maxWidth: 150,
      },
      indicatorStyle: {
        width: 0,
      },
    },
    lazy: true,
    initialRouteName: 'MyActionsStack',
  }
);
