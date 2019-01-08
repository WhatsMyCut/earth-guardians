import React from 'react';

import {
  TouchableOpacity,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Share
} from 'react-native';
import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
import graphql from '../components/hoc/graphql';

//import { data } from './dummy/actions.json';

// @graphql(ALL_ACTION_CATEGORIES, {
//   name: 'all_categories',
//   options: {
//     fetchPolicy: 'network-only',
//     variables: {
//       name: 'Social',
//     },
//   },
// })
class SocialStackScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  _shareMetrics= async()=>{
    const result = await Share.share({
      message: 'I love this app EarthTracks by Earth Guardians! The actions I take make a difference. Check it out. Are you in? #earthguardians #earthtracks',
      url: 'https://www.earthguardians.org/',
      title: 'Share EarthTracks App!'
    }, {
      // Android only:
      dialogTitle: 'Share EarthTracks App',
    })
  }

  _shareApp = async()=>{
    const result = await Share.share({
      message: 'I love this app EarthTracks by Earth Guardians! The actions I take make a difference. Check it out. Are you in? #earthguardians #earthtracks',
      url: 'https://www.earthguardians.org/',
      title: 'Share EarthTracks App!'
    }, {
      // Android only:
      dialogTitle: 'Share EarthTracks App',
    })
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => this._shareApp()}
            style={styles.social}
          >
            <Text style={styles.socialItem}>Share your Metrics!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log('Share to Twitter')}
            style={styles.social}
          >
            <Text style={styles.socialItem}>Share the EarthTracks App!</Text>
          </TouchableOpacity>
          
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
  },
  social: {
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#666',
    width: 350,
    paddingVertical: 20,
    marginVertical: 10,
    alignItems: 'center',
  },
  socialItem: { color: '#fff', fontSize: 18 },
});

SocialStackScreen.navigationOptions = {
  headerTitle: (
    <Text
      style={{
        color: '#ffffff',
        fontSize: 28,
        fontFamily: 'Proxima Nova Bold',
      }}
    >
      SHARE YOUR IMPACT
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

export default SocialStackScreen;
