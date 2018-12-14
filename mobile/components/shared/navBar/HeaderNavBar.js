import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import navigationService from '../../../navigation/navigationService';

const CommunityIcon = () => {
  return (
    <TouchableOpacity onPress={() => navigationService.navigate('Community')}>
      <Image
        source={require('../../../assets/community_w.png')}
        style={{ width: 35, height: 20 }}
      />
    </TouchableOpacity>
  );
};

const EyeIcon = () => {
  return (
    <TouchableOpacity onPress={() => navigationService.navigate('MyActions')}>
      <Image
        source={require('../../../assets/eye_w.png')}
        style={{ width: 40, height: 27 }}
      />
    </TouchableOpacity>
  );
};

const UserIcon = () => {
  return (
    <TouchableOpacity onPress={() => navigationService.navigate('Profile')}>
      <Image
        source={require('../../../assets/user_w.png')}
        style={{ width: 20, height: 20 }}
      />
    </TouchableOpacity>
  );
};

// Anonymous default function, HeaderNavBar
export default () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-between',
        alignItems: 'baseline',
        paddingHorizontal: 20,
      }}
    >
      <CommunityIcon />
      <EyeIcon />
      <UserIcon />
    </View>
  );
};
