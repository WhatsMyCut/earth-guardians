import React from 'react';
import { all } from 'rsvp';
import { LinearGradient, AppLoading } from 'expo';

import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
import graphql from '../components/hoc/graphql';
import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';

import LinearGradientProps from '../constants/LinearGradientProps';
import GeneralScreen from './GeneralScreen';

@graphql(ALL_ACTION_CATEGORIES, {
  name: 'all_categories',
  options: {
    fetchPolicy: 'network-only',
    variables: {
      name: 'Fashion',
    },
  },
})
class FashionStackScreen extends React.Component {
  state = { primary_image: '', primary_video: '', actions: [] };
  render() {
    const { all_categories } = this.props;
    if (all_categories.loading) {
      return (
        <LinearGradient {...LinearGradientProps.food} style={{ flex: 1 }}>
          <AppLoading />
        </LinearGradient>
      );
    }

    const actions = all_categories.actionCategories;
    if (!this.state.primary_video && !this.state.primary_image) {
      return null;
    }
    return (
      <LinearGradient {...LinearGradientProps.default} style={{ flex: 1 }}>
        <GeneralScreen
          data={this.state.actions}
          primary_image={this.state.primary_image}
          primary_video={this.state.primary_video}
        />
      </LinearGradient>
    );
  }
}

FashionStackScreen.navigationOptions = {
  headerTitle: HeaderNavBar,
  headerStyle: {
    backgroundColor: LinearGradientProps.default.colors[0],
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
};

export default FashionStackScreen;
