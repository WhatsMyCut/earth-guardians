import {
  createStackNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import React from 'react';

import ProfileStackScreen from '../screens/ImpactStackScreen';

const ProfileStack = createStackNavigator({
  Profile: ProfileStackScreen,
});

export default ProfileStack;
