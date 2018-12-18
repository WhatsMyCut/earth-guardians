import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { Button } from 'react-native-paper';
import { all } from 'rsvp';
import { LinearGradient, Icon } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
import graphql from '../components/hoc/graphql';
import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';
import TabBarIcon from '../components/shared/icons/TabBarIcon';

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
      <LinearGradient
        {...LinearGradientProps.whiteToBlackcolors}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.topBackNav}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate(screen)}
              >
                <Ionicons name="ios-arrow-round-back" size={42} color="#ccc" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'Flex-start',
                padding: 20,
              }}
            >
              <Text style={{ color: 'white', fontSize: 30 }}>
                Petition Title
              </Text>
              <Text style={{ color: 'white', fontSize: 16 }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Button
                  mode="contained"
                  color="#aaa"
                  onPress={() => console.log('petition')}
                  title="join"
                >
                  I'm in!
                </Button>

                <Icon.AntDesign
                  name="eyeo"
                  style={{
                    color: '#fff',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 20,
                    marginHorizontal: 10,
                  }}
                />
                <Text style={{ color: '#fff', alignSelf: 'center' }}>
                  4K took action
                </Text>
              </View>
              <TouchableOpacity
                onPress={this.phone_signup}
                style={{
                  color: '#fff',
                  alignSelf: 'center',
                  paddingBottom: 10,
                }}
              >
                <TabBarIcon
                  name={
                    Platform.OS === 'ios' ? `ios-arrow-down` : 'md-arrow-down'
                  }
                />
              </TouchableOpacity>
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
