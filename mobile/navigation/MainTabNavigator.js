import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/shared/icons/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';

HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
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

// const MyActions = createStackNavigator({
//   MyActions: MyActionsScreen,
// });

// MyActions.navigationOptions = {
//   tabBarLabel: 'MyActions',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === 'ios'
//           ? `ios-information-circle${focused ? '' : '-outline'}`
//           : 'md-information-circle'
//       }
//     />
//   ),
// };

// const CommunityStack = createStackNavigator({
//   CommunityStack: CommunityStackScreen,
// });

// CommunityStack.navigationOptions = {
//   tabBarLabel: 'CommunityStack',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === 'ios'
//           ? `ios-information-circle${focused ? '' : '-outline'}`
//           : 'md-information-circle'
//       }
//     />
//   ),
// };

// const EssentialsStack = createStackNavigator({
//   EssentialsStack: EssentialsStackScreen,
// });

// EssentialsStack.navigationOptions = {
//   tabBarLabel: 'EssentialsStack',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === 'ios'
//           ? `ios-information-circle${focused ? '' : '-outline'}`
//           : 'md-information-circle'
//       }
//     />
//   ),
// };

export default createBottomTabNavigator({
  HomeStack,
  // MyActionstack,
  // CommunityStack,
  // EssentialsStack,
});
