import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import DefaultScreen from '../screens/DefaultScreen';

import MainTabNavigator from './MainTabNavigator';
import ProfileStackScreen from '../screens/ProfileStackScreen';

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Main: MainTabNavigator,
      Profile: ProfileStackScreen,
      Video: DefaultScreen ,
    },
    {
      initialRouteName: 'Main',
    }
  )
);
