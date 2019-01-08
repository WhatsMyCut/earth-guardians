import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
//import { all } from 'rsvp';
import { LinearGradient, Icon } from 'expo';
import { Ionicons } from '@expo/vector-icons';

// import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
// import graphql from '../components/hoc/graphql';
// import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';
// import TabBarIcon from '../components/shared/icons/TabBarIcon';
// import navigationService from '../navigation/navigationService';
// import LinearGradientProps from '../constants/LinearGradientProps';
// import GeneralScreen from './GeneralScreen';
// const SCREEN_HEIGHT = Dimensions.get('window').height;
// @graphql(ALL_ACTION_CATEGORIES, {
//   name: 'all_categories',
//   fetchPolicy: 'network-only',
// })
class EarthGuardiansInfoScreen extends React.Component {
  //TODO, navigate back to the previos screen
  render() {
    return (
      <LinearGradient colors={['#333333', '#1a1a1a']} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.topBackNav}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('MyActions')}
              >
                <Ionicons name="ios-arrow-round-back" size={42} color="#ccc" />
              </TouchableOpacity>
            </View>
            <ScrollView style={{ flex: 1, paddingRight: 10, paddingLeft: 20 }}>
              <View style={{ marginBottom: 10 }}>
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    paddingBottom: 10,
                    paddingTop: 30,
                    color: '#ffffff',
                    textAlign: 'center',
                  }}
                >
                  EARTH GUARDIANS
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    paddingBottom: 20,
                    color: '#ffffff',
                    textAlign: 'center',
                    lineHeight: 25,
                  }}
                >
                  We empower young people by providing them with leadership
                  opportunities and tools to bring their innovative solutions to
                  the world’s most pressing issues.
                </Text>
              </View>
              <View style={{ marginBottom: 10 }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 16,
                    paddingBottom: 20,
                    color: '#ffffff',
                    lineHeight: 25,
                  }}
                >
                  Earth Guardians began as an accredited high school in Maui,
                  Hawaii in 1992, focusing on environmental awareness and action
                  in its core curriculum. Students studied the history of social
                  movements and took action to restore sandalwood forests and
                  shut down the toxic practice of burning sugar cane. The school
                  became recognized throughout the Hawaiian Islands and beyond,
                  with the Dalai Lama presenting the Children's Torch of Hope to
                  twenty-five Earth Guardian students.
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 16,
                    paddingBottom: 20,
                    color: '#ffffff',
                    lineHeight: 25,
                  }}
                >
                  Seeing the need to empower and give voice to a wider audience
                  prompted Earth Guardians to relocate to Colorado in 1997 and
                  engage more young people in programs to empower and amplify
                  their voice. Earth Guardians began teaching youth about the
                  involvement in political action and activism, working to stop
                  the spraying of pesticides in public parks, establishing an
                  environmental fee on plastic bags, advocating for
                  municipalizing Boulder's energy grid, and helping to achieve a
                  moratorium on fracking. Earth Guardians received a great deal
                  of press and attention for local actions, allowing the
                  organization to expand into national and international work.
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 16,
                    paddingBottom: 20,
                    color: '#ffffff',
                    lineHeight: 25,
                  }}
                >
                  Now with thousands of engaged youth on six continents, Earth
                  Guardians has given youth a voice and direction worldwide in
                  order to become effective leaders and make measurable change
                  in their communities. Earth Guardians is developing the
                  resources to build a stronger collaborative network and
                  cultivate this large wave of youth engagement.
                </Text>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBackNav: {
    flex: 1,
    justifyContent: 'flex-start',
    maxHeight: 30,
    paddingHorizontal: 5,
  },
});

export default EarthGuardiansInfoScreen;
