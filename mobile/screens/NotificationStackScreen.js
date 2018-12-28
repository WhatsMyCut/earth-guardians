import React from 'react';

import { SafeAreaView, View, Text, Switch, StyleSheet } from 'react-native';
//import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
//import graphql from '../components/hoc/graphql';

//import { data } from './dummy/actions.json';
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
        <View style={styles.container}>
          <View style={styles.notificationWraper}>
            <Text style={styles.notification}>Push Notification</Text>
            <Switch
              value={this.state.pushNotifications}
              onValueChange={value => this.toggle(value, 'pushNotifications')}
            />
          </View>
          <View style={styles.notificationWraper}>
            <Text style={styles.notification}>Action Reminders</Text>
            <Switch
              value={this.state.actionReminders}
              onValueChange={value => this.toggle(value, 'actionReminders')}
            />
          </View>
          <View style={styles.notificationWraper}>
            <Text style={styles.notification}>New Hightlights</Text>
            <Switch
              value={this.state.newHighlights}
              onValueChange={value => this.toggle(value, 'newHighlights')}
            />
          </View>
          <View style={styles.notificationWraper}>
            <Text style={styles.notification}>New Features</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#333',
    paddingTop: 20,
  },
  notificationWraper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    alignItems: 'center',
  },
  notification: { color: '#fff', marginVertical: 20 },
});

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
