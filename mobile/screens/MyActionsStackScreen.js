import React from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, View } from 'react-native';
import { all } from 'rsvp';

import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';
import graphql from '../components/hoc/graphql';
import ActionCardSmall from '../components/shared/card';

//import { data } from './dummy/actions.json';
import { actions_data } from './dummy/data';
// @graphql(ALL_ACTION_CATEGORIES, {
//   name: 'all_categories',
//   fetchPolicy: 'network-only',
// })
class MyActionsStackScreen extends React.Component {
  state = {
    primary_photo: '',
    primary_video: '',
    actions: [],
  };

  componentDidMount() {
    //const actions = data[0].actions;
    const actions = actions_data();

    this.setState({ actions: actions });
  }
  render() {
    // const { all_categories } = this.props;
    // if (!all_categories.loading) {
    //   console.log('all persons', all_categories.actionCategories[0].name);
    // }
    // if (all_categories.loading) {
    //   return (
    //     <SafeAreaView style={{ flex: 1 }}>
    //       <Text>Loading ...</Text>
    //     </SafeAreaView>
    //   );
    // }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <FlatList
            style={{ backgroundColor: '#333' }}
            numColumns={2}
            data={this.state.actions}
            renderItem={({ item, index }) => (
              <ActionCardSmall item={item} index={index} />
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
    backgroundColor: '#333',
    paddingTop: 15,
  },
});

MyActionsStackScreen.navigationOptions = {
  headerTitle: HeaderNavBar,
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

export default MyActionsStackScreen;
