import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import ProfileStackScreen from '../screens/ProfileStackScreen';
import NotificationStackScreen from '../screens/NotificationStackScreen';
import AuthLoading from '../screens/AuthLoadingScreen';

const Logout = ({ focused }) => {
  return (
    <MaterialCommunityIcons
        name="logout"
        size={22}
        color={focused ? '#fff' : '#3C3B3D'}
    />
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

const Profile = ({ focused }) => {
  return (
    <FontAwesome
        name="user"
        size={25}
        color={focused ? '#fff' : '#3C3B3D'}
    />
  );
};

const ProfileStack = createStackNavigator({
  Profile: ProfileStackScreen,
});

ProfileStack.navigationOptions = {
  tabBarIcon: Profile,
};

const NotificationStack = createStackNavigator({
  Notification: NotificationStackScreen,
});

NotificationStack.navigationOptions = {
  tabBarIcon: Notification,
};

const LogoutButton = createStackNavigator({
  Logout: AuthLoading,
});

LogoutButton.navigationOptions = {
  tabBarIcon: Logout,
};


const routeConfig = {
  ProfileStack,
  NotificationStack,
  LogoutButton,
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
  initialRouteName: 'ProfileStack',
});
