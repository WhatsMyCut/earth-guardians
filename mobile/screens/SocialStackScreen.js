import React from 'react';
import { all } from 'rsvp';

import {
  TouchableOpacity,
  SafeAreaView,
  View,
  Text,
  Button,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
import graphql from '../components/hoc/graphql';
import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';
import NavigationService from '../navigation/navigationService';
import GeneralScreen from './GeneralScreen';
import GraphComponent from '../components/shared/profile/GraphComponent';
import ImpactComponent from '../components/shared/profile/ImpactComponent';
import ReachComponent from '../components/shared/profile/ReachComponent';
import PointsComponent from '../components/shared/profile/PointsComponent';
import ProfileComponent from '../components/shared/profile/ProfileComponent';

import { data } from './dummy/actions.json';

// @graphql(ALL_ACTION_CATEGORIES, {
//   name: 'all_categories',
//   fetchPolicy: 'network-only',
// })
class SocialStackScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#333',
          }}
        >
          <TouchableOpacity
            onPress={() => console.log('Share to Facebook')}
            style={{
              borderRadius: 10,
              borderWidth: 1,
              backgroundColor: '#666',
              width: 350,
              paddingVertical: 20,
              marginVertical: 10,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontSize: 18 }}>
              Share to Facebook
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log('Share to Twitter')}
            style={{
              borderRadius: 10,
              borderWidth: 1,
              backgroundColor: '#666',
              width: 350,
              paddingVertical: 20,
              marginVertical: 10,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontSize: 18 }}>
              Share to Twitter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log('Share to Instagram')}
            style={{
              borderRadius: 10,
              borderWidth: 1,
              backgroundColor: '#666',
              width: 350,
              paddingVertical: 20,
              marginVertical: 10,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontSize: 18 }}>
              Share to Instagram
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
SocialStackScreen.navigationOptions = {
  headerTitle: (
    <Text
      style={{
        color: '#ffffff',
        fontSize: 28,
        fontFamily: 'Proxima Nova Bold',
      }}
    >
      SHARE YOUR IMPACT
    </Text>
  ),
  headerStyle: {
    backgroundColor: '#333',
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
};

export default SocialStackScreen;
