import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import navigationService from '../../../navigation/navigationService';

const CommunityIcon = () => {
  return (
    <TouchableOpacity onPress={() => navigationService.navigate('Community')}>
      <Image
        source={require('../../../assets/community_w.png')}
        style={{ width: 60, height: 35, marginLeft: 10 }}
      />
    </TouchableOpacity>
  );
};

const EyeIcon = () => {
  return (
    <TouchableOpacity onPress={() => navigationService.navigate('MyActions')}>
      <Image
        source={require('../../../assets/eye_w.png')}
        style={{ width: 50, height: 35 }}
      />
    </TouchableOpacity>
  );
};

const UserIcon = () => {
  return (
    <TouchableOpacity onPress={() => navigationService.navigate('Profile')}>
      <Image
        source={require('../../../assets/user_w.png')}
        style={{ width: 35, height: 35, marginRight: 10 }}
      />
    </TouchableOpacity>
  );
};

// Anonymous default function, HeaderNavBar
export default () => {
  return (
    <View
      style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}
    >
      <CommunityIcon />
      <EyeIcon />
      <UserIcon />
    </View>
  );
};
