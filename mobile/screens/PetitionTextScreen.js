import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  StyleSheet,
  Platform,
  WebView,
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
import { valueToObjectRepresentation } from 'apollo-utilities';
import { SIGN_PETITION } from '../components/graphql/mutations/sign_petition';
import { GET_USER } from '../components/graphql/queries/get_user';
const SCREEN_HEIGHT = Dimensions.get('window').height;


class PetitionTextScreen extends React.Component {
  state = { in: false }; //TODO, when Database is established, do a componentDidMount to load status
  image = this.props.navigation.getParam('image');
  title = this.props.navigation.getParam('title');
  
  togglePetition = () => {
    // TODO update Database
    const { sign_petition, my_user } = this.props;

    let variables = {
      id:my_user.me.id
    }

    sign_petition({variables})

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
    const body = this.props.navigation.getParam('body');

    let styles = `
      <style>
        h1,h2,h3,h4,h5,h6{
          font-family: Roboto;
        }

        p {
          font-family: Roboto;
          font-size:12px;
        }

      </style>
    `
    // console.log('this.body', this.body);
    // let renderBody = styles + this.body;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.topBackNav}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Petition', {
                  screen: 'Community',
                  image: this.image,
                  title: this.title,
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
              alignItems: 'fles-start',
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
              {this.title}
            </Text>
            <WebView 
              style={{height:600, width:480}}
              originWhitelist={['*']} 
              source={{ html: `${body}`}} 
              scalesPageToFit={false}
              />
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
