import React from 'react';
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { _eventHit } from '../../../services/googleAnalytics';

import navigationService from '../../../navigation/navigationService';

const CommunityIcon = () => {
  return (
    <TouchableOpacity
      onPress={() => {
        _eventHit('HeaderNav', {action: 'Ranking'}, res => console.log(res.event, res.params.action))
        navigationService.navigate('Ranking')
      }}
      hitSlop={{top: 15, left: 15, right:15, bottom:15}}
    >
      <Image
        source={require('../../../assets/community_w.png')}
        style={{ width: 35, height: 20 }}
      />
    </TouchableOpacity>
  );
};

const EyeIcon = () => {
  return (
    <TouchableOpacity
      onPress={() => {
        _eventHit('HeaderNav', {action: 'EGInfo'}, res => console.log(res.event, res.params.action))
        navigationService.navigate('EGInfo')
      }}
      hitSlop={{top: 15, left: 15, right:15, bottom:15}}
    >
      <Image
        source={require('../../../assets/eye_w.png')}
        style={{ width: 40, height: 27 }}
      />
    </TouchableOpacity>
  );
};

const UserIcon = () => {
  return (
    <TouchableOpacity
      onPress={() => {
        _eventHit('HeaderNav', {action: 'Impact'}, res => console.log(res.event, res.params.action))
        navigationService.navigate('Impact')
      }}
      hitSlop={{top: 15, left: 15, right:15, bottom:15}}
    >
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
          zIndex:1,
        }}
      >
        <CommunityIcon />
        <EyeIcon />
        <UserIcon />
      </View>
    );
  }
}
