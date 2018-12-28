import React from 'react';

import {
  TouchableOpacity,
  SafeAreaView,
  View,
  Text,
  Button,
  Switch,
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
  state = {
    pushNotifications: false,
    actionReminders: true,
    newHighlights: true,
    newFeatures: false,
  };
  toggle = (value, target) => {
    this.setState({
      [target]: value,
    });
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: '#333',
            paddingTop: 20,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: 300,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', marginVertical: 20 }}>
              Push Notification
            </Text>
            <Switch
              value={this.state.pushNotifications}
              onValueChange={value => this.toggle(value, 'pushNotifications')}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: 300,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', marginVertical: 20 }}>
              Action Reminders
            </Text>
            <Switch
              value={this.state.actionReminders}
              onValueChange={value => this.toggle(value, 'actionReminders')}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: 300,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', marginVertical: 20 }}>
              New Hightlights
            </Text>
            <Switch
              value={this.state.newHighlights}
              onValueChange={value => this.toggle(value, 'newHighlights')}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: 300,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', marginVertical: 20 }}>
              New Features
            </Text>
            <Switch
              value={this.state.newFeatures}
              onValueChange={value => this.toggle(value, 'newFeatures')}
            />
          </View>
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
