import React from 'react';

import {
  TouchableOpacity,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
} from 'react-native';
//import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
//import graphql from '../components/hoc/graphql';

//import { data } from './dummy/actions.json';

// @graphql(ALL_ACTION_CATEGORIES, {
//   name: 'all_categories',
//   fetchPolicy: 'network-only',
// })
class SocialStackScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => console.log('Share to Facebook')}
            style={styles.social}
          >
            <Text style={styles.socialItem}>Share to Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log('Share to Twitter')}
            style={styles.social}
          >
            <Text style={styles.socialItem}>Share to Twitter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log('Share to Instagram')}
            style={styles.social}
          >
            <Text style={styles.socialItem}>Share to Instagram</Text>
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