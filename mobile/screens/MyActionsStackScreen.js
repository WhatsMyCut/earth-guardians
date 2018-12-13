import React from 'react';
import {
  SafeAreaView,
  ImageBackground,
  Image,
  Platform,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Styles from '../constants/Styles';

import { data } from './actions.json';

import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
import { all } from 'rsvp';
import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';
import graphql from '../components/hoc/graphql';

const Header = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ color: 'red', height: 30 }}>Hello World</Text>
    </View>
  );
};

@graphql(ALL_ACTION_CATEGORIES, {
  name: 'all_categories',
  fetchPolicy: 'network-only',
})
class MyActionsStackScreen extends React.Component {
  state = {
    photos: [],
    actions: [],
  };

  constructor(props) {
    super(props);
    console.log('props inside of stack', props.navigationOptions);
  }

  componentDidMount() {
    // these methods are just for the dummy data
    const actions = [];
    data.forEach(item => {
      // make random keys and push them as objects
      item.actions.forEach(action => {
        const key = Math.random() * Math.random() * 10000000000;
        actions.push({ key, action });
      });
    });
    this.setState({ actions: actions });
  }
  render() {
    const { all_categories } = this.props;
    if (!all_categories.loading) {
      console.log('all persons', all_categories.actionCategories[0].name);
    }
    if (all_categories.loading) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <Text>Loading ...</Text>
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <FlatList
            style={{ backgroundColor: '#D3D3D3' }}
            numColumns={2}
            data={this.state.actions}
            renderItem={({ item, index }) => (
              <TouchableOpacity style={{ flex: 1 }}>
                <View style={styles.item}>
                  <Image
                    source={{ uri: item.action.image }}
                    style={{
                      flex: 1,
                      width: null,
                      height: null,
                      borderRadius: Styles.borderRadius,
                    }}
                  />
                  <Text
                    style={{
                      position: 'absolute',
                      bottom: 10,
                      left: 10,
                      fontWeight: 'bold',
                      color: '#fff',
                      fontSize: 18,
                    }}
                  >
                    {item.action.text.substring(0, 50)}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    margin: 5,
    marginTop: 10,
    minHeight: 200,
    maxHeight: 230,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: Styles.borderRadius,
  },
});

MyActionsStackScreen.navigationOptions = {
  headerTitle: HeaderNavBar,
  headerStyle: {
    backgroundColor: '#333',
    height: Styles.headerNavBarHeight,
  },
  headerStatusBarStyle: {
    color: '#fff',
  },
};

export default MyActionsStackScreen;
