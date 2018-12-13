import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import navigationService from '../../../navigation/navigationService';
const EyeIcon = props => {
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate('MyActions')}>
      <Image
        source={require('../../../assets/eye_w.png')}
        style={{ width: 50, height: 35 }}
      />
    </TouchableOpacity>
  );
};

const UserIcon = props => {
  return (
    <TouchableOpacity onPress={() => navigationService.navigate('LandStack')}>
      <Image
        source={require('../../../assets/user_w.png')}
        style={{ width: 35, height: 35, marginRight: 10 }}
      />
    </TouchableOpacity>
  );
};

const CommunityIcon = props => {
  return (
    <TouchableOpacity>
      <Image
        source={require('../../../assets/community_w.png')}
        style={{ width: 60, height: 35, marginLeft: 10 }}
      />
    </TouchableOpacity>
  );
};

// Anonymous default function, HeaderNavBar
export default props => {
  return (
    <View
      style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}
    >
      <CommunityIcon />
      <EyeIcon navigation={props.navigation} />
      <UserIcon />
    </View>
  );
};
