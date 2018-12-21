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
class PetitionScreen extends React.Component {
  state = { in: false }; //TODO, when Database is established, do a componentDidMount to load status
  screen = this.props.navigation.getParam('screen');
  image = this.props.navigation.getParam('image');
  petitionTitle = this.props.navigation.getParam('title');
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
    const status_icon_name = this.state.in
      ? 'circle-slice-8'
      : 'circle-outline';
    const color = this.state.in ? 'green' : '#aaa';
    return (
      <LinearGradient
        {...LinearGradientProps.whiteToBlackcolors}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <ImageBackground
              source={{ uri: this.image }}
              style={{ flex: 1, width: null, height: SCREEN_HEIGHT }}
            />
            <View style={styles.topBackNav}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate(this.screen)}
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
                {this.petitionTitle}
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
                  color="#fff"
                  onPress={() => this.togglePetition()}
                >
                  <Text>I'm in!</Text>
                  <Icon.MaterialCommunityIcons
                    name={status_icon_name}
                    style={{ color: color, fontSize: 20 }}
                  />
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
                onPress={() =>
                  navigationService.navigate('PetitionText', {
                    image: this.image,
                    title: this.petitionTitle,
                  })
                }
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

export default PetitionScreen;
