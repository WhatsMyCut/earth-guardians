import React from 'react';
import { all } from 'rsvp';
import { LinearGradient } from 'expo';

import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
import graphql from '../components/hoc/graphql';
import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';

import LinearGradientProps from '../constants/LinearGradientProps';
import GeneralScreen from './GeneralScreen';

@graphql(ALL_ACTION_CATEGORIES, {
  name: 'all_categories',
  fetchPolicy: 'network-only',
})
class ShoppingStackScreen extends React.Component {
  state = { primary_image: '', primary_video: '', actions: [] };
  render() {
    return (
      <LinearGradient {...LinearGradientProps.shopping} style={{ flex: 1 }}>
        <GeneralScreen
        // data={[this.state.actions]}
        // primary_image={this.state.primary_image}
        // primary_video={this.state.primary_video}
        />
      </LinearGradient>
    );
  }
}

ShoppingStackScreen.navigationOptions = {
  headerTitle: HeaderNavBar,
  headerStyle: {
    backgroundColor: LinearGradientProps.shopping.colors[0],
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
};

export default ShoppingStackScreen;
