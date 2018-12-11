import {
  createStackNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';

import MyActionsStackScreen from '../screens/MyActionsStackScreen';
import CommunityStackScreen from '../screens/CommunityStackScreen';
import BasicsStackScreen from '../screens/BasicsStackScreen';
import TransportationStackScreen from '../screens/TransportationStackScreen';
import FashionStackScreen from '../screens/FashionStackScreen';

const MyActionsStack = createStackNavigator({
  MyActions: MyActionsStackScreen,
});

MyActionsStack.navigationOptions = {
  tabBarLabel: 'My Actions',
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
export default createMaterialTopTabNavigator(
  {
    MyActionsStack,
    CommunityStack,
    BasicsStack,
    TransportationStack,
    FashionStack,
  },
  {
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
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
