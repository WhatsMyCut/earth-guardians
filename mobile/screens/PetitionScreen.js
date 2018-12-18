import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

import { all } from 'rsvp';
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
import graphql from '../components/hoc/graphql';
import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';

import LinearGradientProps from '../constants/LinearGradientProps';
import GeneralScreen from './GeneralScreen';

@graphql(ALL_ACTION_CATEGORIES, {
  name: 'all_categories',
  fetchPolicy: 'network-only',
})
class PetitionScreen extends React.Component {
  state = { primary_image: '', primary_video: '', actions: [] };
  render() {
    const screen = this.props.navigation.getParam('screen', 'MyActions');
    return (
      <LinearGradient {...LinearGradientProps.default} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.topBackNav}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate(screen)}
              >
                <Ionicons name="ios-arrow-round-back" size={42} color="white" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontSize: 30 }}>
                Petition World
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  topBackNav: {
    flex: 1,
    justifyContent: 'flex-start',
    maxHeight: 30,
    paddingHorizontal: 5,
  },
};

// PetitionScreen.navigationOptions = {
//   headerTitle: HeaderNavBar,
//   headerStyle: {
//     backgroundColor: LinearGradientProps.default.colors[0],
//     borderBottomWidth: 0,
//     shadowColor: 'transparent',
//     shadowRadius: 0,
//     shadowOffset: {
//       height: 0,
//     },
//   },
// };

export default PetitionScreen;
