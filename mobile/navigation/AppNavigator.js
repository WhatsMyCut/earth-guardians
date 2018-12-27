import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import DefaultScreen from '../screens/DefaultScreen';
import PetitionScreen from '../screens/PetitionScreen';
import PetitionTextScreen from '../screens/PetitionTextScreen';
import ProfileStack from './profileStackNavigation';
import MainTabNavigator from './MainTabNavigator';
import EarthGuardiansInfoScreen from '../screens/EarthGuardiansInfoScreen';

import ModalScreen from '../screens/ModalScreen';
import TestScreen from '../screens/TestScreen';

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
      EGInfo: EarthGuardiansInfoScreen,
      Test: TestScreen,
    },
    {
      initialRouteName: 'Main',
    }
  )
);
