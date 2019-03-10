import React from 'react';
import NavigationService from '../navigation/navigationService';
import { SafeAreaView, View, Text, Switch, TouchableOpacity } from 'react-native';
import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
import graphql from '../components/hoc/graphql';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../constants/Styles';

//import { data } from './dummy/actions.json';
@graphql(ALL_ACTION_CATEGORIES, {
  name: 'all_categories',
  options: {
    fetchPolicy: 'network-only',
    variables: {
      name: 'Notification',
    },
  },
})
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
    // const { all_categories } = this.props;
    // if (all_categories.loading) {
    //   return <LinearGradient {...LinearGradientProps.food} style={{ flex: 1 }}>
    //       <AppLoading />
    //     </LinearGradient>;
    // }

    // const actions = all_categories.actionCategories;
    // if (!this.state.primary_video && !this.state.primary_image) {
    //   return null;
    // }
    return (
      <SafeAreaView style={[styles.container]}>
        <View style={[styles.greyCard]}>
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

NotificationStackScreen.navigationOptions = {
  headerLeft: (
    <TouchableOpacity onPress={() => NavigationService.navigate('Impact')}>
      <Ionicons
        name="ios-arrow-round-back"
        size={42}
        color="white"
        style={{ paddingLeft: 15, opacity: 0.7 }}
      />
    </TouchableOpacity>
  ),
  headerTitle: (
    <Text style={[styles.headerText]}>
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
