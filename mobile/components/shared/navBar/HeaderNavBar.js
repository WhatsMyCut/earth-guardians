import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import navigationService from '../../../navigation/navigationService';

const CommunityIcon = () => {
  return (
    <TouchableOpacity onPress={() => navigationService.navigate('Rating')}>
      <Image
        source={require('../../../assets/community_w.png')}
        style={{ width: 35, height: 20 }}
      />
    </TouchableOpacity>
  );
};

const EyeIcon = () => {
  return (
    <TouchableOpacity onPress={() => navigationService.navigate('EGInfo')}>
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
        style={{ width: 20, height: 20 }}
        source={require('../../../assets/user_w.png')}
      />
    </TouchableOpacity>
  );
};

// Anonymous default function, HeaderNavBar
export default class HeaderNavBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignContent: 'space-between',
          alignItems: 'baseline',
          paddingHorizontal: 20,
          paddingTop: 5,
        }}
      >
        <CommunityIcon />
        <EyeIcon />
        <UserIcon />
      </View>
    );
  }
}
