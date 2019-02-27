import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import VideoScreen from '../screens/VideoScreen';
import PetitionScreen from '../screens/PetitionScreen';
import PetitionTextScreen from '../screens/PetitionTextScreen';
import ImpactStack from './ImpactTabNavigator';
import ProfileStack from './ProfileTabNavigator';
import RankingStack from './RankingTabNavigator';
import MainTabNavigator from './MainTabNavigator';
import EarthGuardiansInfoScreen from '../screens/EarthGuardiansInfoScreen';
import GameScreen from '../screens/GameScreen';

//TODO this is just for testing purposes, remove
import ModalScreen from '../screens/ModalScreen';

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Main: MainTabNavigator,
      Profile: ProfileStack,
      Impact: ImpactStack,
      Ranking: RankingStack,
      Video: VideoScreen,
      Petition: PetitionScreen,
      PetitionText: PetitionTextScreen,
      Modal: ModalScreen,
      EGInfo: EarthGuardiansInfoScreen,
      Game: GameScreen,
    },
    {
      mode: 'modal',
      initialRouteName: 'AuthLoading',
    }
  )
);
