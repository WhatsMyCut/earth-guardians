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
class NotificationStackScreen extends React.Component {
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
          <Text style={{ color: '#fff', marginVertical: 20 }}>
            Push Notification
          </Text>
          <Text style={{ color: '#fff', marginVertical: 20 }}>
            Action Reminders
          </Text>
          <Text style={{ color: '#fff', marginVertical: 20 }}>
            New Hightlights
          </Text>
          <Text style={{ color: '#fff', marginVertical: 20 }}>
            New Features
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}
NotificationStackScreen.navigationOptions = {
  headerTitle: (
    <Text
      style={{
        color: '#ffffff',
        fontSize: 28,
        fontFamily: 'Proxima Nova Bold',
      }}
    >
      NOTIFICATIONS
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

export default NotificationStackScreen;
