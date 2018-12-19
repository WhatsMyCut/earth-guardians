import React from 'react';
import { all } from 'rsvp';

import { SafeAreaView, View, Text, Button } from 'react-native';
import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
import graphql from '../components/hoc/graphql';
import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';
import NavigationService from '../navigation/navigationService';
import GeneralScreen from './GeneralScreen';

import { data } from './dummy/actions.json';
// @graphql(ALL_ACTION_CATEGORIES, {
//   name: 'all_categories',
//   fetchPolicy: 'network-only',
// })
class ProfileStackScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ fontSize: 30 }}>Profile</Text>
          <Button
            title="Go to your Action"
            onPress={() => NavigationService.navigate('MyActions')}
          />
        </View>
      </SafeAreaView>
    );
  }
}
ProfileStackScreen.navigationOptions = {
  headerTitle: (
    <Text
      style={{
        color: '#ffffff',
        fontSize: 28,
        fontFamily: 'Proxima Nova Bold',
      }}
    >
      MY IMPACT
    </Text>
  ),
  headerStyle: {
    backgroundColor: '#1A1A1A',
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
};

export default ProfileStackScreen;
