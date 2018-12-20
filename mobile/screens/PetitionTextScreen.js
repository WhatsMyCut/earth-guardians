import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { Button } from 'react-native-paper';
import { all } from 'rsvp';
import { LinearGradient, Icon } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
import graphql from '../components/hoc/graphql';
import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';
import TabBarIcon from '../components/shared/icons/TabBarIcon';
import navigationService from '../navigation/navigationService';
import LinearGradientProps from '../constants/LinearGradientProps';
import GeneralScreen from './GeneralScreen';
const SCREEN_HEIGHT = Dimensions.get('window').height;
// @graphql(ALL_ACTION_CATEGORIES, {
//   name: 'all_categories',
//   fetchPolicy: 'network-only',
// })
class PetitionTextScreen extends React.Component {
  state = { in: false }; //TODO, when Database is established, do a componentDidMount to load status
  image = this.props.navigation.getParam('image');
  togglePetition = () => {
    // TODO update Database
    this.setState(
      prevState => ({
        in: !prevState.in,
      }),
      () => {
        console.log(`The state is ${this.state.in}`);
      }
    );
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.topBackNav}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Petition', {
                  screen: 'Community',
                  image: this.image,
                })
              }
            >
              <Ionicons name="ios-arrow-round-back" size={42} color="#ccc" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'Flex-start',
              paddingRight: 10,
              paddingLeft: 20,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                paddingBottom: 10,
                paddingTop: 30,
                color: 'blue',
              }}
            >
              Our Petition
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                paddingBottom: 10,
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard
            </Text>
            <Text style={{ fontSize: 16, paddingBottom: 10 }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard
            </Text>
            <Text style={{ fontSize: 16, paddingBottom: 10 }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard
            </Text>
            <Text style={{ fontSize: 16, paddingBottom: 10 }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard
            </Text>
            <Text style={{ fontSize: 16, paddingBottom: 10 }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard
            </Text>
            <Text style={{ fontSize: 16, paddingBottom: 10 }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigationService.navigate('TODOAnotherPetitionTextScreen', {
                  screen: 'Petition',
                  image: this.image,
                })
              }
              style={{ color: '#fff', alignSelf: 'center', paddingBottom: 10 }}
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

export default PetitionTextScreen;
