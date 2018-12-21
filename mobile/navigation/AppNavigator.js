import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import DefaultScreen from '../screens/DefaultScreen';
import PetitionScreen from '../screens/PetitionScreen';
import PetitionTextScreen from '../screens/PetitionTextScreen';
import ProfileStack from './profileStackNavigation';
import MainTabNavigator from './MainTabNavigator';

//TODO this is just for testing purposes, remove
import ModalScreen from '../screens/ModalScreen';

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Main: MainTabNavigator,
      Profile: ProfileStack,
      Video: DefaultScreen,
      Petition: PetitionScreen,
      PetitionText: PetitionTextScreen,
      Modal: ModalScreen,
    },
    {
      initialRouteName: 'Main',
    }
  )
);
