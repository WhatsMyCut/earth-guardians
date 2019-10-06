import React from 'react';
import NavigationService from '../navigation/navigationService';
import { SafeAreaView, View, Text, Switch, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { AppLoading } from 'expo';
import { GET_USER } from '../components/graphql/queries/get_user';
import { UPDATE_PROFILE_SETTINGS } from '../components/graphql/mutations/update_profile_settings_mutations';
import graphql from '../components/hoc/graphql';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../constants/Styles';

//import { GET_USER } from './dummy/actions.json';
@graphql(GET_USER, {
  name: 'my_user',
})
@graphql(UPDATE_PROFILE_SETTINGS, {
  name: 'update_settings',
})
class NotificationStackScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state ={
    loading: false
  }

  toggle = (value, target) => {
    const { my_user, update_settings } = this.props;
    let variables = {};
    if(target == "push_notifications_enabled" && value == false){
      variables = {
        push_notifications_enabled : value,
        action_reminders: value,
        new_features_notification: value,
        new_highlights_notification: value
      }
    } else {
      variables = {
        id : my_user.me.id,
        [target] : value
      }
    }


    if(!my_user.loading){
      this.setState({loading: true});
      update_settings({variables}).then(res => {
        my_user.refetch();
        this.setState({loading: false});
      })
    }
  };
  render() {
    const { my_user} = this.props;
    const { loading } = this.state;
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
    if(my_user.loading){
      return <LinearGradient style={[styles.container]}>
           <AppLoading />
         </LinearGradient>;
    }

    return (
      <SafeAreaView style={[styles.container]}>
        <View style={[styles.greyCard]}>
        {loading && (
            <BlurView
              tint="dark"
              intensity={80}
              style={[styles.coverScreen, styles.coverAll]}
              >
              <AppLoading />
              </BlurView>
          )}
          <View style={styles.notificationWraper}>
            <Text style={styles.notification}>Push Notification</Text>

            <Switch
              value={my_user.me.push_notifications_enabled}
              onValueChange={value => this.toggle(value, 'push_notifications_enabled')}
            />
          </View>

            <View>
          <View style={styles.notificationWraper}>
            <Text style={styles.notification}>Action Reminders</Text>
            <Switch
              value={my_user.me.action_reminders}
              onValueChange={value => this.toggle(value, 'action_reminders')}
            />
          </View>
          <View style={styles.notificationWraper}>
            <Text style={styles.notification}>New Hightlights</Text>
            <Switch
              value={my_user.me.new_highlights_notification}
              onValueChange={value => this.toggle(value, 'new_highlights_notification')}
            />
          </View>
          <View style={styles.notificationWraper}>
            <Text style={styles.notification}>New Features</Text>
            <Switch
              value={my_user.me.new_features_notification}
              onValueChange={value => this.toggle(value, 'new_features_notification')}
            />
          </View>
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
